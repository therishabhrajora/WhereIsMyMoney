import React, { useState } from "react";
import { AuthService } from "../api/apiClient"; // Update path based on your project structure

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("ROLE_USER");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // 1. Client-side input validation checks
        if (!email || !password || !confirmPassword) {
            setErrorMessage("Please fill out all required validation fields.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please verify entries.");
            return;
        }

        setLoading(true);

        // 2. Package fields to match your backend UserRegisterDto constraints exactly
        const registerPayload = {
            email: email.trim(),
            password: password,
            role: role
        };

        try {
            // 3. Dispatch signup payload request to Spring Boot backend
           
            const response = await AuthService.register(registerPayload);
             ("Registration Response:", response);

            setSuccessMessage("Account created successfully! Redirecting...");
            
            // Clear input fields upon successful signup completion
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Execute success callback to handle auto-login or redirect routes
            if (onRegisterSuccess) {
                setTimeout(() => {
                    onRegisterSuccess(response);
                }, 1500);
            }
        } catch (error) {
            // Catches database email duplication errors or general network issues
            setErrorMessage(error.message || "Registration failed. Email might already be in use.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-500">
                        Join the financial transaction tracking ecosystem
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
                    {/* Display validation or database constraint error responses */}
                    {errorMessage && (
                        <div className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-600 border border-rose-100 animate-in shake-in duration-200">
                            {errorMessage}
                        </div>
                    )}

                    {/* Display signup completion messages */}
                    {successMessage && (
                        <div className="rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-600 border border-emerald-100 animate-in fade-in duration-200">
                            {successMessage}
                        </div>
                    )}

                    <div className="space-y-4 rounded-md">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@whereismymoney.com"
                                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all placeholder:text-slate-300"
                            />
                        </div>

                        {/* Role selection mapping directly to your backend Spring Security configuration matchers */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                                Desired Account Role
                            </label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRole("ROLE_USER")}
                                    className={`flex-1 py-2.5 text-xs font-bold tracking-wide uppercase rounded-xl border transition-all ${role === "ROLE_USER"
                                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    Standard User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("ROLE_ADMIN")}
                                    className={`flex-1 py-2.5 text-xs font-bold tracking-wide uppercase rounded-xl border transition-all ${role === "ROLE_ADMIN"
                                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    System Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all disabled:opacity-50"
                        >
                            {loading ? "Registering Profile..." : "Secure Sign Up"}
                        </button>
                    </div>
                    
                    <div className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <span 
                            onClick={onSwitchToLogin}
                            className="font-semibold text-slate-950 hover:underline cursor-pointer transition-all"
                        >
                            Sign in here
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
