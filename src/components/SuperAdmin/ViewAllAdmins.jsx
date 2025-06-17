import React, { useState, useEffect } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../assets/NoDataFound.svg";
import './Posts.css'

const ViewAllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [revenueError, setRevenueError] = useState(null);
  const navigate = useNavigate();

  // Fetch admins from API
  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/admin/get-admins', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch admins');
      }
      const result = await response.json();
      if (result.success) {
        setAdmins(result.admins);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // Fetch data on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle delete admin
  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const response = await fetch('http://localhost:8001/api/admin/remove-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email }),
        });
        if (!response.ok) {
          throw new Error('Failed to delete admin');
        }
        const result = await response.json();
        if (result.success) {
          await fetchAdmins();
          alert('Admin deleted successfully');
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert(`Error: ${err.message}`);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken');
      localStorage.removeItem('role');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Failed to logout. Please try again.');
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="loader m-auto"></div>
  </div>;
  if (error) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <p className="text-lg text-red-600">Error: {error}</p>
  </div>;

  return (
    <div className="min-h-scree flex flex-col">

       
      {/* Main Content */}
      <div className="flex flex-col items-center py-6 flex-grow z-10 px-2">
        <h2 className="w-full text-left ml-3 text-3xl font-bold text-gray-800 mb-6">All Admins</h2>
        {admins.length === 0 ? (
          <img src={NoDataFound} alt="No posts found" className="mx-auto h-[90%]" />
        ) : (
          <div className="w-full bg-white rounded-lg overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className='bg-gray-50'>
                  <tr className="">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Middle Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr
                      key={admin._id}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all duration-200`}
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{admin.firstName}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{admin.middleName}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{admin.lastName}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{admin.phoneNumber}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{admin.role}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleDelete(admin.email)}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-500 transition-all duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllAdmins;