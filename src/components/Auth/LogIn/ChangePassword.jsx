import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId; // Get userId from login redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8001/api/admin/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                // Redirect to login page after successful password change
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                progressStyle={{ background: "#155DFC" }}
                theme="light"
                style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#ff4d4f",
                    borderRadius: "8px",
                    padding: "10px",
                }}
            />

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                    <h2 className="text-2xl font-bold text-blue-600">Change Password</h2>
                    <p className="text-gray-500 mb-6">Please set a new password for your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-4">
                            <label className="block font-medium text-gray-600">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter current password"
                            />
                        </div>

                        <div className="text-left mb-4">
                            <label className="block font-medium text-gray-600">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white w-full p-3 rounded-lg mt-4 hover:bg-blue-700 transition"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;