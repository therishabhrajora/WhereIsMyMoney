import React, { useContext } from "react";
import { Languages, ChevronLeft } from "lucide-react";
import { GlobalContext } from "../api/Context"; // Adjust path based on your file tree

const StartMessage = () => {
  // Pull language configuration states from global context
  const { setCommand, handleMessages } = useContext(GlobalContext);

  const handleLanguageSelect = (lang) => {
    // 1. Log user choice directly onto chat stream
    handleMessages(`Selected Language: ${lang}`);
    
    // 2. Clear command back to base default chat board view
    setCommand("");
  };

  return (
    <div className="w-[75%] max-w-sm  bg-white flex gap-1 flex-col animate-in fade-in duration-200">
      
      {/* Component Header Block */}
      <div className="mb-1 flex items-center gap-2 p-2 rounded-xl hover:text-emerald-700 text-emerald-500 shadow">
        <Languages className="h-5 w-5 text-emerald-500" />
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          Please select your language / भाषा चुनें
        </h2>
      </div>

      {/* Language Selections Layout Container */}
      <div className="space-y-1">
        {/* Option 1: English */}
        <button
          onClick={() => handleLanguageSelect("English")}
          className="w-full flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all active:scale-[0.99] select-none text-left"
        >
          <span>🇺🇸 English</span>
          <span className="text-xs font-normal text-slate-400">Select</span>
        </button>

        {/* Option 2: Hindi */}
        <button
          onClick={() => handleLanguageSelect("Hindi")}
          className="w-full flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all active:scale-[0.99] select-none text-left"
        >
          <span>🇮🇳 हिन्दी (Hindi)</span>
          <span className="text-xs font-normal text-slate-400">चुनें</span>
        </button>

        {/* Option 3: Back Button */}
        <button
          onClick={() => setCommand("")}
          className="w-full mt-2 flex items-center justify-center gap-1 rounded-xl border border-dashed border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 hover:border-slate-300 transition-all active:scale-[0.99]"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Back to Main Menu</span>
        </button>
      </div>

    </div>
  );
};

export default StartMessage;
