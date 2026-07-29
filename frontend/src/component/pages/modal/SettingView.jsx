import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../api/Context'; // Adjust path based on your file structure
import { ShieldCheck, User, Settings, Save, Lock, AlertCircle, KeyRound } from 'lucide-react';
import { toast } from 'react-toastify';
import AuthService from '../../../api/apiClient'; // Adjust path based on your file structure

function SettingsView() {
  const { setLoading } = useContext(GlobalContext);

  // 1. User Meta Profile States (Pulled directly from local session keys)
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userRole = localStorage.getItem("userRole") || "USER";

  // 2. Local State Management for Financial Configurations
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    return localStorage.getItem("monthlyBudgetLimit") || "25000";
  });

  // 3. Security Password Change States
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  // Save financial structural parameters locally
  const handleSaveBudget = (e) => {
    e.preventDefault();
    if (!monthlyBudget || Number(monthlyBudget) <= 0) {
      toast.warning("Please enter a valid monthly budget amount.");
      return;
    }
    localStorage.setItem("monthlyBudgetLimit", monthlyBudget);
    toast.success("Monthly budget safety guidelines updated successfully! 🎯");
  };

  // 4. Dispatch Password Updates to your Spring Boot Security Backend
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword) {
      toast.warning("Please fill out all password fields.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error("New passwords do not match. Please verify your entries.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.warning("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      // Package payload to match your Spring Boot security update constraints
      const payload = {
        email: userEmail,
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword.trim()
      };

      // Assuming your AuthService exposes a changePassword endpoint
      if (typeof AuthService.changePassword === 'function') {
        await AuthService.changePassword(payload);
        toast.success("Security credentials updated! Your new password is now active. 🔒");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      } else {
        // Mock success fallback for UI verification if your backend service file isn't linked yet
        console.log("Dispatched payload to security core:", payload);
        toast.info("Password configuration processed locally (API hook pending).");
      }
    } catch (error) {
      const apiMessage = error.response?.data?.message || "Failed to update security rules. Verify old password.";
      toast.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full text-left bg-white rounded-2xl animate-in fade-in duration-300">
      
      {/* Title Subheader */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          ⚙️ Workspace System Settings
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Configure financial safety thresholds, audit account configurations, and manage encryption rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Profile Meta & Financial Controls */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Section A: User Identity Card */}
          <div className="bg-slate-50/60 border border-slate-100 p-5 rounded-2xl">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <User size={14} className="text-slate-500" /> Account Profile Node
            </h4>
            
            <div className="flex items-center gap-4 bg-white p-4 border border-slate-200/40 rounded-xl shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg uppercase">
                {userEmail.substring(0, 2)}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">{userEmail}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                    Role: {userRole}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block" />
                  <span className="text-[10px] text-emerald-600 font-semibold">Active Session</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Financial Budget Parameters Form */}
          <div className="bg-slate-50/60 border border-slate-100 p-5 rounded-2xl">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Settings size={14} className="text-slate-500" /> Budget Velocity Thresholds
            </h4>
            
            <form onSubmit={handleSaveBudget} className="flex flex-col sm:flex-row items-end gap-3 mt-2">
              <div className="w-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Monthly Outflow Hard Limit (₹)
                </label>
                <input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-xs select-none cursor-pointer whitespace-nowrap"
              >
                <Save size={16} /> Save Budget
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: Password Encryption & Security Form */}
        <div className="bg-slate-50/60 border border-slate-100 p-5 rounded-2xl">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-slate-500" /> Security Filter Rules
          </h4>

          <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-3.5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">New Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Confirm New Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 text-slate-400" size={14} />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordForm.confirmNewPassword}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 outline-hidden transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-slate-900 shadow-2xs hover:shadow-xs transition select-none cursor-pointer mt-2"
            >
              Update Credentials
            </button>
          </form>
          {/* Audit Trail Disclaimer Notice */}
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0 text-amber-600"
            />
            <div>
              <p className="text-xs font-semibold text-amber-700">
                Security Notice
              </p>
              <p className="mt-1 text-[11px] leading-5 text-amber-700/90">
                Choose a strong password with at least 6 characters. Avoid
                reusing passwords across different accounts. Your budget
                settings are stored locally in your browser, while password
                updates are processed securely by the backend service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;