import React, { useState } from "react";
// ...icons imports

const TalentPostNew = ({ post, fetchPendingPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleAcceptTalent = async (postId) => {
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

    } catch (error) {
      console.error("Error accepting post:", error);
    }
    setIsModalOpen(false);
  };

  // const handleRejectTalent = async (postId) => {
  //   console.log("Reject reason sent:", reason);
  //   const comment = reason;
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3333/api/admin/reject-post/${postId}`,
  //       {
  //         method: "PATCH",
  //         credentials: "include",
  //         headers: {
  //                   "Content-Type": "application/json", // Explicitly set Content-Type
  //               },
  //         body: JSON.stringify({ comment }),
  //       }
  //     );
  //     if (!response.ok) throw new Error("Failed to reject post");

  //     setIsRejectModalOpen(false);
  //     setReason("");
  //     setIsModalOpen(false);
  //     fetchPendingPost();
  //   } catch (error) {
  //     console.error("Error rejecting post:", error);
  //   }
  // };
const handleRejectTalent = async (postId) => {
    // console.log("Reject reason sent:", reason); // Log reason to verify
    // if (!reason.trim()) {
    //     console.error("Reason is empty or undefined");
    //     alert("Please provide a reason for rejection.");
    //     return;
    // }
    const comment = reason;
    // console.log("Request body:", JSON.stringify({ comment })); // Log payload
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
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to reject post: ${errorData.message || response.status}`);
        }
        console.log("Post rejected successfully");
        setIsRejectModalOpen(false);
        setReason("");
        setIsModalOpen(false);
        fetchPendingPost();
    } catch (error) {
        console.error("Error rejecting post:", error);
        alert("Failed to reject post: " + error.message);
    }
};
  // Extract post data...
  const {
    aboutMe: description,
    categoryName: role,
    companyName,
    createdAt,
    facebook: facebookLink,
    instagram: instagramLink,
    linkedin: linkedinLink,
    portfolio_link,
    profile_pic,
    projects,
    resume_link,
    skills,
    status,
    updatedAt,
    userId: userDetails,
    whatsapp,
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
    role: TalentRole,
  } = userDetails;

  const sortedSkills = [...skills].sort((a, b) => a.length - b.length);

  return (
    <>
      {/* Card */}
      <div className="flex w-full bg-white items-center justify-between rounded-lg px-5 py-3 border border-gray-300">
        {/* Profile Preview */}
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1547701787-1ad8f348080a?q=80&w=2081&auto=format&fit=crop"
            alt=""
          />
        </div>
        <div className="flex gap-1">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <p>{email}</p>
        <p>{phone}</p>
        <p className="text-md">
          <span className="text-violet-800 font-semibold">{role}</span>
        </p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleString("en-US")}
        </p>
        <button
          className="bg-purple-600 text-white text-xs font-medium px-4 py-3 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          View Details
        </button>
      </div>

      {/* Main Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-violet-300/20 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[600px] max-h-[90%] overflow-y-auto border border-violet-300 shadow-lg">
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
            {/* Personal Info */}
            <div className="flex gap-3 items-center mb-4">
              <div className="h-40 w-40 rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/e7/8c/35/e78c359eefec9d1d7b338b4c294b789e.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 items-start mb-4">
                <p>
                  <strong>Founder:</strong> {firstName} {lastName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone:</strong> {phone}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {whatsapp}
                </p>
              </div>
            </div>
            <hr className="my-2.5 text-gray-300" />
            <div className="text-sm text-gray-700 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Company:</strong> {companyName}
                </p>
                <p>
                  <strong>Job Type:</strong> {workType}
                </p>
                <p>
                  <strong>Location:</strong> {workLocation}
                </p>
                <p>
                  <strong>Status:</strong> {status}
                </p>
              </div>
              <hr className="my-2.5 text-gray-300" />
              <p className="mt-3">
                <strong>All Skills:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {sortedSkills.map((skill, index) => (
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
                <strong>About the Role:</strong>
              </p>
              <p>{description}</p>
              <hr className="my-2.5 text-gray-300" />
              <div className="mt-4">
                <p className="mt-2">
                  <strong>Social Links:</strong>
                </p>
                <div className="flex gap-4 text-blue-600 underline">
                  {facebookLink && (
                    <a href={facebookLink} target="_blank">
                      Facebook
                    </a>
                  )}
                  {instagramLink && (
                    <a href={instagramLink} target="_blank">
                      Instagram
                    </a>
                  )}
                  {linkedinLink && (
                    <a href={linkedinLink} target="_blank">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
            <hr className="my-2.5 text-gray-300" />
            <div className="flex justify-center gap-2">
              <button
                className="bg-green-300 text-black text-xs font-medium px-4 py-3 rounded-lg"
                onClick={() => handleAcceptTalent(_id)}
              >
                Accept
              </button>
              <button
                className="bg-yellow-200 text-black text-xs font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsRejectModalOpen(true)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border w-[90%] max-w-md">
            <h2 className="text-lg font-bold text-red-600 mb-2">
              Reason for Rejection
            </h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border rounded-md p-2 mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 px-4 py-2 rounded-md"
                onClick={() => setIsRejectModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  handleRejectTalent(_id);
                  setIsRejectModalOpen(false);
                }}
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

export default TalentPostNew;
