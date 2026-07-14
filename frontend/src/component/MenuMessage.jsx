import { useContext, useState } from "react";
import { GlobalContext } from "../api/Context";

const MenuMessage = () => {
  const { expenses } = useContext(GlobalContext);
  const currentDate = new Date();
  const currentDayNum = currentDate.getDate();
  const currentMonthNum = currentDate.getMonth() + 1; // JS months are 0-11
  const currentYearNum = currentDate.getFullYear();
  let [date, setDate] = useState(currentDayNum);

  const todayExpenses = expenses
    .filter(
      (item) =>
        Number(item.date) === currentDayNum &&
        Number(item.month) === currentMonthNum &&
        Number(item.year) === currentYearNum,
    )
    .reduce((sum, item) => {
      const expenseValue = Number(item.expense || 0);
      const incomeValue = Number(item.income || 0);

      return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
    }, 0);


  const nextDay = () => {
    setDate(++date);

  }
  const prevDay = () => {
    setDate(--date);
  }
  return (
    <table className="w-full text-sm table-fixed border-separate border-spacing-y-1">
      <tbody>
        <tr className="bg-white">
          <td colSpan={2} className="p-4 text-slate-700 rounded-t-2xl">
            <div className="space-y-1 pb-3">
              <p className="text-2xl space-x-2 font-semibold text-slate-900 tracking-tight">
                <span>{currentDayNum + "-" + currentMonthNum + "-" + currentYearNum}</span>
              </p>
              <p className="text-xs text-slate-500">
                Expenses:{todayExpenses}
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <div className="text-slate-300 font-mono text-xs pb-1">
                -----
              </div>
              <p className="text-slate-600">

              </p>
              <p className="text-slate-600">

              </p>
              <p className="text-slate-600">

              </p>
            </div>
          </td>
        </tr>
        {/* Fixed backdrop filter structure for rows */}
        <tr className="font-semibold text-center text-slate-800 bg-slate-100">
          <td
            onClick={() => prevDay()}
            className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg"
          >
            &lt;&lt;
          </td>
          <td
            onClick={() => nextDay()}
            className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors border-l border-slate-300 rounded-r-lg"
          >
            &gt;&gt;
          </td>
        </tr>
        <tr className="font-semibold text-center text-slate-800 bg-slate-100">
          <td
            colSpan={2}
            className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg"
          >
            Back
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MenuMessage;