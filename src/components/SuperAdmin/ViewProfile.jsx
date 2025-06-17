import { useParams } from "react-router-dom";
import Logo1 from "../../assets/KLogo1.svg";
import { useState, useEffect, useRef } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import NoDataFound from "../../assets/NoDataFound.svg";
import "./Posts.css";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ViewProfile = ({ role }) => {
    const [filter, setFilter] = useState("Pending");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const { id } = useParams();
    const dropdownRef = useRef({});
    const [user, setUser] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const userRole = localStorage.getItem("role");
            if (!userRole) {
                console.error("User role not found in localStorage");
                return;
            }
            const response = await fetch(
                `http://localhost:3333/api/admin/${role}/get-all-posts-by-user/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const res = await response.json();
            console.log(`Fetched posts for role: ${role} and id: ${id}`, res);
            setUser(res.user);
            console.log(user);
            setPosts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error(`Error fetching posts for id: ${id}`, error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) => post.status === filter);

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                Object.values(dropdownRef.current).some(
                    (ref) => ref && !ref.contains(event.target)
                )
            ) {
                setIsModalOpen(false);
                setSelectedPost(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    return (
        <div className="flex flex-col bg-[#F0F0F0] min-h-screen w-screen overflow-y-scroll">
            {/* Navbar */}
            <div className="w-full h-[50px] bg-[#FEFEFE]">
                <div className="flex flex-row justify-between items-center h-full px-10">
                    <img src={Logo1} alt="Logo" className="h-8" />
                </div>
            </div>

            <div className="h-fit w-full flex justify-between px-40 py-5 gap-5">
                {/* Image and name div */}
                <div className="w-[400px] flex flex-col gap-2 bg-white rounded-lg px-4 py-5">
                    <div className="w-fit flex items-center gap-2">
                        <div className="w-fit flex flex-col">
                            <p className="text-gray-800 font-medium">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {user?.email}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                    <p>{}</p>
                </div>

                <div className="w-full h-fit flex flex-col bg-white rounded-lg px-2 py-2">
                    {/* Navbar for Status Filters */}
                    <div className="flex justify-between border-b border-gray-300 mb-2">
                        <div className="flex">
                            <button
                                className={`px-4 py-2 text-sm font-medium ${
                                    filter === "Pending"
                                        ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                        : " text-gray-500"
                                }`}
                                onClick={() => setFilter("Pending")}
                            >
                                Pending Post
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium ${
                                    filter === "Accepted"
                                        ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                        : " text-gray-500"
                                }`}
                                onClick={() => setFilter("Accepted")}
                            >
                                Accepted Post
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium ${
                                    filter === "Rejected"
                                        ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                        : " text-gray-500"
                                }`}
                                onClick={() => setFilter("Rejected")}
                            >
                                Rejected Post
                            </button>
                        </div>
                        <div className="w-[30%]">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                className="bg-white w-full px-4 py-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                    const searchTerm =
                                        e.target.value.toLowerCase();
                                    setPosts((prevPosts) =>
                                        prevPosts.filter(
                                            (post) =>
                                                post.userId?.firstName
                                                    .toLowerCase()
                                                    .includes(searchTerm) ||
                                                post.userId?.lastName
                                                    .toLowerCase()
                                                    .includes(searchTerm) ||
                                                post.companyName
                                                    .toLowerCase()
                                                    .includes(searchTerm)
                                        )
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-10 items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Total {filter} Posts{" "}
                            <span>{filteredPosts.length}</span>
                        </h2>
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
                            className="h-[70vh]"
                        />
                    ) : (
                        <div className="w-full bg-white rounded-lg overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Domain
                                        </th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Updated At
                                        </th>
                                        <th className="w-[70px] px-0.5 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPosts
                                        .slice()
                                        .sort(
                                            (a, b) =>
                                                new Date(a.createdAt) -
                                                new Date(b.createdAt)
                                        )
                                        .map((post, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                                                    {post.domainName || "N/A"}
                                                </td>
                                                <td className="px-3 py-1 whitespace-nowrap text-sm text-violet-800 font-semibold">
                                                    {post.roleUnderDomain ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                                                    {!post.isUpdated
                                                        ? "New"
                                                        : "Update"}
                                                </td>
                                                <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(
                                                        post.updatedAt
                                                    ).toLocaleString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td className="w-[70px] px-0.5 py-1 text-sm">
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            className="text-left px-1 py-1 text-sm text-gray-700 hover:bg-violet-100 flex items-center gap-2"
                                                            onClick={() =>
                                                                openModal(post)
                                                            }
                                                        >
                                                            <IoEyeOutline />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

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
                        Partnership: workBasis?.Partnership,
                        Collaboration: workBasis?.Collaboration,
                        Internship: workBasis?.Internship,
                        Job: workBasis?.Job,
                        Freelance: workBasis?.Freelance,
                        ProjectBasis: workBasis?.ProjectBasis,
                        PercentageBasis: workBasis?.PercentageBasis,
                        EquityBasis: workBasis?.EquityBasis,
                        Other: workBasis?.Other,
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
                              min: internshipStipendRange.min || "",
                              max: internshipStipendRange.max || "",
                          }
                        : { min: "", max: "" };

                    const jobAmountRangeObj = jobAmountRange
                        ? {
                              min: jobAmountRange.min || "",
                              max: jobAmountRange.max|| "",
                          }
                        : { min: "", max: "" };

                    const freelancePaymentRangeObj = freelancePaymentRange
                        ? {
                              min:
                                  freelancePaymentRange.min ||
                                  "",
                              max:
                                  freelancePaymentRange.max || "",
                          }
                        : { min: "", max: "" };

                    return (
                        <div className="fixed inset-0 bg-violet-300/20 backdrop-blur-xs flex justify-center items-center z-50">
                            <div className="bg-white rounded-3xl px-4 sm:px-6 py-4 w-full max-w-3xl max-h-[95vh] border border-violet-200 shadow-2xl mx-auto">
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
                                <div className="bg-white px-4 sm:px-6 py-4 rounded-2xl w-full max-h-[80vh] overflow-y-auto">
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

                                            {websiteOfStartupLink && (
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
                                            )}
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
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 rounded-2xl my-6 gap-4"></div>

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
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 rounded-2xl my-6 gap-1"></div>

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
                                </div>
                            </div>
                        </div>
                    );
                })()}
        </div>
    );
};

export default ViewProfile;
