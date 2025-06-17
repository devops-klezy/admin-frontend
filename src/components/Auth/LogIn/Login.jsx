import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [inputEmailorMobileNumber, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputEmailorMobileNumber || !password) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8001/api/admin/login-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies
                body: JSON.stringify({
                    inputEmailorMobileNumber,
                    password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Login successful!");

                // Store user data in localStorage
                localStorage.setItem("role", data.role);
                localStorage.setItem("firstName", data.firstName);
                localStorage.setItem("middleName", data.middleName);
                localStorage.setItem("lastName", data.lastName);
                localStorage.setItem("email", data.email);

                // Redirect based on role
                console.log("User role:", data);
                if (data.role === "Admin") {
                    navigate("/admin-dashboard");
                } else if (data.role === "SuperAdmin") {
                    navigate("/super-admin-dashboard");
                } else {
                    toast.error("Unknown role. Access denied.");
                }
            } else if (data.mustChangePassword) {
                // Handle first login: redirect to password change page
                toast.warn("First-time login detected. Please change your password.");

                navigate("/change-password", { state: { userId: data.userId } });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    // const handleSignUp = () => {
    //     navigate("/signup");
    // };

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

            <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
                {/* Background Divs */}
                <div className="absolute inset-0 overflow-hidden h-full w-full z-0">
                    <div className="absolute -right-[50%] top-[100%] w-[887px] h-[887px] opacity-20 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute -left-[5%] -top-[20%] w-[887px] h-[887px] opacity-40 bg-violet-500 rounded-full border border-white blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute -right-[60%] -top-[10%] rounded-full w-[914px] h-[914px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    <div className="absolute left-[25%] -bottom-[75%] rounded-full w-[814px] h-[814px] border-[100px] opacity-5 border-violet-500 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center relative z-10">
                    <h2 className="text-2xl font-bold text-violet-600">Admin Log In</h2>
                    <p className="text-gray-500 mb-6">Enter your log in details to proceed further</p>

                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-4">
                            <label className="block font-medium text-gray-600">Email / Phone number</label>
                            <input
                                type="text"
                                value={inputEmailorMobileNumber}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Email / Phone number"
                            />
                        </div>

                        <div className="text-left mb-4 relative">
                            <label className="block font-medium text-gray-600">Password</label>
                            <input
                                type={ showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 bottom-1/5 text-gray-500"
                            >
                                {showPassword ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-violet-600 text-white w-full p-3 rounded-lg mt-4 hover:bg-violet-700 transition"
                        >
                            Get Started
                        </button>
                    </form>

                    {/* <p className="mt-4 text-gray-500 text-sm">
                        Don’t have an account?{" "}
                        <span className="text-blue-600 font-medium cursor-pointer" onClick={handleSignUp}>
                            Sign up
                        </span>
                    </p> */}
                </div>
            </div>
        </>
    );
};

export default Login;