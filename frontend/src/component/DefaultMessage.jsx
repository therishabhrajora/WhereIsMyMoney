import React, { useContext, useState } from "react";
import MessageSender from "./MessageSender";
import { GlobalContext } from "../api/Context";
import Brand from "./Brand";

const DefaultMessage = () => {
  const { start, setStart } = useContext(GlobalContext);
  const handleAddSample = () => {
    setStart(!start);
  };

  return (
    <div className="relative bg-slate-50 p-6 mb-12 font-sans antialiased text-slate-800">
      <div className="mx-auto max-w-2xl">
        {/* Header Section */}
        <Brand />

        {/* CONDITIONAL RENDER: Show welcome message only if transaction list is empty */}

        <div className="w-[50%] mx-auto">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Welcome to your Expense Tracker!</span>
            <span className="animate-bounce">💰</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Taking control of your money starts here. This app helps you monitor
            your daily spending habits so you can hit your financial goals
            faster.
          </p>
        </div>

        {!start && (
          <p className="mt-6 text-xs italic text-slate-400 border-t border-dashed border-slate-100 pt-4 text-center">
            Tap the button below to log your very first transaction!
          </p>
        )}

        {/* Action Button Section */}
        {!start && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAddSample}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-95 transition-all"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultMessage;
