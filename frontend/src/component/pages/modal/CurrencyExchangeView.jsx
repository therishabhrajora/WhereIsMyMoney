import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { ExchangeRates } from '../../../api/apiClient';

// 1. Hardcoded Base Multiplication Multiplier Ratios (Programmatic Rates Engine)


const POPULAR_CURRENCIES = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸", rateKey: "USD" },
    { code: "EUR", name: "Euro", flag: "🇪🇺", rateKey: "EUR" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧", rateKey: "GBP" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rateKey: "AED" }
];

function CurrencyExchangeView() {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [convertedAmount, setConvertedAmount] = useState(8350);
    const [exchangeRates, setExchangeRates] = useState({});
    const [copied, setCopied] = useState(false);
    console.log(exchangeRates);
    // 2. Programmatic Calculation Core Loop
    useEffect(() => {
        const getRates = async () => {
            try {
                const res = await ExchangeRates.rates(fromCurrency);
                const rates = res.data.conversion_rates;

                setExchangeRates(rates);

                const rate = rates[toCurrency] || 1;
                const numAmount = parseFloat(amount) || 0;

                setConvertedAmount((numAmount * rate).toFixed(2));
            } catch (err) {
                console.error(err);
            }
        };

        getRates();
    }, [amount, fromCurrency, toCurrency]);

    // 3. Swap Currency Action Macro
    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // 4. Clipboard Integration Utility
    const copyToClipboard = () => {
        const textSummary = `Converted ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency} (Rate: ${EXCHANGE_RATES[fromCurrency][toCurrency]})`;
        navigator.clipboard.writeText(textSummary);
        setCopied(true);
        toast.success("Conversion layout copied to clipboard! 📋");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full text-left bg-white rounded-2xl animate-in fade-in duration-300">

            {/* Title Subheader */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    💱 Currency Conversion Ledger
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    Compute global currency adjustments programmatically using local exchange matrices.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Main Calculator Form Container */}
                <div className="lg:col-span-2 bg-slate-50/60 border border-slate-100 p-5 rounded-2xl flex flex-col gap-4">

                    {/* Amount Field Input */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Transaction Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter numerical monetary value..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                        />
                    </div>

                    {/* Currency Selection Selector Row */}
                    <div className="flex flex-col sm:flex-items sm:flex-row items-center gap-3 mt-1">

                        {/* Source Currency */}
                        <div className="w-full">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                                From Currency
                            </label>

                            {/* 1. The Select box wrapper stays on the OUTSIDE of the loop matrix */}
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-hidden focus:border-emerald-500 transition"
                            >
                                {/* 2. Run your map tracking loop ONLY across the target Option children nodes */}
                                {exchangeRates && Object.keys(exchangeRates).map((country) => {
                                    return (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>

                        {/* Programmatic Swap Direction Button */}
                        <button
                            onClick={handleSwap}
                            className="mt-5 p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition text-slate-500 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                            title="Swap Currencies"
                        >
                            <ArrowLeftRight size={18} className="rotate-90 sm:rotate-0" />
                        </button>

                        {/* Target Currency */}
                        <div className="w-full">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                                To Currency
                            </label>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-hidden focus:border-emerald-500 transition"
                            >
                                {/* 2. Run your map tracking loop ONLY across the target Option children nodes */}
                                {exchangeRates && Object.keys(exchangeRates).map((country) => {
                                    return (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                    </div>

                    {/* Conversions Output Terminal Screen Box */}
                    <div className="bg-emerald-950 text-emerald-400 p-5 rounded-xl border border-emerald-900 mt-4 flex items-center justify-between shadow-inner">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest block opacity-60">
                                Calculated Valuation
                            </span>
                            <div className="text-2xl font-black mt-1 text-white">
                                {Number(amount || 0).toLocaleString()} <span className="text-sm font-medium text-emerald-400">{fromCurrency}</span>
                                <span className="text-xl font-normal text-emerald-500 mx-2">=</span>
                                {Number(convertedAmount || 0).toLocaleString()} <span className="text-sm font-medium text-emerald-300">{toCurrency}</span>
                            </div>

                            {/* 🟩 DYNAMIC METRIC FIX: Reads live interbank conversion factors straight from state */}
                            <span className="text-[11px] block mt-1.5 text-emerald-400/80">
                                1 {fromCurrency} = {exchangeRates && exchangeRates[toCurrency] ? exchangeRates[toCurrency] : "1.00"} {toCurrency}
                            </span>
                        </div>

                        {/* Copy Clipboard Macro Triggers */}
                        <button
                            onClick={copyToClipboard}
                            className="p-2.5 bg-emerald-900/40 border border-emerald-800/60 rounded-lg hover:bg-emerald-900 text-emerald-300 transition cursor-pointer"
                            title="Copy Summary"
                        >
                            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        </button>
                    </div>


                </div>

                {/* RIGHT COLUMN: Popular Reference Matrices Rates Feed Layout */}
                <div className="bg-slate-50/40 border border-slate-100 p-5 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                        Foreign Rates Context (Relative to {fromCurrency})
                    </h4>

                    <div className="flex flex-col gap-3">
                        {POPULAR_CURRENCIES.map((cur) => {
                            // 1. Extract the live multiplier coefficient factor matching this currency string
                            const liveRate = exchangeRates && exchangeRates[cur.code] ? exchangeRates[cur.code] : null;

                            return (
                                <div
                                    key={cur.code}
                                    className="flex items-center justify-between p-3 bg-white border border-slate-200/60 rounded-xl shadow-xs hover:border-slate-300 transition-colors"
                                >
                                    {/* Left side: Flag and currency details */}
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-xl">{cur.flag}</span>
                                        <div className="text-left">
                                            <span className="text-sm font-bold text-slate-800 block">{cur.code}</span>
                                            <span className="text-[10px] text-slate-400 block">{cur.name}</span>
                                        </div>
                                    </div>

                                    {/* Right side: Dynamic live conversion calculations */}
                                    <div className="text-right">
                                        <span className="text-xs font-medium text-slate-400 block">
                                            1 {fromCurrency} =
                                        </span>
                                        <span className="text-sm font-black text-slate-800 block mt-0.5">
                                            {liveRate ? `${Number(liveRate).toFixed(4)} ${cur.code}` : "Loading..."}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>

        </div>
    );
}

export default CurrencyExchangeView;
