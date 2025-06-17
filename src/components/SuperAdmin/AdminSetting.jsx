import React, { useState } from "react";

const AdminSetting = ({ post }) => {
 const { createdAt } = "2023-10-01T12:00:00Z"; // Example date, replace with actual data
 const removeAdmin = async () => {
    try {
        const email = "newadmin@gmail.com"
      const response = await fetch(
        "http://localhost:8001/api/admin/remove-admin", // Use consistent port (33333 or 8000, verify with backend)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email
          }), // Use formData directly
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to Remove admin");
      }

      
      
      
    } catch (error) {
      console.error("Error in remove admin:", error);
      setError(error.message); // Set error message for user
    }
    console.log("Admin removed");
}
  return (
    <>
      {/* Card Component */}
      <div className="flex w-full bg-red-50 items-center justify-between rounded-lg px-5 py-3 border border-gray-300">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1547701787-1ad8f348080a?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex gap-1 ">
          <p>Anup</p>
          <p>Patel</p>
        </div>
        <p>anupbhaipatel.com</p>
        <p>1234567890</p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <button className="bg-red-500 text-white text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center"
        onClick={removeAdmin}>
          Remove admin
        </button>
      </div>

    </>
  );
};

export default AdminSetting;
