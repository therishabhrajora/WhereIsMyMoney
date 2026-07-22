import React, { useState } from 'react';
import { AuthService } from '../../api/apiClient';

export default function ForgotPassword({ onForgotPasswordSuccess, onSwitchToLogin }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsLoading(true);
        setErrorMessage('');

        try {
            // Replace with your actual Spring Boot Security auth endpoint link
            console.log(email)
            const response = await AuthService.forgotPassword({email:email})
            console.log(response);
            if (response.status!=200) {
                throw new Error('No account found with this email address.');
            }
            // Transition smoothly to success checkmark view
            if (onForgotPasswordSuccess) {
                setTimeout(() => {
                    onForgotPasswordSuccess(response);
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-100">
            <div className="sm:mx-auto w-full max-w-md">
                {/* App Logo Indicator Anchor */}
                <div className="text-center text-4xl mb-2">💰</div>
                <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
                    ExpenseTrackr
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto w-full max-w-md px-4">
                <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-xl border border-slate-100 rounded-3xl sm:px-10 transition-all duration-300">

                    {!isSubmitted ? (
                        /* STEP 1: Enter Email Recovery View Form */
                        <div className="animate-in fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                Forgot password?
                            </h3>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                                No worries! Enter your account email below and we will send you a secure link to reset your credentials.
                            </p>

                            {errorMessage && (
                                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium animate-shake">
                                    ⚠️ {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleResetSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                                        disabled={isLoading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !email.trim()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 py-3 rounded-xl text-sm font-semibold shadow-md shadow-blue-100 transition-all duration-150 active:scale-[0.99] flex justify-center items-center"
                                >
                                    {isLoading ? (
                                        /* Loading Spinner Ring SVG */
                                        <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* STEP 2: Email Dispatched Success Banner Screen */
                        <div className="text-center py-4 animate-in scale-in duration-300">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 text-2xl mb-5 shadow-sm">
                                ✓
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                Check your email
                            </h3>
                            <p className="text-sm text-slate-500 px-2 leading-relaxed mb-6">
                                We've sent recovery password instructions to <br />
                                <span className="font-semibold text-slate-700">{email}</span>.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Didn't receive it? Try a different address
                            </button>
                        </div>
                    )}

                    {/* Footer Back Anchor Link Option */}
                    <div onClick={onSwitchToLogin} className="mt-6 border-t border-slate-100 pt-5 text-center">
                        <a
                            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors group"
                        >
                            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                            Back to Sign In
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
