import React, { useState, useEffect } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; // For domain dropdown
import { X } from "lucide-react";

// Custom Skills Select Component
const SkillsSelect = ({ skills, onChange, error }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        onChange([...skills, newSkill]);
      }
      setInputValue("");
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      // Remove last skill when backspace is pressed on empty input
      onChange(skills.slice(0, -1));
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="w-full">
      <div className={`min-h-[48px] w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
        error ? "border-red-500" : "border-gray-300"
      } ${isInputFocused ? "ring-2 ring-blue-500 border-blue-500" : ""}`}>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Skill Tags */}
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          
          {/* Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add another skill..."}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
          />
        </div>
      </div>
      
      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-1">
        Type a skill and press Enter to add it. Press Backspace to remove the last skill.
      </p>
    </div>
  );
};

const RequestedDomainRoleSkills = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false); // State for add popup
  const [domains, setDomains] = useState([]);
  const [formData, setFormData] = useState({
    domainId: "",
    domainName: "",
    roleName: "",
    skills: [],
    isNewDomain: false,
  });
  const navigate = useNavigate();

  // Fetch requests and domains
  useEffect(() => {
    fetchRequests();
    fetchDomains();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3333/api/admin/get-domain-role-skills",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const result = await response.json();
      if (result.success) {
        setRequests(result.data);
      } else {
        setError(result.message || "Failed to fetch requests");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDomains = async () => {
    try {
      const response = await fetch(
        "http://localhost:3333/api/domain/get-all-domains"
      );
      const data = await response.json();
      if (!data.success) throw new Error("Failed to fetch domains");

      const sortedDomains = (data.domains || [])
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((domain) => ({
          value: domain._id,
          label: domain.name,
        }));
      setDomains(sortedDomains);
    } catch (err) {
      console.error("Error fetching domains:", err);
    }
  };

  const handleAccept = async (request) => {
    try {
      const response = await fetch(
        "http://localhost:3333/api/admin/add-domain-role-skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: request._id,
            userId: request.userId._id,
            domainName: request.domainName,
            roleName: request.roleName,
            skills: request.skills,
          }),
        }
      );

      if (response.ok) {
        setRequests((prev) => prev.filter((req) => req._id !== request._id));
        alert("Request accepted successfully!");
      } else {
        alert("Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Error accepting request");
    }
  };

  const handleRowClick = (request) => {
    setSelectedUser(request);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        domainName: formData.isNewDomain
          ? formData.domainName
          : domains.find((d) => d.value === formData.domainId)?.label,
        roleName: formData.roleName || "", // Include roleName, empty string if not provided
        skills: formData.skills,
      };

      const response = await fetch(
        "http://localhost:3333/api/admin/add-domain-role-skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Domain, role, and skills added successfully!");
        setShowAddPopup(false);
        setFormData({
          domainId: "",
          domainName: "",
          roleName: "",
          skills: [],
          isNewDomain: false,
        });
        fetchRequests(); // Refresh requests
      } else {
        alert("Failed to add domain, role, and skills");
      }
    } catch (error) {
      console.error("Error adding domain, role, and skills:", error);
      alert("Error adding domain, role, and skills");
    }
  };

  const handleSkillsChange = (newSkills) => {
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col items-center py-6 flex-grow z-10 px-4">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Requested Domain, Role & Skills
          </h2>
          <button
            onClick={() => setShowAddPopup(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Add New
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-6xl text-gray-300 mb-4">📋</div>
            <p className="text-xl text-gray-500">No requests found</p>
          </div>
        ) : (
          <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested Domain
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request, index) => (
                    <tr
                      key={request._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition-all duration-200 cursor-pointer`}
                      onClick={() => handleRowClick(request)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {`${request.userId.firstName} ${
                          request.userId.lastName || ""
                        }`.trim()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {request.userId.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {request.userId.role}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {request.domainName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {request.roleName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1">
                          {request.skills &&
                            request.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          {request.skills && request.skills.length > 3 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{request.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(request);
                          }}
                          className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Accept
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

      {/* User Details Popup */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* User Information */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {`${selectedUser.userId.firstName} ${
                        selectedUser.userId.middleName || ""
                      } ${selectedUser.userId.lastName}`.trim()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.userId.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.userId.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Current Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.userId.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Information */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  Request Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Requested Domain
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-blue-50 px-3 py-2 rounded-md">
                      {selectedUser.domainName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Requested Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-green-50 px-3 py-2 rounded-md">
                      {selectedUser.roleName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Requested Skills
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedUser.skills &&
                        selectedUser.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Date */}
              {selectedUser.createdAt && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-500">
                    Request Date
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedUser.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    handleAccept(selectedUser);
                    closePopup();
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Accept Request
                </button>
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Domain, Role, Skills Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Add New Domain, Role & Skills
              </h3>
              <button
                onClick={() => setShowAddPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Domain
                </label>
                <Select
                  options={domains}
                  value={domains.find((d) => d.value === formData.domainId) || null}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      domainId: selected ? selected.value : "",
                      isNewDomain: false,
                      domainName: "",
                    }))
                  }
                  placeholder="Select a domain"
                  isClearable
                  className="basic-single"
                  classNamePrefix="select"
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isNewDomain}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isNewDomain: e.target.checked,
                          domainId: "",
                        }))
                      }
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Add new domain
                    </span>
                  </label>
                </div>
                {formData.isNewDomain && (
                  <input
                    type="text"
                    value={formData.domainName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        domainName: e.target.value,
                      }))
                    }
                    placeholder="Enter new domain name"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.roleName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      roleName: e.target.value,
                    }))
                  }
                  placeholder="Enter role name (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <SkillsSelect
                  skills={formData.skills}
                  onChange={handleSkillsChange}
                  error={formData.skills.length === 0}
                />
                {formData.skills.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">
                    At least one skill is required
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  disabled={
                    (!formData.isNewDomain && !formData.domainId) ||
                    (formData.isNewDomain && !formData.domainName) ||
                    formData.skills.length === 0
                  }
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPopup(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedDomainRoleSkills;