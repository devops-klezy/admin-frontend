import React, { useState, useEffect } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import '../SuperAdmin/Posts.css'

function Stats() {
  const [founderEmailData, setFounderEmailData] = useState([]);
  const [getDiscoveredEmailData, setGetDiscoveredEmailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mailStatus, setMailStatus] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [revenueError, setRevenueError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const founderResponse = await fetch(
          'http://localhost:3333/api/founder/get-all-categories-with-total-posts',
          { method: 'GET', credentials: 'include' }
        );
        if (!founderResponse.ok) throw new Error('Failed to fetch Founder Email stats');
        const founderData = await founderResponse.json();
        setFounderEmailData(founderData.data || []);

        const getDiscoveredResponse = await fetch(
          'http://localhost:3333/api/get-discovered/get-all-categories-with-total-posts',
          { method: 'GET', credentials: 'include' }
        );
        if (!getDiscoveredResponse.ok) throw new Error('Failed to fetch GetDiscovered Email stats');
        const getDiscoveredData = await getDiscoveredResponse.json();
        setGetDiscoveredEmailData(getDiscoveredData.data || []);

        const revenueResponse = await fetch('http://localhost:3333/api/admin/get-total-revenue', {
          method: 'GET',
          credentials: 'include',
        });
        if (!revenueResponse.ok) throw new Error('Failed to fetch total revenue');
        const revenueData = await revenueResponse.json();
        if (revenueData.success) {
          setTotalRevenue(revenueData.totalRevenue || 0);
        } else {
          throw new Error('API response unsuccessful');
        }
      } catch (error) {
        setError(error.message);
        setRevenueError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSendMail = async (domainName, roleName, section) => {
    try {
      const key = `${domainName}-${roleName}-${section}`;
      setMailStatus((prev) => ({ ...prev, [key]: 'sending' }));
      const data = section === 'founderEmail' ? founderEmailData : getDiscoveredEmailData;
      const item = data.find((item) => item.domainName === domainName && item.roleName === roleName);
      const emailIds = item ? (section === 'founderEmail' ? item.founderEmails : item.getDiscoveredEmails) : [];

      const response = await fetch('http://localhost:3333/api/founder/send-mail-to-every-associated-user-with-this-category', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailIds, categoryName: `${domainName}:${roleName}` }),
      });

      if (!response.ok) throw new Error(`Failed to send mail for ${section}`);
      setMailStatus((prev) => ({ ...prev, [key]: 'success' }));
      setTimeout(() => setMailStatus((prev) => ({ ...prev, [key]: null })), 2000);
    } catch (error) {
      console.error(`Error sending mail for ${section}:`, error);
      const key = `${domainName}-${roleName}-${section}`;
      setMailStatus((prev) => ({ ...prev, [key]: 'error' }));
      setTimeout(() => setMailStatus((prev) => ({ ...prev, [key]: null })), 2000);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3333/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const allDomainRolePairs = Array.from(
    new Set([
      ...founderEmailData.map((item) => `${item.domainName}-${item.roleName}`),
      ...getDiscoveredEmailData.map((item) => `${item.domainName}-${item.roleName}`)
    ])
  ).map((pair) => {
    const [domainName, roleName] = pair.split('-');
    return { domainName, roleName };
  });

  const tableData = allDomainRolePairs.map(({ domainName, roleName }) => ({
    domainName,
    roleName,
    founderEmailCount: founderEmailData.find(
      (item) => item.domainName === domainName && item.roleName === roleName
    )?.totalFounderEmails || 0,
    getDiscoveredEmailCount: getDiscoveredEmailData.find(
      (item) => item.domainName === domainName && item.roleName === roleName
    )?.totalGetDiscoveredEmails || 0,
    founderEmails: founderEmailData.find(
      (item) => item.domainName === domainName && item.roleName === roleName
    )?.founderEmails || [],
    getDiscoveredEmails: getDiscoveredEmailData.find(
      (item) => item.domainName === domainName && item.roleName === roleName
    )?.getDiscoveredEmails || [],
  }));

  // Pair up tableData entries
  const pairedTableData = [];
  for (let i = 0; i < tableData.length; i += 2) {
    pairedTableData.push({
      pair1: tableData[i],
      pair2: tableData[i + 1] || null,
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center">
        <div className="loader m-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-red-500 font-semibold"
        >
          Error: {error}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-indigo-800 via-violet-700 to-indigo-900 text-white shadow-xl">
        <div className="flex flex-row justify-between items-center h-[80px] px-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-blue-200">Klezy</span>
              <span className="text-white"> - Super Admin</span>
            </h1>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/super-admin-dashboard")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-all duration-300 shadow-md"
            >
              <MdOutlinePendingActions className="text-lg" />
              Dashboard
            </motion.button>
            <motion.div
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-500 text-sm font-medium shadow-md"
            >
              <FaMoneyBillWave className="text-lg" />
              <span>
                Revenue: {revenueError ? (
                  <span className="text-red-200">Error</span>
                 ) : totalRevenue !== null ? (
                    <span className="text-blue-200">₹${totalRevenue.toLocaleString()}</span>
                  ) : (
                    <span className="text-gray-200">Loading...</span>
                  )}
              </span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-blue-200 hover:text-white transition-all duration-300"
            >
              <IoIosNotificationsOutline className="text-xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium transition-all duration-300 shadow-md"
            >
              <IoLogOutOutline className="text-lg" />
              Logout
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center py-8 flex-grow">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-indigo-800 mb-8"
        >
          Role Statistics
        </motion.h1>
        <div className="w-full max-w-8xl bg-white rounded-xl shadow-2xl p-8">
          <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold border-r border-indigo-500/30">
                    Domain 1
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold border-r border-indigo-500/30">
                    Role 1
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold border-r border-indigo-500/30">
                    Founders Count
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    GetDiscovered Count
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold border-r border-indigo-500/30">
                    Domain 2
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold border-r border-indigo-500/30">
                    Role 2
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold border-r border-indigo-500/30">
                    Founders Count
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    GetDiscovered Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {pairedTableData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-600">
                      No data available
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {pairedTableData.map((pair, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${
                          index % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white'
                        } hover:bg-violet-100/50 transition-all duration-300 border-b border-gray-200 last:border-b-0`}
                      >
                        {/* Pair 1 */}
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-indigo-200/50 font-medium">
                          {pair.pair1?.domainName || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-indigo-200/50 font-medium">
                          {pair.pair1?.roleName || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-indigo-200/50">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{pair.pair1?.founderEmailCount || 0}</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => pair.pair1 && handleSendMail(pair.pair1.domainName, pair.pair1.roleName, 'founderEmail')}
                              disabled={mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'sending' || !pair.pair1 || pair.pair1.founderEmailCount === 0}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm ${
                                mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'sending'
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'success'
                                  ? 'bg-green-500 text-white'
                                  : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'error'
                                  ? 'bg-red-500 text-white'
                                  : !pair.pair1 || pair.pair1.founderEmailCount === 0
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700'
                              }`}
                            >
                              <FaPaperPlane className="text-xs" />
                              {mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'sending'
                                ? 'Sending...'
                                : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'success'
                                ? 'Sent!'
                                : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-founderEmail`] === 'error'
                                ? 'Failed'
                                : 'Send'}
                            </motion.button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{pair.pair1?.getDiscoveredEmailCount || 0}</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => pair.pair1 && handleSendMail(pair.pair1.domainName, pair.pair1.roleName, 'getDiscoveredEmail')}
                              disabled={mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'sending' || !pair.pair1 || pair.pair1.getDiscoveredEmailCount === 0}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm ${
                                mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'sending'
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'success'
                                  ? 'bg-green-500 text-white'
                                  : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'error'
                                  ? 'bg-red-500 text-white'
                                  : !pair.pair1 || pair.pair1.getDiscoveredEmailCount === 0
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700'
                              }`}
                            >
                              <FaPaperPlane className="text-xs" />
                              {mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'sending'
                                ? 'Sending...'
                                : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'success'
                                ? 'Sent!'
                                : mailStatus[`${pair.pair1?.domainName}-${pair.pair1?.roleName}-getDiscoveredEmail`] === 'error'
                                ? 'Failed'
                                : 'Send'}
                            </motion.button>
                          </div>
                        </td>
                        {/* Pair 2 */}
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-indigo-200/50 font-medium">
                          {pair.pair2?.domainName || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-indigo-200/50 font-medium">
                          {pair.pair2?.roleName || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 border-r border-indigo-200/50">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{pair.pair2?.founderEmailCount || 0}</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => pair.pair2 && handleSendMail(pair.pair2.domainName, pair.pair2.roleName, 'founderEmail')}
                              disabled={mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'sending' || !pair.pair2 || pair.pair2.founderEmailCount === 0}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm ${
                                mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'sending'
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'success'
                                  ? 'bg-green-500 text-white'
                                  : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'error'
                                  ? 'bg-red-500 text-white'
                                  : !pair.pair2 || pair.pair2.founderEmailCount === 0
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700'
                              }`}
                            >
                              <FaPaperPlane className="text-xs" />
                              {mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'sending'
                                ? 'Sending...'
                                : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'success'
                                ? 'Sent!'
                                : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-founderEmail`] === 'error'
                                ? 'Failed'
                                : 'Send'}
                            </motion.button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{pair.pair2?.getDiscoveredEmailCount || 0}</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => pair.pair2 && handleSendMail(pair.pair2.domainName, pair.pair2.roleName, 'getDiscoveredEmail')}
                              disabled={mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'sending' || !pair.pair2 || pair.pair2.getDiscoveredEmailCount === 0}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm ${
                                mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'sending'
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'success'
                                  ? 'bg-green-500 text-white'
                                  : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'error'
                                  ? 'bg-red-500 text-white'
                                  : !pair.pair2 || pair.pair2.getDiscoveredEmailCount === 0
                                  ? 'bg-gray-400 text-white cursor-not-allowed'
                                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700'
                              }`}
                            >
                              <FaPaperPlane className="text-xs" />
                              {mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'sending'
                                ? 'Sending...'
                                : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'success'
                                ? 'Sent!'
                                : mailStatus[`${pair.pair2?.domainName}-${pair.pair2?.roleName}-getDiscoveredEmail`] === 'error'
                                ? 'Failed'
                                : 'Send'}
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gradient-to-r from-indigo-700 to-violet-700 text-white">
                  <td className="px-6 py-4 text-sm font-bold border-r border-indigo-500/30" colSpan="2">
                    Total
                  </td>
                  <td className="px-6 py-4 text-sm font-bold border-r border-indigo-500/30">
                    {tableData.reduce((sum, row) => sum + row.founderEmailCount, 0)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    {tableData.reduce((sum, row) => sum + row.getDiscoveredEmailCount, 0)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold border-r border-indigo-500/30" colSpan="2">
                    Total
                  </td>
                  <td className="px-6 py-4 text-sm font-bold border-r border-indigo-500/30">
                    {tableData.reduce((sum, row) => sum + row.founderEmailCount, 0)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    {tableData.reduce((sum, row) => sum + row.getDiscoveredEmailCount, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;