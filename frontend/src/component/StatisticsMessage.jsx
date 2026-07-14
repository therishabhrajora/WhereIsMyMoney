import { useContext, useState } from "react";
import Data from "../api/Data";
import { GlobalContext } from "../api/Context";

const StatisticsMessage = () => {
    const { monthNames } = Data;
    const { expenses } = useContext(GlobalContext);

    // 1. Store a full Date object to safely manage months and years
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 2. Extract current viewed month and year values from state
    const monthNum = selectedDate.getMonth() + 1; // 1 - 12
    const yearNum = selectedDate.getFullYear();

    // 3. Increment month safely (handling December to January transitions)
    const nextMonth = () => {
        const next = new Date(selectedDate);
        next.setMonth(selectedDate.getMonth() + 1);
        setSelectedDate(next);
    };

    // 4. Decrement month safely (handling January to December transitions)
    const prevMonth = () => {
        const prev = new Date(selectedDate);
        prev.setMonth(selectedDate.getMonth() - 1);
        setSelectedDate(prev);
    };

    // 5. Filter expenses using the dynamic state variables (monthNum & yearNum)
    const monthExpenses = expenses
        .filter(
            (item) =>
                Number(item.month) === monthNum &&
                Number(item.year) === yearNum
        )
        .reduce((sum, item) => {
            const expenseValue = Number(item.expense || 0);
            const incomeValue = Number(item.income || 0);
            return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
        }, 0);

    // 6. Reset to the current real-world month
    const resetToCurrentMonth = () => {
        setSelectedDate(new Date());
    };

    return (
        <table className="w-full text-sm table-fixed border-separate border-spacing-y-1">
            <tbody>
                <tr className="bg-white">
                    <td colSpan={2} className="p-4 text-slate-700 rounded-t-2xl">
                        <div className="space-y-1 pb-3">
                            <p className="text-2xl space-x-2 font-semibold text-slate-900 tracking-tight">
                                {/* Use monthNum directly with your 1-indexed helper array */}
                                <span>{monthNames[monthNum]}</span>
                                <span>{yearNum}</span>
                            </p>
                            <p className="text-xs text-slate-500">
                                Expenses: {monthExpenses}
                            </p>
                        </div>
                        <div className="pt-3 space-y-1">
                            <div className="text-slate-300 font-mono text-xs pb-1">
                                -----
                            </div>
                            <p className="text-slate-600"></p>
                            <p className="text-slate-600"></p>
                            <p className="text-slate-600"></p>
                        </div>
                    </td>
                </tr>
                <tr className="font-semibold text-center text-slate-800 bg-slate-100">
                    <td
                        onClick={prevMonth}
                        className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg"
                    >
                        &lt;&lt;
                    </td>
                    <td
                        onClick={nextMonth}
                        className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors border-l border-slate-300 rounded-r-lg"
                    >
                        &gt;&gt;
                    </td>
                </tr>
                <tr className="font-semibold text-center text-slate-800 bg-slate-100">
                    <td
                        colSpan={2}
                        onClick={resetToCurrentMonth}
                        className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-b-lg"
                    >
                        Current Month
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default StatisticsMessage;
