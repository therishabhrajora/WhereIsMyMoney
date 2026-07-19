import { useContext, useState } from "react";
import Data from "../../api/Data";
import { GlobalContext } from "../../api/Context";

const StatisticsMessage = ({ msgIndex }) => {
  const { monthNames } = Data;
  const { messages, updateStaticsOpen } = useContext(GlobalContext);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(null);

  const historicalExpenses = messages
    .filter((item) => item.type === "record")
    .slice(0, msgIndex + 1);

  const currentMonthNum = selectedDate.getMonth() + 1;
  const currentYearNum = selectedDate.getFullYear();

  const nextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(next);
    setSelectedCategory(null); // Clear selected category when changing months
  };

  const prevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(prev);
    setSelectedCategory(null); // Clear selected category when changing months
  };

  const monthExpenses = historicalExpenses.filter(
    (item) =>
      Number(item.month) === currentMonthNum &&
      Number(item.year) === currentYearNum
  );

  const netBalance = monthExpenses.reduce((sum, item) => {
    const expenseValue = Number(item.expense || 0);
    const incomeValue = Number(item.income || 0);
    return sum + incomeValue - expenseValue;
  }, 0);

  const categoryTotals = monthExpenses.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    const expenseValue = Number(item.expense || 0);
    const incomeValue = Number(item.income || 0);

    if (!acc[cat]) {
      acc[cat] = { expense: 0, income: 0 };
    }

    acc[cat].expense += expenseValue;
    acc[cat].income += incomeValue;

    return acc;
  }, {});

  const closeAll = () => {
    updateStaticsOpen(-1);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-semibold">
            Statistics
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold">          
              {monthNames[currentMonthNum]} {currentYearNum}
            </h2>x  
          </div>

          <div className="mt-4 rounded-2xl bg-white/20 p-3 backdrop-blur">
            <p className="text-xs text-white/80">Total Balance</p>
            <p className="text-2xl font-bold">₹{netBalance}</p>
          </div>
        </div>

        {/* Statistics Content Section */}
        <div className="p-5">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              {selectedCategory ? `${selectedCategory} Breakdown` : "Monthly statistics overview"}
            </p>

            <div className="mt-2 flex flex-col gap-2">
              {selectedCategory ? (
                <div>
                  {/* FIX 1: Added a button to clear the selected category and go back */}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mb-3 text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    ← Back to Categories
                  </button>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {/* FIX 2: Used monthExpenses instead of undefined todayExpensesData */}
                    {monthExpenses
                      .filter((item) => item.category === selectedCategory)
                      .map((item) => {
                      
                        const isIncome = Number(item.expense || 0) === 0;
                        const amount = isIncome
                          ? `+₹${item.income}`
                          : `-₹${item.expense}`;

                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                          >
                            {/* <div>
                              <p className="text-[10px] text-slate-400">
                                
                                {item.date}/{item.month}/{item.year}
                              </p>
                            </div> */}
                            <div className="text-left">
                              <p className="text-sm font-semibold text-slate-800">
                                {item.reason || "No description"}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                
                                Date: {item.date}/{item.month}/{item.year}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${isIncome
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-red-50 text-red-600 border border-red-200"
                                }`}
                            >
                              {amount}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                Object.entries(categoryTotals).map(([categoryName, totals], index) => (
                  <div
                    key={categoryName || index}
                    onClick={() => setSelectedCategory(categoryName)}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800 text-left">
                        {categoryName}
                      </h3>
                      <p className="text-[10px] text-slate-400 text-left">
                        Tap to view transactions
                      </p>
                    </div>

                    <div className="text-right text-sm">
                      {totals.income > 0 && (
                        <div className="font-bold text-emerald-600">
                          +₹{totals.income}
                        </div>
                      )}
                      {totals.expense > 0 && (
                        <div className="font-bold text-red-500">
                          -₹{totals.expense}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Show empty state text if month has no records */}
              {Object.keys(categoryTotals).length === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">No records found for this period.</p>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={prevMonth}
              className="rounded-2xl bg-slate-100 py-3 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md active:scale-95"
            >
              ← Previous
            </button>

            <button
              onClick={nextMonth}
              className="rounded-2xl bg-slate-100 py-3 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md active:scale-95"
            >
              Next →
            </button>
          </div>

          <button
            onClick={closeAll}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white py-3 font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-md active:scale-95"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default StatisticsMessage;
