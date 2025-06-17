// import { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { FiCheckSquare } from "react-icons/fi";
// import { IoLogOutOutline } from "react-icons/io5";
// import { IoMdSettings } from "react-icons/io";
// import { ImStatsDots } from "react-icons/im";
// import { FaUserPlus } from "react-icons/fa"; // Icon for Add Admin
// import FounderPost from "./FounderPost";
// import TalentPost from "./TalentPost";
// import { useNavigate } from "react-router-dom";
// import FounderPostNew from "./FounderPostNew";
// import TalentPostNew from "./TalentPostNew";
// import AdminSetting from "./AdminSetting";
// import { GrUserAdmin } from "react-icons/gr";

// Modal.setAppElement("#root");

// // Form component for adding a new admin
// // const AddAdminForm = ({ onClose }) => {
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     middleName: "",
// //     lastName: "",
// //     email: "",
// //     phoneNumber: "",
// //     password: "",
// //     role: "",
// //   });
// //   const [error, setError] = useState(null); // State for error messages
// //   const [success, setSuccess] = useState(false); // State for success feedback

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); // Prevent page reload
// //     setError(null); // Reset error state
// //     setSuccess(false); // Reset success state

// //     try {
// //       const response = await fetch(
// //         "http://localhost:8001/api/admin/register-admin", // Use consistent port (33333 or 8000, verify with backend)
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           credentials: "include",
// //           body: JSON.stringify(formData), // Use formData directly
// //         }
// //       );

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || "Failed to add admin");
// //       }

// //       const data = await response.json();
// //       setSuccess(true); // Mark success
// //       setTimeout(() => {
// //         onClose(); // Close modal after success
// //       }, 1000);
// //     } catch (error) {
// //       console.error("Error in adding new admin:", error);
// //       setError(error.message); // Set error message for user
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
// //       {error && <p className="text-red-500 mb-4">{error}</p>}
// //       {success && <p className="text-green-500 mb-4">Admin added successfully!</p>}
// //       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">First Name</label>
// //           <input
// //             type="text"
// //             name="firstName"
// //             value={formData.firstName}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //             required
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">Middle Name</label>
// //           <input
// //             type="text"
// //             name="middleName"
// //             value={formData.middleName}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">Last Name</label>
// //           <input
// //             type="text"
// //             name="lastName"
// //             value={formData.lastName}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //             required
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //             required
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">Phone Number</label>
// //           <input
// //             type="tel"
// //             name="phoneNumber"
// //             value={formData.phoneNumber}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //             required
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">Password</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //             required
// //           />
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium">Role</label>
// //           <select
// //             name="role"
// //             value={formData.role}
// //             onChange={handleChange}
// //             className="border rounded-md p-2"
// //             required
// //           >
// //             <option value="Admin">Admin</option>
// //             <option value="SuperAdmin">Super Admin</option>
// //           </select>
// //         </div>
// //         <div className="flex justify-end gap-4">
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="bg-gray-300 text-black font-medium px-4 py-2 rounded-md hover:bg-gray-400"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="bg-violet-700 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-800"
// //           >
// //             Add New Admin
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };
// const AddAdminForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     role: '', // Initialize as empty, but we'll enforce selection
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);

//     // Validate role before submission
//     if (!formData.role) {
//       setError('Please select a role');
//       return;
//     }

//     try {
//       console.log('Submitting formData:', formData); // Debug log
//       const response = await fetch('http://localhost:8001/api/admin/register-admin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to add admin');
//       }

//       const data = await response.json();
//       setSuccess(true);
//       setTimeout(() => {
//         onClose();
//       }, 1000);
//     } catch (error) {
//       console.error('Error in adding new admin:', error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-500 mb-4">Admin added successfully!</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Middle Name</label>
//           <input
//             type="text"
//             name="middleName"
//             value={formData.middleName}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           >
//             <option value="" disabled>
//               Select Role
//             </option>
//             <option value="Admin">Admin</option>
//             <option value="SuperAdmin">Super Admin</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-300 text-black font-medium px-4 py-2 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-violet-700 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-800"
//           >
//             Add New Admin
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false); // State for Add Admin modal
//   const [filter, setFilter] = useState("Pending");
//   const [role, setRole] = useState("Founder");
//   const [posts, setPosts] = useState([]);
//   const [showSettings, setShowSettings] = useState(false);

//   const firstName = localStorage.getItem("firstName");
//   const email = localStorage.getItem("email");

//   const fetchPendingPost = async () => {
//     try {
//       const role = localStorage.getItem("role");
//       if (!role) {
//         console.error("User ID or role not found in localStorage");
//         return;
//       }
//       const response = await fetch(
//         "http://localhost:3333/api/admin/pending-posts",
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       if (!response.ok) throw new Error("Failed to fetch listings");
//       const res = await response.json();
//       setPosts(Array.isArray(res.pendingPosts) ? res.pendingPosts : []);
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//     }
//   };

//   // Below is for accepted posts
//   const fetchAcceptedPost = async () => {
//     try {
//       const role = localStorage.getItem("role");
//       if (!role) {
//         console.error("User ID or role not found in localStorage");
//         return;
//       }
//       const response = await fetch(
//         "http://localhost:3333/api/admin/accepted-posts",
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       if (!response.ok) throw new Error("Failed to fetch listings");
//       const res = await response.json();
//       setPosts(Array.isArray(res.acceptedPosts) ? res.acceptedPosts : []);
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//     }
//   };

//   const fetchRejectedPost = async () => {
//     try {
//       const role = localStorage.getItem("role");
//       if (!role) {
//         console.error("User ID or role not found in localStorage");
//         return;
//       }
//       const response = await fetch(
//         "http://localhost:3333/api/admin/rejected-posts",
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       if (!response.ok) throw new Error("Failed to fetch listings");
//       const res = await response.json();
//       setPosts(Array.isArray(res.rejectedPosts) ? res.rejectedPosts : []);
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch("http://localhost:8001/api/admin/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("role");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingPost();
//   }, []);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const openAddAdminModal = () => setIsAddAdminModalOpen(true);
//   const closeAddAdminModal = () => setIsAddAdminModalOpen(false);

//   const filteredPosts = posts.filter((post) => {
//     const roleMatch = role === "All" || post.userId?.role === role;
//     const statusMatch = filter === "All" || post.status === filter;
//     return roleMatch && statusMatch;
//   });

//   const handleFilterClick = (newRole, newFilter) => {
//     if (newFilter === "Accepted") {
//       fetchAcceptedPost();
//     }
//     else if (newFilter === "Rejected") {
//       fetchRejectedPost();
//     }
//     else {
//       fetchPendingPost();
//     }
//     setRole(newRole);
//     setFilter(newFilter);
//     setShowSettings(false);
//   };

//   const handleSettingsClick = () => {
//     setShowSettings(true);
//   };

//   const [isFounderDropdownOpen, setIsFounderDropdownOpen] = useState(false);
//   const [isTalentDropdownOpen, setIsTalentDropdownOpen] = useState(false);

//   // Toggle dropdown states
//   const toggleFounderDropdown = () => setIsFounderDropdownOpen(!isFounderDropdownOpen);
//   const toggleTalentDropdown = () => setIsTalentDropdownOpen(!isTalentDropdownOpen);

//   return (
//     <div className="flex flex-row items-start h-screen bg-gray-200">

//       {/* Sidebar */}
//       <div className="h-full w-[300px] bg-gray-50">
//         <div className="flex flex-col items-center h-full py-5 px-5 gap-6">
//           <div className="flex gap-2 items-center">
//             <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1547701787-1ad8f348080a?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt=""
//               />
//             </div>
//             <div className="flex flex-col">
//               <p className="text-md">Hi, {firstName}</p>
//               <p className="opacity-40 text-sm">{email}</p>
//             </div>
//           </div>
//           <div className="h-[1px] w-full bg-black opacity-30"></div>
//           {/* Founder Dropdown */}
//           <div className="flex flex-col w-full items-start gap-1">
//             <button
//               onClick={toggleFounderDropdown}
//               className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center justify-between px-4 py-2 w-full rounded-md"
//             >
//               <span className="flex items-center gap-5">
//                 <MdOutlinePendingActions /> Founder Posts
//               </span>
//               <span>{isFounderDropdownOpen ? "▲" : "▼"}</span>
//             </button>
//             {isFounderDropdownOpen && (
//               <div className="flex flex-col w-full pl-4 gap-1">
//                 <button
//                   onClick={() => handleFilterClick("Founder", "Pending")}
//                   className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
//                     role === "Founder" && filter === "Pending" && !showSettings
//                       ? "bg-[#F4F4F4] text-violet-700"
//                       : ""
//                   }`}
//                 >
//                   <MdOutlinePendingActions /> Pending Post
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("Founder", "Accepted")}
//                   className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
//                     role === "Founder" && filter === "Accepted" && !showSettings
//                       ? "bg-[#F4F4F4] text-violet-700"
//                       : ""
//                   }`}
//                 >
//                   <FiCheckSquare /> Accepted Post
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("Founder", "Rejected")}
//                   className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
//                     role === "Founder" && filter === "Rejected" && !showSettings
//                       ? "bg-[#F4F4F4] text-violet-700"
//                       : ""
//                   }`}
//                 >
//                   <FiCheckSquare /> Rejected Post
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="h-[1px] w-full bg-black opacity-30"></div>
//           {/* Talent Dropdown */}
//           <div className="flex flex-col w-full items-start gap-1">
//             <button
//               onClick={toggleTalentDropdown}
//               className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center justify-between px-4 py-2 w-full rounded-md"
//             >
//               <span className="flex items-center gap-5">
//                 <MdOutlinePendingActions /> Talent Posts
//               </span>
//               <span>{isTalentDropdownOpen ? "▲" : "▼"}</span>
//             </button>
//             {isTalentDropdownOpen && (
//               <div className="flex flex-col w-full pl-4 gap-1">
//                 <button
//                   onClick={() => handleFilterClick("GetDiscovered", "Pending")}
//                   className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
//                     role === "GetDiscovered" &&
//                     filter === "Pending" &&
//                     !showSettings
//                       ? "bg-[#F4F4F4] text-violet-700"
//                       : ""
//                   }`}
//                 >
//                   <MdOutlinePendingActions /> Pending Post
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("GetDiscovered", "Accepted")}
//                   className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
//                     role === "GetDiscovered" &&
//                     filter === "Accepted" &&
//                     !showSettings
//                       ? "bg-[#F4F4F4] text-violet-700"
//                       : ""
//                   }`}
//                 >
//                   <FiCheckSquare /> Accepted Post
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("GetDiscovered", "Rejected")}
//                   className={`bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md ${
//                     role === "GetDiscovered" &&
//                     filter === "Rejected" &&
//                     !showSettings
//                       ? "bg-[#F4F4F4] text-violet-700"
//                       : ""
//                   }`}
//                 >
//                   <FiCheckSquare /> Rejected Post
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="h-[1px] w-full bg-black opacity-30"></div>
//           <div className="flex flex-col justify-end h-full w-full gap-1">
//             <button
//               onClick={logout}
//               className="bg-white hover:bg-[#F4F4F4] hover:text-violet-700 font-medium transition-all duration-300 flex items-center gap-5 px-4 py-2 w-full rounded-md"
//             >
//               <IoLogOutOutline /> Logout
//             </button>
//             <div className="flex flex-col gap-0">
//               <p className="text-black opacity-30">Feedback</p>
//               <p className="text-black opacity-30">Terms and Conditions</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex flex-col w-full h-full bg-gray-600">
//         {/* Navbar */}
//         <div className="w-full h-[60px] bg-white">
//           <div className="flex flex-row justify-between items-center h-full px-10">
//             <div className="text-2xl font-bold">
//               Klezy - Super Admin Dashboard
//             </div>
//             <div className="flex flex-row gap-4 items-center justify-center">
//               <button
//                 onClick={openAddAdminModal}
//                 className="bg-violet-700 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-800 transition-all duration-300 flex items-center gap-2"
//               >
//                 <FaUserPlus />
//                 Add Admin
//               </button>
//               <button
//                 onClick={() => navigate("/stats")}
//                 className="bg-violet-700 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-800 transition-all duration-300 flex items-center gap-2"
//               >
//                 <ImStatsDots />
//                 View Stats
//               </button>
//               <button
//                 className="bg-violet-700 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-800 transition-all duration-300 flex items-center gap-2"
//                 onClick={() => navigate("/view-all-admins")}
//               >
//                 <GrUserAdmin />
//                 View Admins
//               </button>
//               <IoIosNotificationsOutline className="text-3xl text-violet-800" />
//             </div>
//           </div>
//         </div>
//         {/* Main Content */}
//         <div className="flex flex-col w-full h-full overflow-y-scroll gap-1 px-2 py-5">
//           {showSettings ? (
//             <AdminSetting />
//           ) : (
//             filteredPosts
//               .slice()
//               .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//               .map((post, index) =>
//                 post.userId?.role === "Founder" ? (
//                   <FounderPostNew key={index} post={post} fetchPendingPost={fetchPendingPost} />
//                 ) : (
//                   <TalentPostNew key={index} post={post} fetchPendingPost={fetchPendingPost} />
//                 )
//               )
//           )}
//         </div>
//       </div>
//       {/* Existing Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "800px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//             padding: "4px",
//             borderRadius: "16px",
//             backgroundColor: "#ffffff",
//             border: "none",
//           },
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 1000,
//           },
//         }}
//       >
//         {/* <TalentPostForm onClose={closeModal} /> */}
//       </Modal>
//       {/* Add Admin Modal */}
//       <Modal
//         isOpen={isAddAdminModalOpen}
//         onRequestClose={closeAddAdminModal}
//         style={{
//           content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "600px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//             padding: "0",
//             borderRadius: "16px",
//             backgroundColor: "#ffffff",
//             border: "none",
//           },
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 1000,
//           },
//         }}
//       >
//         <AddAdminForm onClose={closeAddAdminModal} />
//       </Modal>
//     </div>
//   );
// };

// export default Dashboard;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { FiCheckSquare } from "react-icons/fi";
// import { IoLogOutOutline } from "react-icons/io5";
// import { ImStatsDots } from "react-icons/im";
// import { FaUserPlus } from "react-icons/fa";
// import { GrUserAdmin } from "react-icons/gr";
// import FounderPostNew from "./FounderPostNew";
// import TalentPostNew from "./TalentPostNew";
// import AdminSetting from "./AdminSetting";
// import { useNavigate } from "react-router-dom";
// import { GrAnalytics } from "react-icons/gr";
// import { Pie, Bar } from "react-chartjs-2";
// import { IoIosArrowUp } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";
// import Logo1 from "../../assets/KLogo1.svg";
// import Logo2 from "../../assets/KLogo2.svg";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
// } from "chart.js";
// import FounderPosts from "./FounderPosts";
// import TalentPosts from "./TalentPosts";

// // Register all necessary components for both Pie and Bar charts
// ChartJS.register(
//   ArcElement, // For Pie chart
//   Tooltip,
//   Legend,
//   CategoryScale, // For Bar chart x-axis
//   LinearScale, // For Bar chart y-axis
//   BarElement, // For rendering bars
//   Title // Optional: for displaying titles
// );

// Modal.setAppElement("#root");

// const AddAdminForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);

//     if (!formData.role) {
//       setError("Please select a role");
//       return;
//     }

//     try {
//       console.log("Submitting formData:", formData);
//       const response = await fetch(
//         "http://localhost:8001/api/admin/register-admin",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add admin");
//       }

//       setSuccess(true);
//       setTimeout(() => {
//         onClose();
//       }, 1000);
//     } catch (error) {
//       console.error("Error in adding new admin:", error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && (
//         <p className="text-green-500 mb-4">Admin added successfully!</p>
//       )}
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Middle Name</label>
//           <input
//             type="text"
//             name="middleName"
//             value={formData.middleName}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm font-medium">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded-md p-2"
//             required
//           >
//             <option value="" disabled>
//               Select Role
//             </option>
//             <option value="Admin">Admin</option>
//             <option value="SuperAdmin">Super Admin</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-300 text-black font-medium px-4 py-2 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-violet-700 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-800"
//           >
//             Add New Admin
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
//   const [filter, setFilter] = useState("AllFuck");
//   const [role, setRole] = useState("Founder");
//   const [posts, setPosts] = useState([]);
//   const [showSettings, setShowSettings] = useState(false);
//   const [isFounderDropdownOpen, setIsFounderDropdownOpen] = useState(false);
//   const [isTalentDropdownOpen, setIsTalentDropdownOpen] = useState(false);
//   const [postCounts, setPostCounts] = useState({
//     founder: { pending: 0, accepted: 0, rejected: 0 },
//     talent: { pending: 0, accepted: 0, rejected: 0 },
//   });
//   const [showAnalytics, setShowAnalytics] = useState(true);

//   const [maleFemalePieChartData, setMaleFemalePieChartData] = useState(null);
//   const [ageData, setAgeData] = useState(null);
//   const [roleBarChartData, setRoleBarChartData] = useState(null);
//   const [genderPerRoleData, setGenderPerRoleData] = useState(null);
//   const [workBasisBarChartData, setWorkBasisBarChartData] = useState(null);
//   const [userTypeBarChartData, setUserTypeBarChartData] = useState(null);

//   const firstName = localStorage.getItem("firstName");
//   const email = localStorage.getItem("email");

//   const fetchPosts = async (endpoint, role, status) => {
//     try {
//       const userRole = localStorage.getItem("role");
//       if (!userRole) {
//         console.error("User role not found in localStorage");
//         return [];
//       }
//       const response = await fetch(
//         `http://localhost:3333/api/admin/${endpoint}`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       if (!response.ok)
//         throw new Error(`Failed to fetch ${status} posts`);
//       const res = await response.json();
//       return Array.isArray(res[`${status}Posts`])
//         ? res[`${status}Posts`]
//         : [];
//     } catch (error) {
//       console.error(`Error fetching ${status} posts:`, error);
//       return [];
//     }
//   };

//   const fetchAllCounts = async () => {
//     const founderPending = await fetchPosts("pending-posts", "Founder", "pending");
//     const founderAccepted = await fetchPosts("accepted-posts", "Founder", "accepted");
//     const founderRejected = await fetchPosts("rejected-posts", "Founder", "rejected");
//     const talentPending = await fetchPosts("pending-posts", "GetDiscovered", "pending");
//     const talentAccepted = await fetchPosts("accepted-posts", "GetDiscovered", "accepted");
//     const talentRejected = await fetchPosts("rejected-posts", "GetDiscovered", "rejected");

//     setPostCounts({
//       founder: {
//         pending: founderPending.filter((post) => post.userId?.role === "Founder").length,
//         accepted: founderAccepted.filter((post) => post.userId?.role === "Founder").length,
//         rejected: founderRejected.filter((post) => post.userId?.role === "Founder").length,
//       },
//       talent: {
//         pending: talentPending.filter((post) => post.userId?.role === "GetDiscovered").length,
//         accepted: talentAccepted.filter((post) => post.userId?.role === "GetDiscovered").length,
//         rejected: talentRejected.filter((post) => post.userId?.role === "GetDiscovered").length,
//       },
//     });
//   };

//   const fetchPendingPost = async () => {
//     const posts = await fetchPosts("pending-posts", role, "pending");
//     setPosts(posts);
//   };

//   const fetchAcceptedPost = async () => {
//     const posts = await fetchPosts("accepted-posts", role, "accepted");
//     setPosts(posts);
//   };

//   const fetchRejectedPost = async () => {
//     const posts = await fetchPosts("rejected-posts", role, "rejected");
//     setPosts(posts);
//   };

//   const logout = async () => {
//     try {
//       await fetch("http://localhost:8001/api/admin/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("role");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const openAddAdminModal = () => setIsAddAdminModalOpen(true);
//   const closeAddAdminModal = () => setIsAddAdminModalOpen(false);
//   const toggleFounderDropdown = () =>
//     setIsFounderDropdownOpen(!isFounderDropdownOpen);
//   const toggleTalentDropdown = () =>
//     setIsTalentDropdownOpen(!isTalentDropdownOpen);

//   const filteredPosts = posts.filter((post) => {
//     const roleMatch = role === "All" || post.userId?.role === role;
//     const statusMatch = filter === "All" || post.status === filter;
//     return roleMatch && statusMatch;
//   });

//   const handleFilterClick = (newRole, newFilter) => {
//     if (newFilter === "Accepted") {
//       fetchAcceptedPost();
//     } else if (newFilter === "Rejected") {
//       fetchRejectedPost();
//     } else {
//       fetchPendingPost();
//     }
//     setRole(newRole);
//     setFilter(newFilter);
//     setShowSettings(false);
//     setShowAnalytics(false);
//   };

//   const handleSettingsClick = () => {
//     setShowSettings(true);
//     setShowAnalytics(false);
//   };

//   useEffect(() => {
//     const fetchWorkBasisAndUserTypeData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:3333/api/admin/analytics/get-workbasis-and-usertype-data"
//         );
//         const data = await res.json();

//         if (res.ok && data.success) {
//           // Prepare Chart.js format for workBasis
//           setWorkBasisBarChartData({
//             labels: data.workBasis.map((item) => item.label),
//             datasets: [
//               {
//                 label: "Work Basis",
//                 data: data.workBasis.map((item) => item.value),
//                 backgroundColor: "rgba(54, 162, 235, 0.6)",
//                 borderColor: "rgba(54, 162, 235, 1)",
//                 borderWidth: 1,
//               },
//             ],
//           });

//           // Prepare Chart.js format for userType
//           setUserTypeBarChartData({
//             labels: data.userType.map((item) => item.label),
//             datasets: [
//               {
//                 label: "User Type",
//                 data: data.userType.map((item) => item.value),
//                 backgroundColor: "rgba(255, 159, 64, 0.6)",
//                 borderColor: "rgba(255, 159, 64, 1)",
//                 borderWidth: 1,
//               },
//             ],
//           });
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     const fetchGenderPerRoleData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:3333/api/admin/analytics/get-gender-data-for-each-role"
//         );
//         const data = await res.json();

//         if (res.ok && data.success) {
//           setGenderPerRoleData(data);
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     const fetchAgeData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:3333/api/admin/analytics/get-age-data"
//         );
//         const data = await res.json();
//         if (res.ok && data.success) {
//           setAgeData(data.data);
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     const fetchMaleFemaleData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:3333/api/admin/analytics/get-male-female-number"
//         );
//         const data = await res.json();
//         if (res.ok) {
//           setMaleFemalePieChartData({
//             male: data.totalMale,
//             female: data.totalFemale,
//           });
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     const fetchRoleDistributionData = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:3333/api/admin/analytics/get-role-data"
//         );
//         const data = await res.json();
//         if (res.ok && data.success) {
//           setRoleBarChartData({
//             founders: data.noOfFounders,
//             getDiscovereds: data.noOfGetDiscovereds,
//             total: data.total,
//           });
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchWorkBasisAndUserTypeData();
//     fetchGenderPerRoleData();
//     fetchAgeData();
//     fetchMaleFemaleData();
//     fetchRoleDistributionData();
//     fetchPendingPost();
//     fetchAllCounts();
//   }, []);

//   if (!genderPerRoleData) return <p>Loading Gender Role Pie Charts...</p>;

//   const getDiscoveredPieData = {
//     labels: ["Male", "Female"],
//     datasets: [
//       {
//         label: "GetDiscovered Gender Split",
//         data: [
//           genderPerRoleData.totalMaleUnderGetDiscovered,
//           genderPerRoleData.totalfemaleUnderGetDiscovered,
//         ],
//         backgroundColor: ["#3498db", "#e91e63"],
//         borderColor: ["#2980b9", "#c2185b"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const founderPieData = {
//     labels: ["Male", "Female"],
//     datasets: [
//       {
//         label: "Founder Gender Split",
//         data: [
//           genderPerRoleData.totalMaleUnderFounder,
//           genderPerRoleData.totalFemaleUnderFounder,
//         ],
//         backgroundColor: ["#4caf50", "#ff9800"],
//         borderColor: ["#388e3c", "#f57c00"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   if (!ageData) return <p>Loading Bar Chart...</p>;

//   const ageBarChartData = {
//     labels: ageData.map((item) => item.range),
//     datasets: [
//       {
//         label: "Male",
//         data: ageData.map((item) => item.male),
//         backgroundColor: "rgba(54, 162, 235, 0.7)",
//       },
//       {
//         label: "Female",
//         data: ageData.map((item) => item.female),
//         backgroundColor: "rgba(255, 99, 132, 0.7)",
//       },
//     ],
//   };

//   if (!roleBarChartData) return <p>Loading Role Distribution...</p>;

//   const roleChartData = {
//     labels: ["Founder", "GetDiscovered", "Total"],
//     datasets: [
//       {
//         label: "Users by Role",
//         data: [
//           roleBarChartData.founders,
//           roleBarChartData.getDiscovereds,
//           roleBarChartData.total,
//         ],
//         backgroundColor: ["#8e44ad", "#27ae60", "#f39c12"],
//         borderColor: ["#71368a", "#1e8449", "#e67e22"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const roleBarOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "User Data Distribution" },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//       },
//     },
//   };

//   const ageBarOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Age Group by Gender" },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//       },
//     },
//   };

//   if (!maleFemalePieChartData) return <p>Loading Pie Chart...</p>;

//   const pieData = {
//     labels: ["Male", "Female"],
//     datasets: [
//       {
//         label: "Gender Distribution",
//         data: [
//           maleFemalePieChartData.male,
//           maleFemalePieChartData.female,
//         ],
//         backgroundColor: [
//           "rgba(54, 162, 235, 0.7)", // Blue
//           "rgba(255, 99, 132, 0.7)", // Red
//         ],
//         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-row items-start h-screen bg-gray-200">
//       {/* Sidebar */}
//       <div className="h-full w-[300px] bg-[#F5F5F5] border-r border-gray-200 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 text-[16px]">
//         <div className="flex flex-col items-center h-full py-5 px-2 gap-0 ">
//           {/* Below is Personal details and photos */}
//           {/* <div className="flex gap-2 items-center">
//             <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1547701787-1ad8f348080a?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt=""
//               />
//             </div>
//             <div className="flex flex-col">
//               <p className="text-md">Hi, {firstName}</p>
//               <p className="opacity-40 text-sm">{email}</p>
//             </div>
//           </div> */}
//           <img src={Logo2} className="h-10" alt="" />
//           <div className="h-[1px] w-full bg-black opacity-30 my-2"></div>
//           {/* below is button for analytics */}
//           <div className="flex flex-col w-full items-start gap-1">
//             <button
//               className={`bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-between px-4 py-1 w-full rounded-md ${showAnalytics ? "bg-white text-gray-900 " : "bg-[#F4F4F4] text-gray-700"}`}
//               onClick={() => { setShowAnalytics(!showAnalytics); setFilter("All"); }}
//             >
//               <span className="flex items-center gap-3"><GrAnalytics /> Analytics</span>
//             </button>
//           </div>
//           {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
//           {/* Below is the dropdown for Founder Posts */}
//           {/* Founder Dropdown */}
//           <div className="flex flex-col w-full items-start gap-0.5">
//             <button
//               onClick={toggleFounderDropdown}
//               className={`bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-between gap-2 px-4 py-1 w-full rounded-md ${isFounderDropdownOpen ? "bg-white text-gray-900 " : "bg-[#F4F4F4] text-gray-700"}`}
//             >
//               <span className="flex items-center gap-3 w-full">
//                 <MdOutlinePendingActions /> <div className="flex items-center justify-between w-full">Founder Posts <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.founder.pending + postCounts.founder.accepted + postCounts.founder.rejected}</span></div>
//               </span>
//               <span className={`${isFounderDropdownOpen ? "text-gray-800" : "text-gray-700"}`}>{isFounderDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
//             </button>
//             {isFounderDropdownOpen && (
//               <div className="flex flex-col w-full pl-2">
//                 <button
//                   onClick={() => handleFilterClick("Founder", "Pending")}
//                   className={`hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1.5 w-full rounded-md ${role === "Founder" && filter === "Pending" && !showSettings
//                     ? "bg-white text-gray-900 "
//                     : "bg-[#F4F4F4] text-gray-700"
//                     }`}
//                 >
//                   <MdOutlinePendingActions /> <div className="flex items-center justify-between w-[70%]">Pending <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.founder.pending}</span></div>
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("Founder", "Accepted")}
//                   className={`hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1.5 w-full rounded-md ${role === "Founder" && filter === "Accepted" && !showSettings
//                     ? "bg-white text-gray-900 "
//                     : "bg-[#F4F4F4] text-gray-700"
//                     }`}
//                 >
//                   <FiCheckSquare /> <div className="flex items-center justify-between w-[70%]">Accepted <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.founder.accepted}</span></div>
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("Founder", "Rejected")}
//                   className={`hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1.5 w-full rounded-md ${role === "Founder" && filter === "Rejected" && !showSettings
//                     ? "bg-white text-gray-900"
//                     : "bg-[#F4F4F4] text-gray-700"
//                     }`}
//                 >
//                   <FiCheckSquare /> <div className="flex items-center justify-between w-[70%]">Rejected <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.founder.rejected}</span></div>
//                 </button>
//               </div>
//             )}
//           </div>
//           {/* <div cl   assName="h-[1px] w-full bg-black opacity-30"></div> */}
//           {/* Talent Dropdown */}
//           <div className="flex flex-col w-full items-start gap-0.5">
//             <button
//               onClick={toggleTalentDropdown}
//               className={`bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-between gap-2 px-4 py-1 w-full rounded-md ${isTalentDropdownOpen ? "bg-white text-gray-900 " : "bg-[#F4F4F4] text-gray-700"}`}
//             >
//               <span className="flex items-center gap-3 w-full">
//                 <MdOutlinePendingActions /> <div className="flex items-center justify-between w-full">Talent Posts <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.talent.pending + postCounts.talent.accepted + postCounts.talent.rejected}</span></div>
//               </span>
//               <span className={`${isTalentDropdownOpen ? "text-gray-800" : "text-gray-700"}`}>{isTalentDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
//             </button>
//             {isTalentDropdownOpen && (
//               <div className="flex flex-col w-full pl-2">
//                 <button
//                   onClick={() => handleFilterClick("GetDiscovered", "Pending")}
//                   className={`bg-[#F4F4F4] hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1.5 w-full rounded-md ${role === "GetDiscovered" &&
//                     filter === "Pending" &&
//                     !showSettings
//                     ? "bg-white text-gray-900"
//                     : "bg-[#F4F4F4] text-gray-700"
//                     }`}
//                 >
//                   <MdOutlinePendingActions /> <div className="flex items-center justify-between w-[70%]">Pending <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.talent.pending}</span></div>
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("GetDiscovered", "Accepted")}
//                   className={`bg-[#F4F4F4] hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1.5 w-full rounded-md ${role === "GetDiscovered" &&
//                     filter === "Accepted" &&
//                     !showSettings
//                     ? "bg-white text-gray-900"
//                     : "bg-[#F4F4F4] text-gray-700"
//                     }`}
//                 >
//                   <FiCheckSquare /> <div className="flex items-center justify-between w-[70%]">Accepted <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.talent.accepted}</span></div>
//                 </button>
//                 <button
//                   onClick={() => handleFilterClick("GetDiscovered", "Rejected")}
//                   className={`bg-[#F4F4F4] hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1.5 w-full rounded-md ${role === "GetDiscovered" &&
//                     filter === "Rejected" &&
//                     !showSettings
//                     ? "bg-white text-gray-900"
//                     : "bg-[#F4F4F4] text-gray-700"
//                     }`}
//                 >
//                   <FiCheckSquare /> <div className="flex items-center justify-between w-[70%]">Rejected <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">{postCounts.talent.rejected}</span></div>
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="flex flex-col w-full items-start gap-0.5">
//             <button
//               onClick={() => navigate("/stats")}
//               className="bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center  gap-2 px-4 py-1 w-full rounded-md"
//             >
//               <ImStatsDots />View Stats
//             </button>
//             <button
//               className="bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center  gap-2 px-4 py-1 w-full rounded-md"
//               onClick={() => navigate("/view-all-admins")}
//             >
//               <GrUserAdmin />View Admins
//             </button>
//           </div>
//           {/* <div className="h-[1px] w-full bg-black opacity-30"></div> */}
//           <div className="flex flex-col justify-end w-full gap-1">
//             <button
//               onClick={logout}
//               className="bg-[#F4F4F4] hover:bg-white hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1 w-full rounded-md"
//             >
//               <IoLogOutOutline /> Logout
//             </button>
//             <div className="flex flex-col gap-0">
//               {/* <p className="text-black opacity-30">Feedback</p> */}
//               <p className="text-black opacity-30">Help & Support</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex flex-col w-full h-full bg-[#F0F0F0]">
//         {/* Navbar */}
//         <div className="w-full h-[60px] bg-[#FEFEFE]">
//           <div className="flex flex-row justify-between items-center h-full px-10">
//             <div className="text-2xl font-bold">
//               <img src={Logo1} alt="" className="h-10" />
//             </div>
//             {/* <div className="flex flex-row gap-4 items-center justify-center"> */}
//             <button
//               onClick={openAddAdminModal}
//               className="bg-gray-700 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
//             >
//               <FaUserPlus />
//               Add
//             </button>
//             {/* <IoIosNotificationsOutline className="text-3xl text-gray-800" /> */}
//             {/* </div> */}
//           </div>
//         </div>
//         {/* Main Display */}
//         <div className="flex flex-col w-full h-full overflow-y-scroll gap-1">
//           {/* First line */}
//           {showAnalytics ? (
//             <div className="grid grid-cols-3 w-full h-fit rounded-md p-1 gap-3">
//               {/* Blank content for analytics */}
//               <h2 className="col-span-3 text-2xl font-bold text-gray  -800">{" "}Analytics{" "}</h2>
//               {/* Pie Chart */}
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex flex-col items-center justify-center">
//                 <p className="w-full">Gender Statistics</p>
//                 <Pie
//                   key={JSON.stringify(pieData)} // avoid canvas re-use error
//                   data={pieData}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: {
//                         position: "bottom",
//                       },
//                       tooltip: {
//                         enabled: true,
//                       },
//                     },
//                   }}
//                 />
//               </div>
//               {/* Bar Charts on Age Group */}
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex flex-col items-center justify-center">
//                 <p className="w-full">Age Statistics</p>
//                 <Bar
//                   className="w-full h-full bg-white"
//                   key={JSON.stringify(ageBarChartData)}
//                   data={ageBarChartData}
//                   options={ageBarOptions}
//                 />
//               </div>
//               {/* Bar Chart for Role Distribution */}
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex items-center justify-center">
//                 <Bar
//                   className="w-full h-full bg-white"
//                   data={roleChartData}
//                   options={roleBarOptions}
//                 />
//               </div>
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex flex-col items-center justify-center">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">
//                     GetDiscovered Gender Split
//                   </h2>
//                   <Pie data={getDiscoveredPieData} />
//                 </div>
//               </div>
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex flex-col items-center justify-center">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">
//                     Founder Gender Split
//                   </h2>
//                   <Pie data={founderPieData} />
//                 </div>
//               </div>
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex flex-col items-center justify-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Work Basis Distribution
//                 </h3>
//                 <Bar
//                   data={workBasisBarChartData}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top" },
//                     },
//                     scales: {
//                       y: {
//                         beginAtZero: true,
//                         ticks: { stepSize: 1 },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//               <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 h-full w-full flex flex-col items-center justify-center">
//                 <h3 className="text-xl font-semibold mt-6 mb-2">
//                   User Type Distribution
//                 </h3>
//                 <Bar
//                   data={userTypeBarChartData}
//                   options={{
//                     responsive: true,
//                     plugins: {
//                       legend: { position: "top" },
//                     },
//                     scales: {
//                       y: {
//                         beginAtZero: true,
//                         ticks: { stepSize: 1 },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//           ) : showSettings ? (
//             // aa admin settings component koi kaam no nathi.
//             <AdminSetting />
//           ) : (
//             filteredPosts
//               .slice()
//               .sort(
//                 (a, b) =>
//                   new Date(a.UpdatedAt) -
//                   new Date(b.UpdatedAt)
//               )
//               .map((post, index) =>
//                 post.userId?.role === "Founder" ? (
//                   <FounderPostNew
//                     key={index}
//                     post={post}
//                     fetchPendingPost={fetchPendingPost}
//                   />
//                 ) : (
//                   <TalentPostNew
//                     key={index}
//                     post={post}
//                     fetchPendingPost={fetchPendingPost}
//                   />
//                 )
//               )
//           )}
//         </div>
//       </div>
//       {/* THis modal is not any working */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "800px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//             padding: "4px",
//             borderRadius: "16px",
//             backgroundColor: "#ffffff",
//             border: "none",
//           },
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 1000,
//           },
//         }}
//       >
//         {/* <TalentPostForm onClose={closeModal} /> */}
//       </Modal>
//       {/* Add Admin Modal */}
//       <Modal
//         isOpen={isAddAdminModalOpen}
//         onRequestClose={closeAddAdminModal}
//         style={{
//           content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "600px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//             padding: "0",
//             borderRadius: "16px",
//             backgroundColor: "#ffffff",
//             border: "none",
//           },
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             zIndex: 1000,
//           },
//         }}
//       >
//         <AddAdminForm onClose={closeAddAdminModal} />
//       </Modal>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";
import { FaUserPlus } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { GrAnalytics } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../assets/KLogo1.svg";
import Logo2 from "../../assets/KLogo2.svg";
import FounderPosts from "../../components/SuperAdmin/FounderPosts";
import TalentPosts from "../../components/SuperAdmin/TalentPosts";
import AdminSetting from "../../components/SuperAdmin/AdminSetting";
import Analytics from "../../components/SuperAdmin/Analytics";
import ViewAllAdmins from "../../components/SuperAdmin/ViewAllAdmins";
import DRS from "../../components/SuperAdmin/DRS";

Modal.setAppElement("#root");

const AddAdminForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!formData.role) {
            setError("Please select a role");
            return;
        }

        try {
            console.log("Submitting formData:", formData);
            const response = await fetch(
                "http://localhost:8001/api/admin/register-admin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add admin");
            }

            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error("Error in adding new admin:", error);
            setError(error.message);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && (
                <p className="text-green-500 mb-4">Admin added successfully!</p>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Middle Name</label>
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    >
                        <option value="" disabled>
                            Select Role
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="SuperAdmin">Super Admin</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-black font-medium px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-gray-700 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        Add New Admin
                    </button>
                </div>
            </form>
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [displayComponent, setDisplayComponent] = useState("analytics");
    const [postCounts, setPostCounts] = useState({
        founder: { pending: 0, accepted: 0, rejected: 0 },
        talent: { pending: 0, accepted: 0, rejected: 0 },
    });

    const firstName = localStorage.getItem("firstName");
    const email = localStorage.getItem("email");

    const fetchPosts = async (endpoint, role, status) => {
        try {
            const userRole = localStorage.getItem("role");
            if (!userRole) {
                console.error("User role not found in localStorage");
                return [];
            }
            const response = await fetch(
                `http://localhost:3333/api/admin/${endpoint}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!response.ok)
                throw new Error(`Failed to fetch ${status} posts`);
            const res = await response.json();
            return Array.isArray(res[`${status}Posts`])
                ? res[`${status}Posts`]
                : [];
        } catch (error) {
            console.error(`Error fetching ${status} posts:`, error);
            return [];
        }
    };

    const fetchAllCounts = async () => {
        const founderPending = await fetchPosts(
            "pending-posts",
            "Founder",
            "pending"
        );
        const founderAccepted = await fetchPosts(
            "accepted-posts",
            "Founder",
            "accepted"
        );
        const founderRejected = await fetchPosts(
            "rejected-posts",
            "Founder",
            "rejected"
        );
        const talentPending = await fetchPosts(
            "pending-posts",
            "GetDiscovered",
            "pending"
        );
        const talentAccepted = await fetchPosts(
            "accepted-posts",
            "GetDiscovered",
            "accepted"
        );
        const talentRejected = await fetchPosts(
            "rejected-posts",
            "GetDiscovered",
            "rejected"
        );

        setPostCounts({
            founder: {
                pending: founderPending.filter(
                    (post) => post.userId?.role === "Founder"
                ).length,
                accepted: founderAccepted.filter(
                    (post) => post.userId?.role === "Founder"
                ).length,
                rejected: founderRejected.filter(
                    (post) => post.userId?.role === "Founder"
                ).length,
            },
            talent: {
                pending: talentPending.filter(
                    (post) => post.userId?.role === "GetDiscovered"
                ).length,
                accepted: talentAccepted.filter(
                    (post) => post.userId?.role === "GetDiscovered"
                ).length,
                rejected: talentRejected.filter(
                    (post) => post.userId?.role === "GetDiscovered"
                ).length,
            },
        });
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:8001/api/admin/logout", {
                method: "POST",
                credentials: "include",
            });
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
            navigate("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openAddAdminModal = () => setIsAddAdminModalOpen(true);
    const closeAddAdminModal = () => setIsAddAdminModalOpen(false);

    const handleSettingsClick = () => {
        setShowSettings(true);
        setDisplayComponent("settings");
    };

    useEffect(() => {
        fetchAllCounts();
    }, []);

    return (
        <div className="flex flex-row items-start h-screen bg-gray-200">
            {/* Sidebar */}
            <div className="h-full w-[350px] bg-[#F5F5F5] border-r border-gray-200 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 text-[16px]">
                <div className="flex flex-col items-center h-full py-5 px-2 gap-0">
                    <img src={Logo2} className="h-10" alt="" />
                    <div className="h-[1px] w-full bg-black opacity-30 my-2"></div>
                    {/* Analytics Button */}
                    <div className="text-xs flex flex-col w-full items-start gap-1">
                        <button
                            className={`text-xs bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-between px-4 py-1 w-full rounded-md ${
                                displayComponent === "analytics"
                                    ? "bg-white text-gray-900"
                                    : "bg-[#F4F4F4] text-gray-700"
                            }`}
                            onClick={() => setDisplayComponent("analytics")}
                        >
                            <span className="flex items-center gap-3">
                                <GrAnalytics /> Analytics
                            </span>
                        </button>
                    </div>
                    {/* Founder Posts Button */}
                    <div className="flex flex-col w-full items-start gap-0.5">
                        <button
                            className={`text-xs bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-between gap-2 px-4 py-1 w-full rounded-md ${
                                displayComponent === "founder"
                                    ? "bg-white text-gray-900"
                                    : "bg-[#F4F4F4] text-gray-700"
                            }`}
                            onClick={() => setDisplayComponent("founder")}
                        >
                            <span className="flex items-center gap-3 w-full">
                                <MdOutlinePendingActions />
                                <div className="flex items-center justify-between w-full">
                                    Discover Talent
                                    <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">
                                        {postCounts.founder.pending +
                                            postCounts.founder.accepted +
                                            postCounts.founder.rejected}
                                    </span>
                                </div>
                            </span>
                        </button>
                    </div>
                    {/* Talent Posts Button */}
                    <div className="flex flex-col w-full items-start gap-0.5">
                        <button
                            className={`text-xs bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center justify-between gap-2 px-4 py-1 w-full rounded-md ${
                                displayComponent === "talent"
                                    ? "bg-white text-gray-900"
                                    : "bg-[#F4F4F4] text-gray-700"
                            }`}
                            onClick={() => setDisplayComponent("talent")}
                        >
                            <span className="flex items-center gap-3 w-full">
                                <MdOutlinePendingActions />
                                <div className="flex items-center justify-between w-full">
                                    Get Discovered
                                    <span className="bg-black text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">
                                        {postCounts.talent.pending +
                                            postCounts.talent.accepted +
                                            postCounts.talent.rejected}
                                    </span>
                                </div>
                            </span>
                        </button>
                    </div>
                    {/* Other Buttons */}
                    <div className="flex flex-col w-full items-start gap-0.5">
                        <button
                            onClick={() => navigate("/stats")}
                            className="text-xs bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-2 px-4 py-1 w-full rounded-md"
                        >
                            <ImStatsDots /> View Stats
                        </button>
                        <button
                            onClick={() => setDisplayComponent("drs")}
                            className="text-xs bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-2 px-4 py-1 w-full rounded-md"
                        >
                            <ImStatsDots /> Requested DRS
                        </button>
                        <button
                            className="text-xs bg-[#F4F4F4] hover:text-gray-900 text-gray-700 font-medium transition-all duration-300 flex items-center gap-2 px-4 py-1 w-full rounded-md"
                            onClick={handleSettingsClick}
                        >
                            <GrUserAdmin /> Settings
                        </button>
                    </div>
                    <div className="flex flex-col justify-end w-full gap-1">
                        <button
                            onClick={logout}
                            className="text-xs bg-[#F4F4F4] hover:bg-white hover:text-red-800 text-gray-700 font-medium transition-all duration-300 flex items-center gap-3 px-4 py-1 w-full rounded-md"
                        >
                            <IoLogOutOutline /> Logout
                        </button>
                        <div className="flex flex-col gap-0">
                            <p className="text-black opacity-30">
                                Help & Support
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col w-full h-full bg-[#F0F0F0]">
                
                {/* Main Display */}
                <div className="flex flex-col w-full h-full overflow-y-scroll gap-1">
                    {displayComponent === "viewAllAdmins" ? (
                        <ViewAllAdmins />
                    ) : displayComponent === "drs" ? (
                        <DRS />
                    ) : displayComponent === "analytics" ? (
                        <Analytics />
                    ) : displayComponent === "founder" ? (
                        <FounderPosts
                            setShowSettings={setShowSettings}
                            setShowAnalytics={() =>
                                setDisplayComponent("founder")
                            }
                        />
                    ) : (
                        <TalentPosts
                            setShowSettings={setShowSettings}
                            setShowAnalytics={() =>
                                setDisplayComponent("talent")
                            }
                        />
                    )}
                </div>
            </div>
            {/* Modals */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "800px",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        padding: "4px",
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        border: "none",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1000,
                    },
                }}
            ></Modal>
            <Modal
                isOpen={isAddAdminModalOpen}
                onRequestClose={closeAddAdminModal}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "600px",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        padding: "0",
                        borderRadius: "16px",
                        backgroundColor: "#ffffff",
                        border: "none",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1000,
                    },
                }}
            >
                <AddAdminForm onClose={closeAddAdminModal} />
            </Modal>
        </div>
    );
};

export default Dashboard;
