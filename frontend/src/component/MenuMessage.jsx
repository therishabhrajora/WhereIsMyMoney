import { useContext, useState } from "react";
import { GlobalContext } from "../api/Context";

const MenuMessage = ({ time, width }) => {
  const { messages } = useContext(GlobalContext);
  const currentDate = new Date();

  let [date, setDate] = useState(currentDate);
  const [backBtn, setSetBackbtn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [backToToday, setBackToToday] = useState(true);

  const currentDayNum = date.getDate();
  const currentMonthNum = date.getMonth() + 1; // JS months are 0-11
  const currentYearNum = date.getFullYear();

  // 1. Get the array items first
  const todayExpensesData = messages.filter((item => item.type === "record")).filter(
    (item) =>
      Number(item.record.date) === currentDayNum &&
      Number(item.record.month) === currentMonthNum &&
      Number(item.record.year) === currentYearNum,
  );


  // 2. Reuse the array above to calculate the mathematical sum total
  const todayExpenses = todayExpensesData.reduce((sum, item) => {
    const expenseValue = Number(item.record.expense || 0);
    const incomeValue = Number(item.record.income || 0);
    return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
  }, 0);

  // Calculate total expense grouped by category
  const categoryTotals = todayExpensesData.reduce((acc, item) => {
    const cat = item.record.category;
    const expenseValue = Number(item.record.expense || 0);
    const incomeValue = Number(item.record.income || 0);

    // Initialize the category object with separate counters if it doesn't exist
    if (!acc[cat]) {
      acc[cat] = { expense: 0, income: 0 };
    }

    // Accumulate income and expenses separately
    acc[cat].expense += expenseValue;
    acc[cat].income += incomeValue;

    return acc;
  }, {});
  // This creates a structure like: 
  // { "Food": { expense: 450, income: 0 }, "Salary": { expense: 0, income: 50000 } }
  // Result format look: { "Transportation": 80, "Food": 450 }


  const nextDay = () => {
    const next = new Date(date);
    next.setDate(date.getDate() + 1); // Safely adds 1 day
    setDate(next);
    setSelectedCategory(null);

  }
  const prevDay = () => {
    const prev = new Date(date);
    prev.setDate(date.getDate() - 1); // Safely subtracts 1 day
    setDate(prev);
    setSelectedCategory(null);
  }

  const toggleBackBtn = () => {
    setSetBackbtn(true);
    setSelectedCategory(null);
  }

  const lastInputMsg = messages[messages.length - 2];
  return (
    <>
      <table className={`text-sm table-fixed border-separate border-spacing-y-1 ${width ? "w-[50%]" : "w-[50%]"}`}>
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

            </td>
          </tr>

          {selectedCategory ? (
            <tr className="bg-slate-50">
              <td colSpan={2} className="p-4 text-slate-700">
                <div className="text-xs font-mono text-slate-400 mb-2 text-center">
                  ----- {currentYearNum}-{String(currentMonthNum).padStart(2, '0')}-{String(currentDayNum).padStart(2, '0')} -----
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-sm">
                  {todayExpensesData
                    .filter((item) => item.record.category === selectedCategory)
                    .map((item) => {
                      const isIncome = Number(item.record.expense || 0) === 0;
                      const amount = isIncome ? `+${item.record.income}` : `-${item.record.expense}`;
                      const colorClass = isIncome ? "text-emerald-600" : "text-rose-600";
                      return (
                        <li key={item.record.id} className="font-mono flex justify-between items-center py-0.5 border-b border-dashed border-slate-200 last:border-0">
                          <span className="text-slate-600">{item.record.reason || "No description"}</span>
                          <span className={`${colorClass} font-semibold`}>{amount}</span>
                        </li>
                      );
                    })}
                </ul>
              </td>
            </tr>
          ) : (
            // FIXED: Wrapped the evaluation statement inside a React Fragment to resolve the layout error
            backToToday &&
            Object.entries(categoryTotals).map(([categoryName, totals], index) => (
              <tr key={categoryName || index} onClick={() => setSelectedCategory(categoryName)} className="border-b border-slate-100 hover:bg-slate-200 transition-colors text-slate-800 bg-slate-100 cursor-pointer">
                {/* Category Name Column */}
                <td className="p-4 text-slate-700 font-medium">
                  {categoryName}
                </td>

                {/* Totals Summary Column */}
                <td className="p-4 text-right space-y-1">
                  {totals.income > 0 && (
                    <div className="text-emerald-600 font-semibold">
                      +{totals.income}
                    </div>
                  )}
                  {totals.expense > 0 && (
                    <div className="text-rose-600 font-semibold">
                      -{totals.expense}
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}



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
            <td onClick={() => {
              if (selectedCategory) {
                // If a transaction category list is open, close it first
                setSelectedCategory(null);
              } else {
                // Otherwise, reset the dashboard calendar view back to today
                setDate(new Date());
                
                setSelectedCategory(null);
              }
            }}
              colSpan={2}
              className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg"
            >
              {selectedCategory ? "Back to Categories" : "Back to Today"}
            </td>
          </tr>
          <tr className="text-[10px] text-right mr-2 mb-3 opacity-50">
            <td colSpan={2} > {time}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default MenuMessage;