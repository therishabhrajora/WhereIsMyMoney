import { useContext } from "react";
import { GlobalContext } from "../api/Context";

const Record = ({record}) => {
    const { expenses, inputMessages } = useContext(GlobalContext);

    // Prevents crashing if arrays are completely empty
    const menuMsg = inputMessages[inputMessages.length - 1] === "/menu";
    const lastExpense = record || { income: 0, expense: 0, reason: "None" };
    // 1. Get the current date parameters dynamically
    const currentDate = new Date();
    const currentDayNum = currentDate.getDate();
    const currentMonthNum = currentDate.getMonth() + 1; // JS months are 0-11
    const currentYearNum = currentDate.getFullYear();


    const todayExpenses = expenses
        .filter(item => Number(item.date) === currentDayNum && Number(item.month) === currentMonthNum && Number(item.year) === currentYearNum)
        .reduce((sum, item) => {
            const expenseValue = Number(item.expense || 0);
            const incomeValue = Number(item.income || 0);

            return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
        },0);

    const monthExpenses = expenses
        .filter(item => Number(item.month) === currentMonthNum && Number(item.year) === currentYearNum)
        .reduce((sum, item) => {
            const expenseValue = Number(item.expense || 0);
            const incomeValue = Number(item.income || 0);

            return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
        },0);

    const yearExpenses = expenses
        .filter(item => Number(item.year) === currentYearNum)
        .reduce((sum, item) => {
            const expenseValue = Number(item.expense || 0);
            const incomeValue = Number(item.income || 0);

            return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
        },0);

    // 3. Optional: Category-specific calculation matching your last entry
    const categoryExpenses = expenses
        .filter(item => item.category === lastExpense.category)
        .reduce((sum, item) => {
            const expenseValue = Number(item.expense || 0);
            const incomeValue = Number(item.income || 0);

            return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
        },0);




    return (
        <div className="w-full max-w-sm rounded-2xl flex flex-col gap-1 shadow-sm overflow-hidden animate-in fade-in duration-200 bg-transparent">
            <table className="w-full text-sm table-fixed border-separate border-spacing-y-1">
                {menuMsg ? (
                    <tbody>
                        <tr className="bg-white">
                            <td colSpan={2} className="p-4 text-slate-700 space-y-1 rounded-t-2xl">
                                <div className="border-b border-dashed border-slate-200 pb-2 mb-2 text-slate-400 font-mono">-----</div>
                                <p className="text-slate-600">this month: <span className="font-semibold text-slate-900">{monthExpenses}</span> </p>
                                <p className="text-slate-600">today: <span className="font-semibold text-slate-900">{todayExpenses}</span></p>
                            </td>
                        </tr>
                        <tr className="font-semibold text-center bg-slate-50 text-slate-700">
                            <td className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors rounded-l-lg">Today</td>
                            <td className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors border-l border-slate-200 rounded-r-lg">Statics</td>
                        </tr>
                        <tr className="font-semibold text-center bg-slate-50 text-slate-700">
                            <td colSpan={2} className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors rounded-l-lg">
                                back
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        <tr className="bg-white">
                            <td colSpan={2} className="p-4 text-slate-700 rounded-t-2xl">
                                <div className="space-y-1 pb-3">
                                    <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Saved</p>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {lastExpense.income === 0 && <span className="font-semibold">{lastExpense.expense}.0</span>}
                                        {lastExpense.expense === 0 && <span className="font-semibold">{lastExpense.income}.0</span>}
                                    </p>
                                    <p className="text-xs text-slate-500">comment: <span className="italic text-slate-700">{lastExpense.reason}</span></p>
                                </div>
                                <div className="pt-3 space-y-1">
                                    <div className="text-slate-300 font-mono text-xs pb-1">-----</div>
                                    <p className="text-slate-600">this month: <span className="font-semibold text-slate-900">{monthExpenses}</span> </p>
                                    <p className="text-slate-600">today: <span className="font-semibold text-slate-900">{todayExpenses}</span></p>
                                    <p className="text-slate-600">In the category <span className="font-semibold text-slate-900">{lastExpense.reason}</span>: <span className="text-slate-400 text-xs">{categoryExpenses}</span></p>
                                </div>
                            </td>
                        </tr>
                        {/* Fixed backdrop filter structure for rows */}
                        <tr className="font-semibold text-center text-slate-800 bg-slate-100">
                            <td className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg">Today</td>
                            <td className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors border-l border-slate-300 rounded-r-lg">Statics</td>
                        </tr>
                        <tr className="font-semibold text-center text-slate-800 bg-slate-100">
                            <td colSpan={2} className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg">
                                back
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default Record;
