import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import CurrencyExchangeView from "./modal/CurrencyExchangeView";
import VisualizeDataView from "./modal/VisualizeDataView ";
import ExportDataView from "./modal/ExportDataView";
import SettingsView from "./modal/SettingView";
import { GlobalContext } from "../../api/Context";

const agents = [
    {
        id: "currency-exchange",
        title: "Currency Exchange",
        description: "Convert international rates and log foreign expenses into your base currency.",
        icon: "💱",
        color: "from-blue-500/10 to-indigo-500/10 text-indigo-600 border-indigo-100",
        badge: "Multi-Currency"
    },
    {
        id: "visualize-data",
        title: "Visualize Your Data",
        description: "Render interactive trend lines, balance insights, and category breakdown metrics.",
        icon: "📊",
        color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-100",
        badge: "Analytics"
    },
    {
        id: "export-data",
        title: "Export Your Data",
        description: "Download your entire structural transaction ledger as a clean Excel CSV spreadsheet statement.",
        icon: "📥",
        color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-100",
        badge: "CSV Engine"
    },
    {
        id: "settings",
        title: "Settings & Profile",
        description: "Configure your monthly budget safety velocity guidelines and manage security rules.",
        icon: "⚙️",
        color: "from-slate-500/10 to-zinc-500/10 text-slate-600 border-slate-100",
        badge: "System"
    },
    {
        id: "split-bill",
        title: "Group Bill Splitter",
        description: "Divide restaurant tabs and shared utility room bills equally among friends instantly.",
        icon: "👥",
        color: "from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-100",
        badge: "P2P Ledger"
    }
];


const ExpenseAgentsModal = ({ onClose }) => {
    const [activeModelId, setActiveModelId] = useState(null);

    const { endRef, scrollToBottom } = useContext(GlobalContext);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">

            {/* Dynamic View Toggle */}
            {!activeModelId ? (
                <div>
                    {/* Header Description Title */}
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                                Functional Feature Models
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Select a specialized algorithmic engine to process your workspace metrics.
                            </p>
                        </div>
                        <div
                            onClick={onClose}
                            className="flex items-center justify-center border border-slate-200 rounded-xl h-10 w-10 p-1 cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs hover:shadow-md"
                        >
                            <X size={20} className="text-slate-500 hover:text-slate-700" />
                        </div>
                    </div>

                    {/* 2. Responsive Card Grid Block layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agents.map((agent) => (
                            <div
                                key={agent.id}
                                onClick={() => setActiveModelId(agent.id)}
                                className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 cursor-pointer shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Micro Gradient Background on Card Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${agent.color.split(' ')[0]} ${agent.color.split(' ')[1]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                                <div className="relative z-10">
                                    {/* Top Row: Icon Container and Meta Badge Tag */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color.split(' ')[0]} ${agent.color.split(' ')[1]} flex items-center justify-center text-2xl shadow-2xs`}>
                                            {agent.icon}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-white/80 ${agent.color.split(' ').slice(2).join(' ')}`}>
                                            {agent.badge}
                                        </span>
                                    </div>

                                    {/* Text Information Blocks */}
                                    <h3 className="text-base font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                                        {agent.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                        {agent.description}
                                    </p>
                                </div>

                                {/* Bottom Action Hint Link */}
                                <div className="relative z-10 mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                                    <span>Launch Engine</span>
                                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                                        ➔
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* 3. Render Area for Selected Functional Active View Code Blocks */
                <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-200">

                    {/* Global Return Nav Action Anchor */}
                    <button
                        onClick={() => { setActiveModelId(null), scrollToBottom() }}
                        className="mb-6 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
                    >
                        ← Back to Feature Blocks
                    </button>

                    {/* Container targets targeting individual mock module models */}
                    <div className="border border-dashed border-slate-200 rounded-xl p-8 bg-slate-50/50 text-center">
                        {activeModelId === "currency-exchange" && <CurrencyExchangeView />}
                        {activeModelId === "visualize-data" && <VisualizeDataView />}
                        {activeModelId === "export-data" && <ExportDataView />}
                        {activeModelId === "settings" && <SettingsView />}
                        {activeModelId === "split-bill" && <p className="text-sm font-medium text-slate-600">Active View: Peer-to-Peer Split Calculator</p>}
                    </div>

                    <div ref={endRef} />
                </div>
            )}
        </div>

    );
}

export default ExpenseAgentsModal;
