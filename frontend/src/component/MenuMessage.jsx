import { useContext, useState } from "react";
import { GlobalContext } from "../api/Context";

const MenuMessage = ({ time }) => {
  const { messages, updateTodayExpenseOpen } = useContext(GlobalContext);

  const currentDate = new Date();

  const [date, setDate] = useState(currentDate);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const currentDayNum = date.getDate();
  const currentMonthNum = date.getMonth() + 1;
  const currentYearNum = date.getFullYear();

  const todayExpensesData = messages
    .filter((item) => item.type === "record")
    .filter(
      (item) =>
        Number(item.date) === currentDayNum &&
        Number(item.month) === currentMonthNum &&
        Number(item.year) === currentYearNum,
    );

  const todayExpenses = todayExpensesData.reduce((sum, item) => {
    const expenseValue = Number(item.expense || 0);
    const incomeValue = Number(item.income || 0);

    return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
  }, 0);

  const categoryTotals = todayExpensesData.reduce((acc, item) => {
    const cat = item.category;
    const expenseValue = Number(item.expense || 0);
    const incomeValue = Number(item.income || 0);

    if (!acc[cat]) {
      acc[cat] = {
        expense: 0,
        income: 0,
      };
    }

    acc[cat].expense += expenseValue;
    acc[cat].income += incomeValue;

    return acc;
  }, {});

  const nextDay = () => {
    const next = new Date(date);
    next.setDate(date.getDate() + 1);

    setDate(next);
    setSelectedCategory(null);
  };

  const prevDay = () => {
    const prev = new Date(date);
    prev.setDate(date.getDate() - 1);

    setDate(prev);
    setSelectedCategory(null);
  };

  return (
    <>
      <style>{`
        @keyframes cardIn{
          from{
            opacity:0;
            transform:translateY(20px) scale(.98);
          }
          to{
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        .dashboard-card{
          animation:cardIn .4s ease;
        }
      `}</style>

      <div
        className="dashboard-card overflow-hidden rounded-3xl my-4 border border-slate-200 shadow-md hover:shadow-lg"
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4  text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Expense Summary</p>

              <h2 className="mt-1 text-2xl font-bold">
                {currentDayNum}-{currentMonthNum}-{currentYearNum}
              </h2>
            </div>

            <div className="rounded-2xl bg-white/20 px-4 py-2 backdrop-blur">
              <p className="text-xs uppercase tracking-widest">Balance</p>

              <p
                className={`mt-1 text-2xl font-bold ${
                  todayExpenses >= 0 ? "text-green-100" : "text-red-100"
                }`}
              >
                {todayExpenses >= 0 ? `+${todayExpenses}` : todayExpenses}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {selectedCategory ? (
            <div>
              <div className="mb-5 text-center font-mono text-xs text-slate-400">
                {currentYearNum}-{String(currentMonthNum).padStart(2, "0")}-
                {String(currentDayNum).padStart(2, "0")}
              </div>

              <div className="space-y-3">
                {todayExpensesData
                  .filter((item) => item.category === selectedCategory)
                  .map((item) => {
                    const isIncome = Number(item.expense || 0) === 0;

                    const amount = isIncome
                      ? `+${item.income}`
                      : `-${item.expense}`;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:shadow-md"
                      >
                        <div>
                          <p className="font-medium text-slate-800">
                            {item.reason || "No description"}
                          </p>

                          <p className="text-xs text-slate-400">
                            {selectedCategory}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            isIncome
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
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
            <div className="space-y-3">
              {Object.entries(categoryTotals).map(
                ([categoryName, totals], index) => (
                  <div
                    key={categoryName || index}
                    onClick={() => setSelectedCategory(categoryName)}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {categoryName}
                      </h3>

                      <p className="text-xs text-slate-400">
                        Tap to view transactions
                      </p>
                    </div>

                    <div className="text-right">
                      {totals.income > 0 && (
                        <div className="font-semibold text-emerald-600">
                          +{totals.income}
                        </div>
                      )}

                      {totals.expense > 0 && (
                        <div className="font-semibold text-red-500">
                          -{totals.expense}
                        </div>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
          {/* Navigation */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={prevDay}
              className="
                rounded-2xl
                bg-slate-100
                px-5
                py-3
                font-semibold
                text-slate-700
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-slate-200
                hover:shadow-md
                active:scale-95
              "
            >
              ← Previous Day
            </button>

            <button
              onClick={nextDay}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                to-teal-600
                px-5
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                active:scale-95
              "
            >
              Next Day →
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => {
              if (selectedCategory) {
                setSelectedCategory(null);
              } else {
                updateTodayExpenseOpen();
              }
            }}
            className="
              mt-4
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              font-medium
              text-slate-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            {selectedCategory ? "← Back to Categories" : "🏠 Back to Today"}
          </button>

          {/* Time */}
          <div className=" border-t border-slate-100 ">
            <p className="text-right text-[11px] tracking-wide text-slate-400">
              {time}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMessage;
