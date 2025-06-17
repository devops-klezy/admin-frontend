import React, { useState, useEffect, useRef } from "react";
import {
    IoEyeOutline,
    IoCopyOutline,
    IoEllipsisVertical,
} from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import NoDataFound from "../../assets/NoDataFound.svg";
import { FaStreetView } from "react-icons/fa";
import "./Posts.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FounderPosts = ({ setShowSettings, setShowAnalytics }) => {
    const [filter, setFilter] = useState("Pending");
    // const [role, setRole] = useState("Founder");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const [tooltipMessage, setTooltipMessage] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef({}); // Store refs for each dropdown
    const [selectedDomain, setSelectedDomain] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc"); // Sort direction: 'asc' or 'desc'

    const fetchPosts = async (endpoint, status) => {
        setLoading(true);
        setError(null);
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
            const res = await response.json();
            console.log(`res is this :`, res);
            return Array.isArray(res[`${status}Posts`])
                ? res[`${status}Posts`]
                : [];
        } catch (error) {
            console.error(`Error fetching ${status} posts:`, error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchSaveForLater = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `http://localhost:3333/api/admin/get-all-save-for-later-posts/Founder`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const res = await response.json();
            const data = res.data;
            console.log(`res is this :`, res);
            console.log(`data is this :`, data);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error(`Error fetching Save for Later posts:`, error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingPost = async () => {
        const posts = await fetchPosts("pending-posts", "pending");
        setPosts(posts);
    };

    const fetchAcceptedPost = async () => {
        const posts = await fetchPosts("accepted-posts", "accepted");
        setPosts(posts);
    };

    const fetchRejectedPost = async () => {
        const posts = await fetchPosts("rejected-posts", "rejected");
        setPosts(posts);
    };

    const fetchSaveForLaterPost = async () => {
        const posts = await fetchSaveForLater();
        setPosts(posts);
    };

    const acceptFunction = async (postId) => {
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
            if (filter === "Accepted") fetchAcceptedPost();
            else if (filter === "Rejected") fetchRejectedPost();
            else fetchPendingPost();
        } catch (error) {
            console.error("Error accepting post:", error);
            setError(error.message);
        }
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    const sendReasonFunction = async (postId) => {
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
            if (filter === "Accepted") fetchAcceptedPost();
            else if (filter === "Rejected") fetchRejectedPost();
            else fetchPendingPost();
            setIsRejectModalOpen(false);
            setRejectReason("");
            setIsModalOpen(false);
            setSelectedPost(null);
        } catch (error) {
            console.error("Error rejecting post:", error);
            setError(error.message);
        }
    };

    const handleFilterClick = (newFilter) => {
        if (newFilter === "Accepted") {
            fetchAcceptedPost();
        } else if (newFilter === "Rejected") {
            fetchRejectedPost();
        } else if (newFilter === "Pending") {
            fetchPendingPost();
        } else {
            fetchSaveForLaterPost();
        }
        setFilter(newFilter);
        if (setShowSettings && setShowAnalytics) {
            setShowSettings(false);
            setShowAnalytics(false);
        }
    };

    const addtosaveforlater = async (postId, role) => {
        try {
            console.log("role :    ", role);
            const response = await fetch(
                `http://localhost:3333/api/admin/add-to-save-for-later/${role}/${postId}`,
                {
                    method: "PUT",
                    credentials: "include",
                }
            );
            const res = await response.json();
            console.log(`res is this :`, res);
            if (res.success) {
                handleFilterClick(filter);
            }
        } catch (error) {
            console.error(`Error in seved:`, error);
            setError(error.message);
            return [];
        }
    };

    useEffect(() => {
        handleFilterClick(filter);
    }, []);
    const uniqueDomains = [
        "All",
        ...new Set(posts.map((post) => post.domainName).filter(Boolean)),
    ];
    const uniqueRoles = [
        "All",
        ...new Set(posts.map((post) => post.roleUnderDomain).filter(Boolean)),
    ];
    // console.log("posts: ", posts);
    const filteredPosts = posts.filter((post) => {
        const roleMatch = post.userId?.role === "Founder";
        const domainMatch =
            selectedDomain === "All" || post.domainName === selectedDomain;
        const roleUnderDomainMatch =
            selectedRole === "All" || post.roleUnderDomain === selectedRole;
        return roleMatch && domainMatch && roleUnderDomainMatch;
    });

    // console.log("filter: ", filter);
    console.log("filteredPost: ", filteredPosts);

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
        setActiveDropdown(null);
    };

    const copyToClipboard = (postId) => {
        navigator.clipboard.writeText(postId).then(
            () => {
                setTooltipMessage((prev) => ({ ...prev, [postId]: "Copied!" }));
                setTimeout(() => {
                    setTooltipMessage((prev) => ({ ...prev, [postId]: "" }));
                }, 2000);
            },
            (err) => {
                console.error("Failed to copy: ", err);
                setTooltipMessage((prev) => ({
                    ...prev,
                    [postId]: "Failed to copy",
                }));
            }
        );
        setActiveDropdown(null);
    };

    const toggleDropdown = (postId) => {
        setActiveDropdown(activeDropdown === postId ? null : postId);
    };

    // Handle clicks outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown) {
                const dropdownElement = dropdownRef.current[activeDropdown];
                if (
                    dropdownElement &&
                    !dropdownElement.contains(event.target)
                ) {
                    setActiveDropdown(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeDropdown]);

    // console.log("Filtered Posts:", filteredPosts);

    const getCountryName = (code) =>
        Country.getAllCountries().find((c) => c.isoCode === code)?.name || code;
    const getStateName = (countryCode, stateCode) =>
        State.getStatesOfCountry(countryCode).find(
            (s) => s.isoCode === stateCode
        )?.name || stateCode;
    const getCityName = (countryCode, stateCode, cityName) =>
        City.getCitiesOfState(countryCode, stateCode).find(
            (c) => c.name === cityName
        )?.name || cityName;

    const sortedPosts = filteredPosts.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="flex flex-col w-full h-full px-2 py-1">
            {/* Navbar for Status Filters */}
            <div className="flex justify-between border-b border-gray-300 mb-2">
                <div className="flex">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            filter === "Pending"
                                ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                : " text-gray-500"
                        }`}
                        onClick={() => handleFilterClick("Pending")}
                    >
                        Pending Post
                        {/* {postCounts.founder.pending >= 0 && (
              <span className="ml-1 text-xs  px-1 py-0.5 rounded-full">
                {postCounts.founder.pending}
              </span>
            )} */}
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            filter === "Accepted"
                                ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                : " text-gray-500"
                        }`}
                        onClick={() => handleFilterClick("Accepted")}
                    >
                        Accepted Post
                        {/* {postCounts.founder.accepted >= 0 && (
              <span className="ml-1 text-xs  px-1 py-0.5 rounded-full">
                {postCounts.founder.accepted}
              </span>
            )} */}
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium Aliment${
                            filter === "Rejected"
                                ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                : " text-gray-500"
                        }`}
                        onClick={() => handleFilterClick("Rejected")}
                    >
                        Rejected Post
                        {/* {postCounts.founder.rejected >= 0 && (
              <span className="ml-1 text-xs px-1 py-0.5 rounded-full">
                {postCounts.founder.rejected}
              </span>
            )} */}
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            filter === "SaveForLater"
                                ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                : " text-gray-500"
                        }`}
                        onClick={() => handleFilterClick("SaveForLater")}
                    >
                        Saved For Later
                        {/* {postCounts.founder.rejected >= 0 && (
              <span className="ml-1 text-xs px-1 py-0.5 rounded-full">
                {postCounts.founder.rejected}
              </span>
            )} */}
                    </button>
                </div>
                {/* <div className="w-[30%]">
          <input
            type="text"
            placeholder="Search posts..."
            className=" bg-white w-full px-4 py-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setPosts((prevPosts) =>
                prevPosts.filter((post) =>
                  post.userId?.firstName.toLowerCase().includes(searchTerm) ||
                  post.userId?.lastName.toLowerCase().includes(searchTerm) ||
                  post.companyName.toLowerCase().includes(searchTerm)
                )
              );
            }}
          />
        </div> */}
            </div>

            {/* Male, Female Others number is printing */}
            <div className="w-full">
                {/* <div> */}
                {filter === "Pending" ? (
                    <div className="flex gap-10 items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Total Pending Posts{" "}
                            <span>{filteredPosts.length}</span>{" "}
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Male:{" "}
                            {
                                filteredPosts.filter(
                                    (post) => post.gender === "Male"
                                ).length
                            }
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Female:{" "}
                            {
                                filteredPosts.filter(
                                    (post) => post.gender === "Female"
                                ).length
                            }
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Prefer not to say:{" "}
                            {
                                filteredPosts.filter(
                                    (post) =>
                                        post.gender === "Prefer not to say"
                                ).length
                            }
                        </h2>
                    </div>
                ) : filter === "Accepted" ? (
                    <div className="flex gap-10 items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Total Accepted Posts{" "}
                            <span>{filteredPosts.length}</span>{" "}
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Male:{" "}
                            {
                                filteredPosts.filter(
                                    (post) => post.gender === "Male"
                                ).length
                            }
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Female:{" "}
                            {
                                filteredPosts.filter(
                                    (post) => post.gender === "Female"
                                ).length
                            }
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Prefer not to say:{" "}
                            {
                                filteredPosts.filter(
                                    (post) =>
                                        post.gender === "Prefer not to say"
                                ).length
                            }
                        </h2>
                    </div>
                ) : (
                    <div className="flex gap-10 items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Total Rejected Posts{" "}
                            <span>{filteredPosts.length}</span>{" "}
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Male:{" "}
                            {
                                filteredPosts.filter(
                                    (post) => post.gender === "Male"
                                ).length
                            }
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Female:{" "}
                            {
                                filteredPosts.filter(
                                    (post) => post.gender === "Female"
                                ).length
                            }
                        </h2>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Prefer not to say:{" "}
                            {
                                filteredPosts.filter(
                                    (post) =>
                                        post.gender === "Prefer not to say"
                                ).length
                            }
                        </h2>
                    </div>
                )}
                {/* </div> */}
            </div>
            <div className="w-full mb-2 flex items-center gap-5">
                <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {uniqueDomains.map((domain, idx) => (
                        <option key={idx} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {uniqueRoles.map((role, idx) => (
                        <option key={idx} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table for Posts */}
            {loading ? (
                <div className="loader m-auto"></div>
            ) : error ? (
                <p className="text-red-600">Error: {error}</p>
            ) : filteredPosts.length === 0 ? (
                <img
                    src={NoDataFound}
                    alt="No posts found"
                    className="mx-auto h-[90%]"
                />
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-[40px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Save
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Talent Name
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Domain
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Accepted Posts
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() =>
                                    setSortOrder(
                                        sortOrder === "asc" ? "desc" : "asc"
                                    )
                                }
                            >
                                Updated At{" "}
                                <span className="ml-1">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                </span>
                            </th>
                            <th className="w-[80px] px-0.5 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedPosts.map((post, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="w-[40px] px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                                    <button
                                        className="text-left px-1 py-1 text-xs text-gray-700 hover:bg-violet-50 flex items-center gap-2"
                                        onClick={() =>
                                            addtosaveforlater(
                                                post._id,
                                                post.userId.role
                                            )
                                        }
                                    >
                                        {post.isSaveForLaterByAdmin ? (
                                            <FaStar />
                                        ) : (
                                            <FaRegStar />
                                        )}
                                    </button>
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">
                                    {post.userId?.firstName}{" "}
                                    {post.userId?.lastName}
                                </td>
                                <td className="px-3 py-1 whitespace-nowrap text-xs text-gray-900">
                                    {post.domainName || "N/A"}
                                </td>
                                <td className="px-3 py-1 whitespace-nowrap text-xs text-violet-800 font-semibold">
                                    {post.roleUnderDomain || "N/A"}
                                </td>
                                <td className="px-3 py-1 whitespace-nowrap text-xs text-violet-800 font-semibold">
                                    {post.email || "N/A"}
                                </td>
                                <td className="px-3 py-1 whitespace-nowrap text-xs text-gray-500 font-semibold">
                                    {post.userId?.acceptedPosts}
                                </td>
                                <td className="w-[10px] px-3 py-1 whitespace-nowrap text-xs text-gray-500">
                                    {!post.isUpdated ? "New" : "Update"}
                                </td>
                                <td className="w-[120px] px-3 py-1 whitespace-nowrap text-xs text-gray-500">
                                    {new Date(post.updatedAt).toLocaleString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </td>
                                <td className="w-[80px] px-0.5 py-1 flex items-center justify-center text-sm">
                                    <div className="w-fit flex items-center justify-center gap-0.5">
                                        <button
                                            className="text-left px-1 py-1 text-sm text-gray-700 hover:bg-violet-100 flex items-center gap-2"
                                            onClick={() => openModal(post)}
                                        >
                                            <IoEyeOutline />
                                        </button>
                                        <button
                                            className="text-left px-1 py-1 text-sm text-gray-700 hover:bg-violet-100 flex items-center gap-2"
                                            onClick={() =>
                                                window.open(
                                                    `/founder/profile/${post.userId._id}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <FaStreetView />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Main Modal */}
            {isModalOpen &&
                selectedPost &&
                (() => {
                    // Extract data from post
                    const {
                        headline,
                        domainName,
                        roleUnderDomain,
                        skills = [],
                        startUpName,
                        aboutEntity,
                        workMode,
                        workCity,
                        workState,
                        workCountry,
                        workBasis,
                        timeCommitment,
                        userType,
                        requirementType,
                        otherUserType,
                        otherRequirementType,
                        experienceRange,
                        responsibilities,
                        facebook,
                        instagram,
                        linkedin,
                        whatsapp,
                        email,
                        websiteOfStartupLink,
                        internshipType,
                        internshipTimeType,
                        jobTimeType,
                        internshipDuration,
                        internshipStipendRange,
                        internshipPerformanceCriteria,
                        collaborationDescription,
                        jobAmountRange,
                        freelancePaymentRange,
                        projectDescription,
                        percentageBasisValue,
                        equityBasisValue,
                        otherWorkBasis,
                        partnershipCriteria,
                        whyShouldJoin,
                        anyOtherInfo,
                        userId: userDetails,
                        profile_pic,
                    } = selectedPost;
                    // console.log(profile_pic)
                    const {
                        firstName,
                        middleName,
                        lastName,
                        country,
                        state,
                        city,
                        gender,
                        email: userEmail,
                    } = userDetails || {};
                    console.log(userDetails);

                    // Format work location
                    const workLocation = {
                        country: workCountry,
                        state: workState,
                        district: workCity,
                    };

                    // Format contact methods
                    const contact_methods = {
                        call: {
                            selected: !!selectedPost.call,
                            value: selectedPost.call || "",
                        },
                        whatsapp: {
                            selected: !!whatsapp,
                            value: whatsapp || "",
                        },
                        instagram: {
                            selected: !!instagram,
                            value: instagram || "",
                        },
                        linkedin: {
                            selected: !!linkedin,
                            value: linkedin || "",
                        },
                        facebook: {
                            selected: !!facebook,
                            value: facebook || "",
                        },
                        other: {
                            selected: !!selectedPost.otherContact,
                            value: selectedPost.otherContact || "",
                        },
                    };

                    // Format work basis
                    const workBasisObj = {
                        Partnership: workBasis?.includes("Partnership"),
                        Collaboration: workBasis?.includes("Collaboration"),
                        Internship: workBasis?.includes("Internship"),
                        Job: workBasis?.includes("Job"),
                        Freelance: workBasis?.includes("Freelance"),
                        ProjectBasis: workBasis?.includes("ProjectBasis"),
                        PercentageBasis: workBasis?.includes("PercentageBasis"),
                        EquityBasis: workBasis?.includes("EquityBasis"),
                        Other: workBasis?.includes("Other"),
                    };

                    const normalizedWorkMode = Array.isArray(workMode)
                        ? workMode
                        : workMode
                        ? [workMode]
                        : [];

                    const workModeObj = {
                        Remote: normalizedWorkMode.includes("Remote"),
                        Hybrid: normalizedWorkMode.includes("Hybrid"),
                        Onsite: normalizedWorkMode.includes("Onsite"),
                    };

                    // Parse ranges and durations
                    const experienceRangeObj = experienceRange
                        ? {
                              min: experienceRange.split("-")[0]?.trim() || "",
                              max:
                                  experienceRange
                                      .split("-")[1]
                                      ?.trim()
                                      ?.replace(/years/, "")
                                      ?.trim() || "",
                          }
                        : { min: "", max: "" };

                    const internshipStipendRangeObj = internshipStipendRange
                        ? {
                              min:
                                  internshipStipendRange
                                      .split("-")[0]
                                      ?.trim() || "",
                              max:
                                  internshipStipendRange
                                      .split("-")[1]
                                      ?.trim()
                                      ?.replace(/rupees|ruppes/, "")
                                      ?.trim() || "",
                          }
                        : { min: "", max: "" };

                    const jobAmountRangeObj = jobAmountRange
                        ? {
                              min: jobAmountRange.split("-")[0]?.trim() || "",
                              max:
                                  jobAmountRange
                                      .split("-")[1]
                                      ?.trim()
                                      ?.replace(/rupees|ruppes/, "")
                                      ?.trim() || "",
                          }
                        : { min: "", max: "" };

                    const freelancePaymentRangeObj = freelancePaymentRange
                        ? {
                              min:
                                  freelancePaymentRange.split("-")[0]?.trim() ||
                                  "",
                              max:
                                  freelancePaymentRange
                                      .split("-")[1]
                                      ?.trim()
                                      ?.replace(/rupees|ruppes/, "")
                                      ?.trim() || "",
                          }
                        : { min: "", max: "" };

                    return (
                        <div className="fixed inset-0 bg-violet-300/20 backdrop-blur-xs flex justify-center items-center z-50">
                            <div className="bg-white rounded-3xl px-4 sm:px-6 py-4 w-full max-w-3xl max-h-[95vh]  border border-violet-200 shadow-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 sm:px-4 gap-4 sm:gap-0">
                                    {/* Rejection Comment Section */}
                                    {selectedPost.comment && (
                                        <div className="mb-4 sm:mb-6 mt-5 p-3 sm:p-4 border border-red-300 rounded-lg bg-red-50">
                                            <h3 className="text-base sm:text-lg font-semibold text-red-700 mb-1">
                                                Reason for Rejection
                                            </h3>
                                            <p className="text-sm sm:text-base text-red-800 whitespace-pre-line">
                                                {selectedPost.comment}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="text-gray-600 text-xl p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setSelectedPost(null);
                                            }}
                                        >
                                            <IoMdClose className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="h-[2px] bg-gray-300 w-full my-4"></div>
                                <div className="bg-white px-4 sm:px-6 py-4  rounded-2xl w-full max-h-[80vh] overflow-y-auto">
                                    {/* Banner Section */}
                                    <div className="col-span-full flex flex-col mb-6 items-center gap-3 sm:gap-4">
                                        <div className="relative">
                                            <img
                                                src={profile_pic}
                                                alt="Profile"
                                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-300 shadow-md"
                                            />
                                        </div>
                                    </div>

                                    {/* Step 1: About Founder */}
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    value={firstName || ""}
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Middle Name
                                                </label>
                                                <input
                                                    value={middleName || ""}
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    value={lastName || ""}
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    value={
                                                        userEmail || email || ""
                                                    }
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Country
                                                </label>
                                                <input
                                                    value={country || ""}
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    State
                                                </label>
                                                <input
                                                    value={state || ""}
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    District
                                                </label>
                                                <input
                                                    value={city || ""}
                                                    disabled
                                                    type="text"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Personal Website
                                                </label>
                                                <input
                                                    value={
                                                        websiteOfStartupLink ||
                                                        ""
                                                    }
                                                    disabled
                                                    type="url"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                You are a
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    "Business Owner",
                                                    "Startup Founder",
                                                    "Working Professional",
                                                    "Freelancer",
                                                    "Student",
                                                    "Other",
                                                ].map((type) => (
                                                    <label
                                                        key={type}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="userType"
                                                            value={type}
                                                            checked={
                                                                userType ===
                                                                type
                                                            }
                                                            disabled
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <span className="text-gray-700 text-sm sm:text-base">
                                                            {type}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            {userType === "Other" && (
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Specify User Type
                                                    </label>
                                                    <input
                                                        value={
                                                            otherUserType || ""
                                                        }
                                                        disabled
                                                        type="text"
                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                This requirement is for a
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    "Business",
                                                    "Startup",
                                                    "Side Project",
                                                    "Personal Need",
                                                    "Other",
                                                ].map((type) => (
                                                    <label
                                                        key={type}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="requirementType"
                                                            value={type}
                                                            checked={
                                                                requirementType ===
                                                                type
                                                            }
                                                            disabled
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <span className="text-gray-700 text-sm sm:text-base">
                                                            {type}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            {requirementType === "Other" && (
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Specify Requirement Type
                                                    </label>
                                                    <input
                                                        value={
                                                            otherRequirementType ||
                                                            ""
                                                        }
                                                        disabled
                                                        type="text"
                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                    />
                                                </div>
                                            )}
                                            {["Startup", "Business"].includes(
                                                requirementType
                                            ) && (
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Business/Startup Name
                                                    </label>
                                                    <input
                                                        value={
                                                            startUpName || ""
                                                        }
                                                        disabled
                                                        type="text"
                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                About the {requirementType}
                                            </label>
                                            <textarea
                                                value={aboutEntity || ""}
                                                disabled
                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-lg bg-white cursor-not-allowed resize-y min-h-[100px] text-sm sm:text-base"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                How people can reach out to you
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    "call",
                                                    "whatsapp",
                                                    "instagram",
                                                    "linkedin",
                                                    "facebook",
                                                    "other",
                                                ].map((method) => (
                                                    <div
                                                        key={method}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                contact_methods[
                                                                    method
                                                                ].selected
                                                            }
                                                            disabled
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <label className="text-gray-700 text-sm sm:text-base">
                                                            {method
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                method.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 space-y-4">
                                                {Object.entries(
                                                    contact_methods
                                                ).map(
                                                    ([
                                                        method,
                                                        { selected, value },
                                                    ]) =>
                                                        selected && (
                                                            <div
                                                                key={method}
                                                                className="relative"
                                                            >
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    {method
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        method.slice(
                                                                            1
                                                                        )}
                                                                    {method ===
                                                                        "whatsapp" ||
                                                                    method ===
                                                                        "call"
                                                                        ? " Number"
                                                                        : " URL"}
                                                                </label>
                                                                {method ===
                                                                    "call" ||
                                                                method ===
                                                                    "whatsapp" ? (
                                                                    <PhoneInput
                                                                        country="in"
                                                                        value={
                                                                            value
                                                                        }
                                                                        disabled
                                                                        containerClass="w-full"
                                                                        inputClass="w-full h-12 px-3 sm:px-4 text-gray-900 border border-purple-300 rounded-lg bg-white cursor-not-allowed text-sm sm:text-base"
                                                                        buttonClass="border-purple-300 h-12 bg-white cursor-not-allowed"
                                                                        dropdownClass="border-purple-300"
                                                                        containerStyle={{
                                                                            height: "48px",
                                                                            width: "100%",
                                                                        }}
                                                                        inputStyle={{
                                                                            height: "48px",
                                                                            width: "100%",
                                                                        }}
                                                                        buttonStyle={{
                                                                            position:
                                                                                "absolute",
                                                                            left: "5px",
                                                                            top: "4px",
                                                                            height: "40px",
                                                                            width: "40px",
                                                                            backgroundColor:
                                                                                "transparent",
                                                                            border: "none",
                                                                            outline:
                                                                                "none",
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        type="url"
                                                                        value={
                                                                            value
                                                                        }
                                                                        disabled
                                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2: Skills and Strength */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  px-4 sm:px-6  rounded-2xl my-6 gap-4"></div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Headline (e.g., I am looking
                                                for...)
                                            </label>
                                            <input
                                                value={headline || ""}
                                                disabled
                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Role of the Person
                                                </label>
                                                <input
                                                    value={
                                                        roleUnderDomain || ""
                                                    }
                                                    disabled
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Domain of the Person Needed
                                                </label>
                                                <input
                                                    value={domainName || ""}
                                                    disabled
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Skills
                                            </label>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Work Basis
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    "Partnership",
                                                    "Collaboration",
                                                    "EquityBasis",
                                                    "ProjectBasis",
                                                    "PercentageBasis",
                                                    "Job",
                                                    "Internship",
                                                    "Freelance",
                                                    "Other",
                                                ].map((basis) => (
                                                    <div
                                                        key={basis}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                workBasisObj[
                                                                    basis
                                                                ]
                                                            }
                                                            disabled
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <label className="text-gray-700 text-sm sm:text-base">
                                                            {basis
                                                                .replace(
                                                                    /([A-Z])/g,
                                                                    " $1"
                                                                )
                                                                .trim()}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 space-y-4">
                                                {workBasisObj.Partnership && (
                                                    <div className="relative">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Partnership Criteria
                                                        </label>
                                                        <textarea
                                                            value={
                                                                partnershipCriteria ||
                                                                ""
                                                            }
                                                            disabled
                                                            className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 min-h-[100px] text-sm sm:text-base"
                                                        />
                                                    </div>
                                                )}
                                                {workBasisObj.Job && (
                                                    <div className="space-y-4">
                                                        <div className="relative">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Job Time Type
                                                            </label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {[
                                                                    "FullTime",
                                                                    "PartTime",
                                                                ].map(
                                                                    (type) => (
                                                                        <label
                                                                            key={
                                                                                type
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                value={
                                                                                    type
                                                                                }
                                                                                checked={
                                                                                    jobTimeType ===
                                                                                    type
                                                                                }
                                                                                disabled
                                                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                                            />
                                                                            <span className="text-gray-700 text-sm sm:text-base">
                                                                                {type ===
                                                                                "FullTime"
                                                                                    ? "Full-time"
                                                                                    : "Part-time"}
                                                                            </span>
                                                                        </label>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Min Amount
                                                                    (₹)
                                                                </label>
                                                                <input
                                                                    value={
                                                                        jobAmountRangeObj.min ||
                                                                        ""
                                                                    }
                                                                    disabled
                                                                    type="number"
                                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Max Amount
                                                                    (₹)
                                                                </label>
                                                                <input
                                                                    value={
                                                                        jobAmountRangeObj.max ||
                                                                        ""
                                                                    }
                                                                    disabled
                                                                    type="number"
                                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {workBasisObj.Internship && (
                                                    <div className="space-y-4">
                                                        <div className="relative">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Internship Time
                                                                Type
                                                            </label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {[
                                                                    "FullTime",
                                                                    "PartTime",
                                                                ].map(
                                                                    (type) => (
                                                                        <label
                                                                            key={
                                                                                type
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                value={
                                                                                    type
                                                                                }
                                                                                checked={
                                                                                    internshipTimeType ===
                                                                                    type
                                                                                }
                                                                                disabled
                                                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                                            />
                                                                            <span className="text-gray-700 text-sm sm:text-base">
                                                                                {type ===
                                                                                "FullTime"
                                                                                    ? "Full-time"
                                                                                    : "Part-time"}
                                                                            </span>
                                                                        </label>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Internship Type
                                                            </label>
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                                {[
                                                                    "Paid",
                                                                    "Unpaid",
                                                                    "PerformanceBased",
                                                                ].map(
                                                                    (type) => (
                                                                        <label
                                                                            key={
                                                                                type
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                value={
                                                                                    type
                                                                                }
                                                                                checked={
                                                                                    internshipType ===
                                                                                    type
                                                                                }
                                                                                disabled
                                                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                                            />
                                                                            <span className="text-gray-700 text-sm sm:text-base">
                                                                                {type
                                                                                    .replace(
                                                                                        /([A-Z])/g,
                                                                                        " $1"
                                                                                    )
                                                                                    .trim()}
                                                                            </span>
                                                                        </label>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Internship
                                                                Duration
                                                            </label>
                                                            <input
                                                                value={
                                                                    internshipDuration ||
                                                                    ""
                                                                }
                                                                disabled
                                                                type="text"
                                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                            />
                                                        </div>
                                                        {internshipType ===
                                                            "Paid" && (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Min
                                                                        Stipend
                                                                        (₹)
                                                                    </label>
                                                                    <input
                                                                        value={
                                                                            internshipStipendRangeObj.min ||
                                                                            ""
                                                                        }
                                                                        disabled
                                                                        type="number"
                                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Max
                                                                        Stipend
                                                                        (₹)
                                                                    </label>
                                                                    <input
                                                                        value={
                                                                            internshipStipendRangeObj.max ||
                                                                            ""
                                                                        }
                                                                        disabled
                                                                        type="number"
                                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {internshipType ===
                                                            "PerformanceBased" && (
                                                            <div className="relative">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Performance
                                                                    Criteria
                                                                </label>
                                                                <textarea
                                                                    value={
                                                                        internshipPerformanceCriteria ||
                                                                        ""
                                                                    }
                                                                    disabled
                                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 min-h-[100px] text-sm sm:text-base"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {workBasisObj.Collaboration && (
                                                    <div className="relative">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Collaboration
                                                            Description
                                                        </label>
                                                        <textarea
                                                            value={
                                                                collaborationDescription ||
                                                                ""
                                                            }
                                                            disabled
                                                            className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 min-h-[100px] text-sm sm:text-base"
                                                        />
                                                    </div>
                                                )}
                                                {workBasisObj.Freelance && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Min Payment (₹)
                                                            </label>
                                                            <input
                                                                value={
                                                                    freelancePaymentRangeObj.min ||
                                                                    ""
                                                                }
                                                                disabled
                                                                type="number"
                                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Max Payment (₹)
                                                            </label>
                                                            <input
                                                                value={
                                                                    freelancePaymentRangeObj.max ||
                                                                    ""
                                                                }
                                                                disabled
                                                                type="number"
                                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {workBasisObj.ProjectBasis && (
                                                    <div className="relative">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Project Criteria
                                                        </label>
                                                        <textarea
                                                            value={
                                                                projectDescription ||
                                                                ""
                                                            }
                                                            disabled
                                                            className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 min-h-[100px] text-sm sm:text-base"
                                                        />
                                                    </div>
                                                )}
                                                {workBasisObj.PercentageBasis && (
                                                    <div className="relative">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Percentage Value (%)
                                                        </label>
                                                        <input
                                                            value={
                                                                percentageBasisValue ||
                                                                ""
                                                            }
                                                            disabled
                                                            type="text"
                                                            className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                        />
                                                    </div>
                                                )}
                                                {workBasisObj.EquityBasis && (
                                                    <div className="relative">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Equity Value (%)
                                                        </label>
                                                        <input
                                                            value={
                                                                equityBasisValue ||
                                                                ""
                                                            }
                                                            disabled
                                                            type="number"
                                                            className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                        />
                                                    </div>
                                                )}
                                                {workBasisObj.Other && (
                                                    <div className="relative">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Other Work Basis
                                                        </label>
                                                        <textarea
                                                            value={
                                                                otherWorkBasis ||
                                                                ""
                                                            }
                                                            disabled
                                                            className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 min-h-[100px] text-sm sm:text-base"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time Commitment
                                            </label>
                                            <input
                                                value={timeCommitment || ""}
                                                disabled
                                                type="text"
                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Work Mode
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    "Remote",
                                                    "Hybrid",
                                                    "Onsite",
                                                ].map((mode) => (
                                                    <div
                                                        key={mode}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                workModeObj[
                                                                    mode
                                                                ]
                                                            }
                                                            disabled
                                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                                                        />
                                                        <label className="text-gray-700 text-sm sm:text-base">
                                                            {mode}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {(workModeObj.Hybrid ||
                                            workModeObj.Onsite) && (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Country
                                                    </label>
                                                    <input
                                                        value={
                                                            getCountryName(
                                                                workLocation.country
                                                            ) || ""
                                                        }
                                                        disabled
                                                        type="text"
                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        State
                                                    </label>
                                                    <input
                                                        value={
                                                            getStateName(
                                                                workLocation.country,
                                                                workLocation.state
                                                            ) || ""
                                                        }
                                                        disabled
                                                        type="text"
                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        District
                                                    </label>
                                                    <input
                                                        value={
                                                            getCityName(
                                                                workLocation.country,
                                                                workLocation.state,
                                                                workLocation.district
                                                            ) || ""
                                                        }
                                                        disabled
                                                        type="text"
                                                        className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Min Experience (Years)
                                                </label>
                                                <input
                                                    value={
                                                        experienceRangeObj.min ||
                                                        ""
                                                    }
                                                    disabled
                                                    type="number"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Max Experience (Years)
                                                </label>
                                                <input
                                                    value={
                                                        experienceRangeObj.max ||
                                                        ""
                                                    }
                                                    disabled
                                                    type="number"
                                                    className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-white cursor-not-allowed border-purple-300 text-sm sm:text-base"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3: Looking for */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  px-4 sm:px-6 rounded-2xl my-6 gap-1"></div>

                                    <div className="space-y-6">
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Responsibilities
                                            </label>
                                            <textarea
                                                value={responsibilities || ""}
                                                disabled
                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-lg bg-white cursor-not-allowed resize-y min-h-[100px] text-sm sm:text-base"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Why Should They Join?
                                            </label>
                                            <textarea
                                                value={whyShouldJoin || ""}
                                                disabled
                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-lg bg-white cursor-not-allowed resize-y min-h-[100px] text-sm sm:text-base"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Any Other Information
                                            </label>
                                            <textarea
                                                value={anyOtherInfo || ""}
                                                disabled
                                                className="w-full h-10 px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-lg bg-white cursor-not-allowed resize-y min-h-[100px] text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-2 mt-4">
                                        <button
                                            onClick={() =>
                                                acceptFunction(selectedPost._id)
                                            }
                                            className="bg-green-300 text-black text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() =>
                                                setIsRejectModalOpen(true)
                                            }
                                            className="bg-yellow-200 text-black text-xs font-medium px-4 py-3 rounded-lg flex items-center justify-center"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

            {/* Reject Reason Modal */}
            {isRejectModalOpen && selectedPost && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-60">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px] border border-gray-300 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">
                            Reject Reason
                        </h3>
                        <textarea
                            rows={4}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter reason for rejection..."
                            className="w-full p-2 border border-gray-300 rounded resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setIsRejectModalOpen(false);
                                    setRejectReason("");
                                }}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    sendReasonFunction(selectedPost._id)
                                }
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
        </div>
    );
};

export default FounderPosts;
