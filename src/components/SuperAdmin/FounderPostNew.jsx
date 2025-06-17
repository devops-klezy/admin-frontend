import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";


const FounderPostNew = ({ post, fetchPendingPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Functions for buttons (just names assigned)
  const acceptFunction = async (postId) => {
    console.log("Accept clicked and postId:", postId);
    try {
      const response = await fetch(
        `http://localhost:3333/api/admin/accept-post/${postId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to accept post");

      console.log(`Post ${postId} accepted`);
      fetchPendingPost();
      // Refresh all listings after accepting
      // await fetchListings();
    } catch (error) {
      console.error("Error accepting post:", error);
    }
    setIsModalOpen(false);
  };

  const sendReasonFunction = async (postId) => {
    // Backend logic will handle sending reason
    // console.log("Reject reason sent:", reason); // Log reason to verify
    // if (!reason.trim()) {
    //     console.error("Reason is empty or undefined");
    //     alert("Please provide a reason for rejection.");
    //     return;
    // }
    // console.log("Reject reason sent:", rejectReason);
    const comment = rejectReason;
    try {
      const response = await fetch(
        `http://localhost:3333/api/admin/reject-post/${postId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );
      if (!response.ok) throw new Error("Failed to reject post");

      setIsRejectModalOpen(false);
      setRejectReason("");
      setIsModalOpen(false);
      fetchPendingPost();
    } catch (error) {
      console.error("Error rejecting post:", error);
    }
  };

  console.log("Post data:", post);
  const {
    aboutUs: description,
    categoryName: role,
    companyDetails,
    companyName,
    createdAt,
    facebook,
    instagram,
    linkedin,
    paymentMode,
    profile_pic,
    skills,
    status,
    updatedAt,
    userId,
    whatsapp,
    workDate,
    workLocation,
    workType,
    _id,
  } = post;

  const {
    email,
    firstName,
    lastName,
    middleName,
    phoneNumber: phone,
    role: FounderRole,
  } = userId;

  return (
    <>
      {/* Card Component */}
      <div className="flex w-full bg-white items-center justify-between rounded-lg px-5 py-2 border border-gray-300">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1547701787-1ad8f348080a?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex gap-1 ">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        {/* <p>{email}</p> */}
        {/* <p>{phone}</p> */}
        <p className="text-md">
          {" "}
          <span className="text-violet-800 font-semibold">{role}</span>
        </p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <button
          className="text-gray-800 text-xl font-medium px-2 py-2 rounded-lg flex items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <IoEyeOutline />
        </button>
      </div>

      {/* Main Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-violet-300/20 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[600px] max-h-[90%] overflow-y-auto border border-violet-300 shadow-violet-200 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-violet-800">{role}</h2>
              <button
                className="text-red-500 text-xs px-3 py-1.5 rounded-full bg-red-100 border border-red-300"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
            <hr className="my-2.5 text-gray-300" />
            <div className="flex gap-3 items-center mb-4">
              <div className="h-40 w-40 rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/e7/8c/35/e78c359eefec9d1d7b338b4c294b789e.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 items-start mb-4 h-full">
                <p>
                  {" "}
                  <strong>Founder:</strong> {firstName} {lastName}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Email:</strong> {email}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Phone:</strong> {phone}{" "}
                </p>
                <p>
                  {" "}
                  <strong>WhatsApp:</strong> {whatsapp}{" "}
                </p>
              </div>
            </div>
            <hr className="my-2.5 text-gray-300" />
            <div className="text-sm text-gray-700 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  {" "}
                  <strong>Company:</strong> {companyName}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Job Type:</strong> {workType}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Location:</strong> {workLocation}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Work Date:</strong>{" "}
                  {new Date(workDate).toLocaleDateString()}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Payment Mode:</strong> {paymentMode}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Status:</strong> {status}{" "}
                </p>
              </div>
              <hr className="my-2.5 text-gray-300" />
              <p className="mt-3">
                {" "}
                <strong>All Skills:</strong>{" "}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <hr className="my-2.5 text-gray-300" />
              <p className="mt-4">
                {" "}
                <strong>About the Role:</strong>{" "}
              </p>
              <p>{description}</p>
              <hr className="my-2.5 text-gray-300" />
              <div className="mt-4">
                <p className="mt-2">
                  {" "}
                  <strong>Social Links:</strong>{" "}
                </p>
                <div className="flex gap-4 text-blue-600 underline">
                  {facebook && (
                    <a href={facebook} target="_blank" rel="noreferrer">
                      {" "}
                      Facebook{" "}
                    </a>
                  )}
                  {instagram && (
                    <a href={instagram} target="_blank" rel="noreferrer">
                      {" "}
                      Instagram{" "}
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noreferrer">
                      {" "}
                      LinkedIn{" "}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <hr className="my-2.5 text-gray-300" />
            {/* Accept and Reject buttons */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => acceptFunction(_id)}
                className="bg-green-300 text-black text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center"
              >
                Accept
              </button>
              <button
                onClick={() => setIsRejectModalOpen(true)}
                className="bg-yellow-200 text-black text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-60">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px] border border-gray-300 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Reject Reason</h3>
            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              className="w-full p-2 border border-gray-300 rounded resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => sendReasonFunction(_id)}
                disabled={!rejectReason.trim()}
                className={`px-4 py-2 rounded ${
                  rejectReason.trim()
                    ? "bg-red-500 text-white"
                    : "bg-red-300 text-white cursor-not-allowed"
                }`}
              >
                Send Reason
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FounderPostNew;
