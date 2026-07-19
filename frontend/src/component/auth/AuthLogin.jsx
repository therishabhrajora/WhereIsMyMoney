import React, { useState } from "react";
import { AuthService } from "../../api/apiClient"; // Update path based on your project structure
import Register from "./AuthRegister";


const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // 1. Package fields to match your backend UserLoginDto constraints exactly
    const loginPayload = {
      email: email.trim(),
      password: password,
      role: role,
    };

    try {
      // 2. Dispatch request and await the backend verification response
      const response = await AuthService.login(loginPayload);
     
      

      // 3. Persist the generated JWT token string locally
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userRole", response.data.role);
      }

      // Execute success callback to redirect user or refresh global states
      if (onLoginSuccess) {
        onLoginSuccess(response);
        
      }
    } catch (error) {
      // Handles unmapped network breaks or explicit 401 exceptions cleanly
      setErrorMessage(
        error.message || "Invalid credentials. Authentication failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-fit items-center justify-center bg-slate-50 my-4 px-2 py-10 sm:px-6 lg:px-8 lg:py-2 lg:my-2 animate-in fade-in duration-300">
      <div className="w-full max-w-md space-y-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Enter your transaction management system credentials
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
          {/* Display contextual runtime validation error updates safely */}
          {errorMessage && (
            <div className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-600 border border-rose-100 animate-in shake-in duration-200">
              {errorMessage}
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

            {/* Custom Input Structure Section mapping directly to your roles assignment values */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Account Role Profiler
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("ROLE_USER")}
                  className={`flex-1 py-2.5 text-xs font-bold tracking-wide uppercase rounded-xl border transition-all ${
                    role === "ROLE_USER"
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Standard User
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ROLE_ADMIN")}
                  className={`flex-1 py-2.5 text-xs font-bold tracking-wide uppercase rounded-xl border transition-all ${
                    role === "ROLE_ADMIN"
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
              {loading ? "Authenticating Session..." : "Secure Sign In"}
            </button>
          </div>
          <div className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <span
              onClick={onSwitchToRegister}
              className="font-semibold text-slate-950 hover:underline cursor-pointer transition-all"
            >
              Register now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;