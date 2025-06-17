import React, { useState, useEffect, useRef } from "react";
import { IoEyeOutline, IoCopyOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import NoDataFound from "../../assets/NoDataFound.svg";
import { FaStreetView } from "react-icons/fa";
import "./Posts.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ViewGetDiscoveredModal = ({
    post,
    onClose,
    acceptFunction,
    setIsRejectModalOpen,
    errors = {},
}) => {
    const modalContentRef = useRef(null);

    const getDomainName = (domainId) => {
        return domainId || "N/A";
    };

    const getExperienceDisplay = (experience) => {
        if (experience?.years) return `${experience.years} years`;
        if (experience?.months) return `${experience.months} months`;
        if (experience?.days) return `${experience.days} days`;
        return "N/A";
    };

    const getRoleName = (roleId) => {
        return roleId || "N/A";
    };

    const handleOverlayClick = (e) => {
        if (
            modalContentRef.current &&
            !modalContentRef.current.contains(e.target)
        ) {
            onClose();
        }
    };

    const profile_pic =
        post.profile_pic ||
        "https://i.pinimg.com/736x/e7/8c/35/e78c359eefec9d1d7b338b4c294b789e.jpg";

    return (
        <div
            className="fixed inset-0 bg-opacity-75 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalContentRef}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl m-2 sm:m-4 relative max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {post.comment && (
                    <div className="mb-4 sm:mb-6 mt-5 p-3 sm:p-4 border border-red-300 rounded-lg bg-red-50">
                        <h3 className="text-base sm:text-lg font-semibold text-red-700 mb-1">
                            Reason for Rejection
                        </h3>
                        <p className="text-sm sm:text-base text-red-800 whitespace-pre-line">
                            {post.comment}
                        </p>
                    </div>
                )}

                <div className="mb-6 sm:mb-8">
                    <div className="col-span-full flex flex-col mb-6 items-center gap-3 sm:gap-4">
                        <div className="relative">
                            <img
                                src={profile_pic}
                                alt="Profile"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-300 shadow-md"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.userId?.firstName || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.first_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Middle Name
                            </label>
                            <input
                                value={post.userId?.middleName || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.userId?.lastName || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.last_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.userId?.country || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.country}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.userId?.state || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.state}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.userId?.city || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.district && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.district}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={post.userId?.gender || ""}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to specify">
                                    Prefer not to specify
                                </option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.userId?.email || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2 md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                You are a{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {[
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
                                            value={type}
                                            checked={post.userType === type}
                                            disabled
                                            className="h-4 w-4 text-purple-600"
                                        />
                                        <span className="ml-2 text-sm sm:text-base text-gray-700">
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.userType && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.userType}
                                </p>
                            )}
                            {post.userType === "Other" && (
                                <div className="mt-3 sm:mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Specify User Type{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={post.otherUserType || ""}
                                        disabled
                                        type="text"
                                        className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                    />
                                    {errors.otherUserType && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.otherUserType}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                About Yourself
                            </label>
                            <textarea
                                value={post.aboutSelf || ""}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                            />
                        </div>
                        <div className="col-span-1 sm:col-span-2 md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                How people can reach out to you (select at least
                                two) <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
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
                                                post.contact_methods?.[method]
                                                    ?.selected || false
                                            }
                                            disabled
                                            className="h-4 w-4 text-purple-600"
                                        />
                                        <label className="ml-2 text-sm sm:text-base text-gray-700">
                                            {method.charAt(0).toUpperCase() +
                                                method.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.contact_methods && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.contact_methods}
                                </p>
                            )}
                            <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(post.contact_methods || {}).map(
                                    ([method, { selected, value }]) =>
                                        selected && (
                                            <div key={method}>
                                                <label className="block text-sm font-medium text-black opacity-[73%] mb-1">
                                                    {method
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        method.slice(1)}{" "}
                                                    {method === "whatsapp" ||
                                                    method === "call"
                                                        ? "Number"
                                                        : "URL"}{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                {method === "call" ||
                                                method === "whatsapp" ? (
                                                    <PhoneInput
                                                        country="in"
                                                        value={value || ""}
                                                        disabled
                                                        containerClass="w-full"
                                                        inputClass="w-full h-10 sm:h-12 px-3 sm:px-4 text-gray-900 border rounded-lg cursor-not-allowed border-purple-300"
                                                        buttonClass="border-purple-300 h-12 sm:h-14 w-14 sm:w-16 cursor-not-allowed"
                                                        containerStyle={{
                                                            height: "48px",
                                                            width: "100%",
                                                        }}
                                                        inputStyle={{
                                                            height: "40px",
                                                            width: "100%",
                                                            backgroundColor:
                                                                "#f3f4f6",
                                                        }}
                                                        buttonStyle={{
                                                            position:
                                                                "absolute",
                                                            left: "5px",
                                                            top: "1px",
                                                            height: "38px",
                                                            width: "38px",
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "none",
                                                        }}
                                                    />
                                                ) : (
                                                    <input
                                                        type="url"
                                                        value={value || ""}
                                                        disabled
                                                        className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                    />
                                                )}
                                                {errors[`${method}Value`] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors[
                                                                `${method}Value`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 sm:mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Headline (e.g., I am a...){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={post.headline || ""}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.headline && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.headline}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Role{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={getRoleName(post.roleUnderDomain)}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.roleUnderDomain && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.roleUnderDomain}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Domain{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={getDomainName(post.domainName)}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.domainName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.domainName}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skills <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {post.skills?.length > 0 ? (
                                    post.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        None
                                    </span>
                                )}
                            </div>
                            {errors.skills && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.skills}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Work Basis{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4">
                                {[
                                    "Partnership",
                                    "Collaboration",
                                    "EquityBasis",
                                    "ProjectBasis",
                                    "PercentageBasis",
                                    "Freelance",
                                    "Job",
                                    "Internship",
                                    "Other",
                                ].map((basis) => (
                                    <div
                                        key={basis}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                post.workBasis?.[basis] || false
                                            }
                                            disabled
                                            className="h-4 w-4 text-purple-600"
                                        />
                                        <label className="ml-2 text-sm sm:text-base text-gray-700">
                                            {basis
                                                .replace(/([A-Z])/g, " $1")
                                                .trim()}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.workBasis && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.workBasis}
                                </p>
                            )}
                            <div className="mt-3 sm:mt-4 space-y-4">
                                {post.workBasis?.Partnership && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Partnership Criteria{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            value={
                                                post.partnershipCriteria || ""
                                            }
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                                        />
                                        {errors.partnershipCriteria && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.partnershipCriteria}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {post.workBasis?.Internship && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Internship Time Type{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex gap-3 sm:gap-4">
                                                {["Full-time", "Part-time"].map(
                                                    (type) => (
                                                        <label
                                                            key={type}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                type="radio"
                                                                value={type}
                                                                checked={
                                                                    post.internshipTimeType ===
                                                                    type
                                                                }
                                                                disabled
                                                                className="h-4 w-4 text-purple-600"
                                                            />
                                                            <span className="ml-2 text-sm sm:text-base text-gray-700">
                                                                {type}
                                                            </span>
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                            {errors.internshipTimeType && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.internshipTimeType}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Internship Type{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex gap-3 sm:gap-4">
                                                {[
                                                    "Paid",
                                                    "Unpaid",
                                                    "PerformanceBased",
                                                ].map((type) => (
                                                    <label
                                                        key={type}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={type}
                                                            checked={
                                                                post.internshipType ===
                                                                type
                                                            }
                                                            disabled
                                                            className="h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-sm sm:text-base text-gray-700">
                                                            {type
                                                                .replace(
                                                                    /([A-Z])/g,
                                                                    " $1"
                                                                )
                                                                .trim()}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.internshipType && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.internshipType}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Internship Duration{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        value={
                                                            post
                                                                .internshipDuration
                                                                ?.value || ""
                                                        }
                                                        disabled
                                                        type="number"
                                                        className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                    />
                                                    <select
                                                        value={
                                                            post
                                                                .internshipDuration
                                                                ?.unit || ""
                                                        }
                                                        disabled
                                                        className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                    >
                                                        <option value="">
                                                            Select Unit
                                                        </option>
                                                        <option value="Days">
                                                            Days
                                                        </option>
                                                        <option value="Weeks">
                                                            Weeks
                                                        </option>
                                                        <option value="Months">
                                                            Months
                                                        </option>
                                                    </select>
                                                </div>
                                                {errors.internshipDuration && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors
                                                            .internshipDuration
                                                            .value && (
                                                            <p>
                                                                {
                                                                    errors
                                                                        .internshipDuration
                                                                        .value
                                                                }
                                                            </p>
                                                        )}
                                                        {errors
                                                            .internshipDuration
                                                            .unit && (
                                                            <p>
                                                                {
                                                                    errors
                                                                        .internshipDuration
                                                                        .unit
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {post.internshipType === "Paid" && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Stipend Range (₹){" "}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            value={
                                                                post
                                                                    .internshipStipendRange
                                                                    ?.min || ""
                                                            }
                                                            disabled
                                                            type="number"
                                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                        />
                                                        <input
                                                            value={
                                                                post
                                                                    .internshipStipendRange
                                                                    ?.max || ""
                                                            }
                                                            disabled
                                                            type="number"
                                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                        />
                                                    </div>
                                                    {errors.internshipStipendRange && (
                                                        <div className="text-red-500 text-sm mt-1">
                                                            {errors
                                                                .internshipStipendRange
                                                                .min && (
                                                                <p>
                                                                    {
                                                                        errors
                                                                            .internshipStipendRange
                                                                            .min
                                                                    }
                                                                </p>
                                                            )}
                                                            {errors
                                                                .internshipStipendRange
                                                                .max && (
                                                                <p>
                                                                    {
                                                                        errors
                                                                            .internshipStipendRange
                                                                            .max
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {post.internshipType ===
                                            "PerformanceBased" && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Performance Criteria{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea
                                                    value={
                                                        post.internshipPerformanceCriteria ||
                                                        ""
                                                    }
                                                    disabled
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                                                />
                                                {errors.internshipPerformanceCriteria && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors.internshipPerformanceCriteria
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {post.workBasis?.Collaboration && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Collaboration Description{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            value={
                                                post.collaborationDescription ||
                                                ""
                                            }
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                                        />
                                        {errors.collaborationDescription && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors.collaborationDescription
                                                }
                                            </p>
                                        )}
                                    </div>
                                )}
                                {post.workBasis?.Job && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Time Type{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex gap-3 sm:gap-4">
                                                {["Full-time", "Part-time"].map(
                                                    (type) => (
                                                        <label
                                                            key={type}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                type="radio"
                                                                value={type}
                                                                checked={
                                                                    post.jobTimeType ===
                                                                    type
                                                                }
                                                                disabled
                                                                className="h-4 w-4 text-purple-600"
                                                            />
                                                            <span className="ml-2 text-sm sm:text-base text-gray-700">
                                                                {type}
                                                            </span>
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                            {errors.jobTimeType && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.jobTimeType}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Job Amount Range (₹){" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        value={
                                                            post.jobAmountRange
                                                                ?.min || ""
                                                        }
                                                        disabled
                                                        type="number"
                                                        className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                    />
                                                    <input
                                                        value={
                                                            post.jobAmountRange
                                                                ?.max || ""
                                                        }
                                                        disabled
                                                        type="number"
                                                        className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                    />
                                                </div>
                                                {errors.jobAmountRange && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors.jobAmountRange
                                                            .min && (
                                                            <p>
                                                                {
                                                                    errors
                                                                        .jobAmountRange
                                                                        .min
                                                                }
                                                            </p>
                                                        )}
                                                        {errors.jobAmountRange
                                                            .max && (
                                                            <p>
                                                                {
                                                                    errors
                                                                        .jobAmountRange
                                                                        .max
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {post.workBasis?.Freelance && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Freelance Payment Range (₹){" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    value={
                                                        post
                                                            .freelancePaymentRange
                                                            ?.min || ""
                                                    }
                                                    disabled
                                                    type="number"
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                />
                                                <input
                                                    value={
                                                        post
                                                            .freelancePaymentRange
                                                            ?.max || ""
                                                    }
                                                    disabled
                                                    type="number"
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                />
                                            </div>
                                            {errors.freelancePaymentRange && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors
                                                        .freelancePaymentRange
                                                        .min && (
                                                        <p>
                                                            {
                                                                errors
                                                                    .freelancePaymentRange
                                                                    .min
                                                            }
                                                        </p>
                                                    )}
                                                    {errors
                                                        .freelancePaymentRange
                                                        .max && (
                                                        <p>
                                                            {
                                                                errors
                                                                    .freelancePaymentRange
                                                                    .max
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {post.workBasis?.ProjectBasis && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Description{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            value={
                                                post.projectDescription || ""
                                            }
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                                        />
                                        {errors.projectDescription && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.projectDescription}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {post.workBasis?.PercentageBasis && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Percentage Basis Value (%){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            value={
                                                post.percentageBasisValue || ""
                                            }
                                            disabled
                                            type="number"
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                        />
                                        {errors.percentageBasisValue && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.percentageBasisValue}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {post.workBasis?.EquityBasis && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Equity Basis Value (%){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            value={post.equityBasisValue || ""}
                                            disabled
                                            type="number"
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                        />
                                        {errors.equityBasisValue && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.equityBasisValue}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {post.workBasis?.Other && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Other Work Basis{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            value={post.otherWorkBasis || ""}
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                        />
                                        {errors.otherWorkBasis && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.otherWorkBasis}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Work Mode{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {["Remote", "Hybrid", "Onsite"].map((mode) => (
                                    <div
                                        key={mode}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                post.workMode?.[mode] || false
                                            }
                                            disabled
                                            className="h-4 w-4 text-purple-600"
                                        />
                                        <label className="ml-2 text-sm sm:text-base text-gray-700">
                                            {mode}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.workMode && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.workMode}
                                </p>
                            )}
                            {(post.workMode?.Hybrid ||
                                post.workMode?.Onsite) && (
                                <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={
                                                post.workLocation?.country || ""
                                            }
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                        >
                                            <option value="">
                                                {post.workLocation?.country ||
                                                    "Select Country"}
                                            </option>
                                        </select>
                                        {errors.workLocation?.country && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.workLocation.country}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={
                                                post.workLocation?.state || ""
                                            }
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                        >
                                            <option value="">
                                                {post.workLocation?.state ||
                                                    "Select State"}
                                            </option>
                                        </select>
                                        {errors.workLocation?.state && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.workLocation.state}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={
                                                post.workLocation?.district ||
                                                ""
                                            }
                                            disabled
                                            className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                        >
                                            <option value="">
                                                {post.workLocation?.district ||
                                                    "Select City"}
                                            </option>
                                        </select>
                                        {errors.workLocation?.district && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.workLocation.district}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Time Commitment
                            </label>
                            <input
                                value={post.timeCommitment || ""}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Experience{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={getExperienceDisplay(post.experience)}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.experience && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.experience}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Portfolio Link
                            </label>
                            <input
                                value={post.portfolioLink || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.portfolioLink && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.portfolioLink}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Resume Link
                            </label>
                            <input
                                value={post.resumeLink || ""}
                                disabled
                                type="text"
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                            />
                            {errors.resumeLink && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.resumeLink}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Projects
                            </label>
                            {post.projects?.length > 0 ? (
                                post.projects.map((project, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 p-3 sm:p-4 border rounded-lg bg-gray-200"
                                    >
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                                            Project {index + 1}
                                        </h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            <input
                                                value={project.title || ""}
                                                disabled
                                                type="text"
                                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                            />
                                            <textarea
                                                value={
                                                    project.description || ""
                                                }
                                                disabled
                                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                                            />
                                            <input
                                                value={project.link || ""}
                                                disabled
                                                type="text"
                                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                            />
                                            {errors[`projectLink${index}`] && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {
                                                        errors[
                                                            `projectLink${index}`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No projects added.
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Work Experience
                            </label>
                            {post.workExperience?.length > 0 ? (
                                post.workExperience.map((experience, index) => {
                                    const [startDate, endDate] =
                                        experience.duration
                                            ? experience.duration.split(" - ")
                                            : ["", ""];
                                    return (
                                        <div
                                            key={index}
                                            className="mb-4 p-3 sm:p-4 border rounded-lg bg-gray-200"
                                        >
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                Experience {index + 1}
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                <input
                                                    value={startDate || ""}
                                                    disabled
                                                    type="date"
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                />
                                                <input
                                                    value={endDate || ""}
                                                    disabled
                                                    type="date"
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                />
                                                <input
                                                    value={
                                                        experience.company || ""
                                                    }
                                                    disabled
                                                    type="text"
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                />
                                                <input
                                                    value={
                                                        experience.role || ""
                                                    }
                                                    disabled
                                                    type="text"
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                                />
                                                <textarea
                                                    value={
                                                        experience.description ||
                                                        ""
                                                    }
                                                    disabled
                                                    className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No work experience added.
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Other Links
                            </label>
                            {post.otherLinks?.length > 0 ? (
                                post.otherLinks.map((link, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 p-3 sm:p-4 border rounded-lg bg-gray-200"
                                    >
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                                            Link {index + 1}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input
                                                value={link.title || ""}
                                                disabled
                                                type="text"
                                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                            />
                                            <input
                                                value={link.url || ""}
                                                disabled
                                                type="text"
                                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300"
                                            />
                                            {errors[`otherLink${index}`] && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {
                                                        errors[
                                                            `otherLink${index}`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No other links added.
                                </p>
                            )}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                What Talent seekers can expect from you
                            </label>
                            <textarea
                                value={post.expectations || ""}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                            />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Any Other Information
                            </label>
                            <textarea
                                value={post.anyOtherInfo || ""}
                                disabled
                                className="w-full h-11 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg cursor-not-allowed border-purple-300 min-h-[80px] sm:min-h-[100px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                    <button
                        onClick={() => acceptFunction(post._id)}
                        className="w-full h-11 sm:w-auto bg-green-300 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-green-400 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => setIsRejectModalOpen(true)}
                        className="w-full h-11 sm:w-auto bg-yellow-200 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                    >
                        Reject
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full h-11 sm:w-auto bg-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const TalentPosts = ({ setShowSettings, setShowAnalytics }) => {
    const [filter, setFilter] = useState("Pending");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const [tooltipMessage, setTooltipMessage] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc"); // Sort direction: 'asc' or 'desc'

    const dropdownRef = useRef({});

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
            console.log(`Fetched ${status} posts:`, res);
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
                `http://localhost:3333/api/admin/get-all-save-for-later-posts/GetDiscovered`,
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
        console.log("Save for later",posts)
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
            console.error(`Error in saved:`, error);
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
    const filteredPosts = posts.filter((post) => {
        const roleMatch = post.userId?.role === "GetDiscovered";
        const domainMatch =
            selectedDomain === "All" || post.domainName === selectedDomain;
        const roleUnderDomainMatch =
            selectedRole === "All" || post.roleUnderDomain === selectedRole;
        return roleMatch && domainMatch && roleUnderDomainMatch;
    });

    console.log("filtered post: ", filteredPosts);

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

    const sortedPosts = filteredPosts
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="flex flex-col w-full h-full px-2 py-1">
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
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            filter === "Rejected"
                                ? "border-b-2 border-blue-500 text-gray-800 font-semibold"
                                : " text-gray-500"
                        }`}
                        onClick={() => handleFilterClick("Rejected")}
                    >
                        Rejected Post
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
                    </button>
                </div>
                {/* <div className="w-[30%]">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="bg-white w-full px-4 py-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            setPosts((prevPosts) =>
                                prevPosts.filter(
                                    (post) =>
                                        post.userId?.firstName.toLowerCase().includes(searchTerm) ||
                                        post.userId?.lastName.toLowerCase().includes(searchTerm) ||
                                        post.companyName.toLowerCase().includes(searchTerm)
                                )
                            );
                        }}
                    />
                </div> */}
            </div>

            <div className="w-full border-b border-gray-300">
                {filter === "Pending" ? (
                    <div className="flex gap-10 items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Total Pending Posts{" "}
                            <span>{filteredPosts.length}</span>
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
                            <span>{filteredPosts.length}</span>
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
                            Total {filter} Posts{" "}
                            <span>{filteredPosts.length}</span>
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
                <div className="w-full bg-white rounded-lg overflow-x-auto">
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
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Updated At{" "}
              <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
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
                    addtosaveforlater(post._id, post.userId.role)
                  }
                >
                  {post.isSaveForLaterByAdmin ? <FaStar /> : <FaRegStar />}
                </button>
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">
                {post.userId?.firstName} {post.userId?.lastName}
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
                {new Date(post.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
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
                        `/getDiscovered/profile/${post.userId._id}`,
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
    </div>
            )}

            {isModalOpen && selectedPost && (
                <ViewGetDiscoveredModal
                    post={selectedPost}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedPost(null);
                    }}
                    acceptFunction={acceptFunction}
                    setIsRejectModalOpen={setIsRejectModalOpen}
                />
            )}

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

export default TalentPosts;