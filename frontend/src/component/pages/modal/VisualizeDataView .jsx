import React, { useContext, useMemo, useState } from 'react';
import { GlobalContext } from '../../../api/Context';
import { TrendingUp, TrendingDown, Wallet, PieChart, Activity, Calendar } from 'lucide-react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function VisualizeDataView() {
    const { messages } = useContext(GlobalContext);

    // 1. Initialize Date Range Filters (Defaults: First day of current month to today)
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const formatDateString = (dateObj) => dateObj.toLocaleDateString('en-CA'); // Outputs "YYYY-MM-DD"

    const [fromDate, setFromDate] = useState(formatDateString(firstDayOfMonth));
    const [toDate, setToDate] = useState(formatDateString(today));

    // 2. Compute Filtered Metrics inside useMemo (Listens directly to date shifts)
    const analyticsData = useMemo(() => {
        // Filter by type "record" first
        const allRecords = (messages || []).filter(item => item.type === "record");

        // Filter strictly within date range boundaries
        const records = allRecords.filter(item => {
            if (!item.date) return false;
            return item.date >= fromDate && item.date <= toDate;
        });

        let totalIncome = 0;
        let totalExpense = 0;
        const categoryTotals = {};
        const dailyTrend = {};

        records.forEach(item => {
            const expense = Number(item.expense || 0);
            const income = Number(item.income || 0);
            const cat = item.category || "Uncategorized";
            const dateStr = item.date;

            totalIncome += income;
            totalExpense += expense;

            if (!categoryTotals[cat]) categoryTotals[cat] = 0;
            categoryTotals[cat] += expense + income;

            if (!dailyTrend[dateStr]) dailyTrend[dateStr] = 0;
            dailyTrend[dateStr] += (income - expense);
        });

        const sortedDates = Object.keys(dailyTrend).sort((a, b) => new Date(a) - new Date(b));

        let currentPool = 0;
        const runningBalances = [];
        sortedDates.forEach(date => {
            currentPool += dailyTrend[date];
            runningBalances.push(currentPool);
        });

        return {
            totalIncome,
            totalExpense,
            netSavings: totalIncome - totalExpense,
            recordsCount: records.length,
            categoryLabels: Object.keys(categoryTotals),
            categoryValues: Object.values(categoryTotals),
            timelineLabels: sortedDates,
            timelineValues: runningBalances
        };
    }, [messages, fromDate, toDate]); // 👈 Critical: Runs equations again immediately on date change

    // 3. Define Chart Configurations
    const doughnutData = {
        labels: analyticsData.categoryLabels,
        datasets: [
            {
                label: 'Allocation (₹)',
                data: analyticsData.categoryValues,
                backgroundColor: [
                    'rgba(16, 185, 129, 0.75)', 'rgba(59, 130, 246, 0.75)',
                    'rgba(245, 158, 11, 0.75)', 'rgba(139, 92, 246, 0.75)',
                    'rgba(239, 68, 68, 0.75)', 'rgba(100, 116, 139, 0.75)'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const lineData = {
        labels: analyticsData.timelineLabels.map(d => d.substring(5)), // Trims to MM-DD
        datasets: [
            {
                label: 'Net Balance Velocity (₹)',
                data: analyticsData.timelineValues,
                fill: false,
                backgroundColor: '#10b981',
                borderColor: 'rgba(16, 185, 129, 0.8)',
                tension: 0.3,
                pointRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
        }
    };

    return (
        <div className="w-full text-left bg-white rounded-2xl animate-in fade-in duration-300">

            {/* Header Rows */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        📊 Premium Data Visualization Studio
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Displaying metrics compiled from {analyticsData.recordsCount} filtered ledger logs.
                    </p>
                </div>

                {/* 🟩 DATE RANGE FILTER CONTROLS BOX */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs max-w-sm">
                    <Calendar size={16} className="text-slate-400 shrink-0 ml-1" />
                    <div className="flex items-center gap-1.5">
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-md px-2 py-1 font-semibold text-slate-700 outline-hidden focus:border-emerald-500"
                        />
                        <span className="text-slate-400 font-medium">to</span>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-md px-2 py-1 font-semibold text-slate-700 outline-hidden focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* Numerical Cards Grid Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center"><TrendingUp size={18} /></div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Inflow (Filtered)</span>
                        <span className="text-base font-black text-slate-800">₹{analyticsData.totalIncome.toLocaleString()}</span>
                    </div>
                </div>

                <div className="bg-rose-50/40 border border-rose-100 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center"><TrendingDown size={18} /></div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Outflow (Filtered)</span>
                        <span className="text-base font-black text-slate-800">₹{analyticsData.totalExpense.toLocaleString()}</span>
                    </div>
                </div>

                <div className="bg-blue-50/40 border border-blue-100 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center"><Wallet size={18} /></div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Range Net Change</span>
                        <span className="text-base font-black text-slate-800">₹{analyticsData.netSavings.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Chart.js Vector Canvas Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-slate-50/60 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Activity size={14} className="text-slate-500" /> Cash Flow Balance Velocity
                    </h4>
                    <div className="h-[240px] relative w-full bg-white p-2 rounded-xl border border-slate-200/40">
                        {analyticsData.timelineLabels.length > 0 ? (
                            <Line data={lineData} options={chartOptions} />
                        ) : (
                            <p className="text-xs text-slate-400 text-center pt-24">No transactions found inside this date range boundary loop.</p>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-slate-50/60 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <PieChart size={14} className="text-slate-500" /> Allocation Breakdown
                    </h4>
                    <div className="h-[240px] relative w-full bg-white p-2 rounded-xl border border-slate-200/40">
                        {analyticsData.categoryLabels.length > 0 ? (
                            <Doughnut data={doughnutData} options={chartOptions} />
                        ) : (
                            <p className="text-xs text-slate-400 text-center pt-24">No category data matching these filter bounds.</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default VisualizeDataView;
