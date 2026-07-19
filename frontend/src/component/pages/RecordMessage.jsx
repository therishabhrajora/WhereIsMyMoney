import { useContext } from "react";
import MenuMessage from "../menu/MenuMessage";
import StatisticsMessage from "../menu/StatisticsMessage";
import { GlobalContext } from "../../api/Context";

const RecordMessage = (props) => {
  const {
    categoryExpenses,
    monthExpenses,
    todayExpenses,
    msgIndex,
    lastExpense,
  } = props;

  const {
    updateTodayExpenseOpen,
    todayExpenseOpen,
    staticsOpen,
    updateStaticsOpen,
  } = useContext(GlobalContext);

  const isTodayOpen = todayExpenseOpen === msgIndex;
  const isStaticsOpen = staticsOpen === msgIndex;

  const todayClick = (index) => {
    updateTodayExpenseOpen(index);
  };

  const staticsClick = (index) => {
    updateStaticsOpen(index);
  };

  const closeAll = () => {
    updateTodayExpenseOpen(-1);
    updateStaticsOpen(-1);
  };

  const renderMsg = () => {
    if (isTodayOpen) {
      return <MenuMessage />;
    }

    if (isStaticsOpen) {
      return <StatisticsMessage msgIndex={msgIndex} />;
    }

    return (
      <div
        className="
          animate-in
          fade-in
          slide-in-from-bottom-3
          duration-500
        "
      >
        <div
          className="
            overflow-hidden
            rounded-3xl
            backdrop-blur-xl
          "
        >
          {/* Header */}

          <div
            className="
              bg-gradient-to-r
              from-emerald-500
              to-teal-600
              p-5
              text-white
            "
          >
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/80
              "
            >
              Saved
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl font-extrabold">
                {lastExpense.income === 0 && (
                  <>-{lastExpense.expense}</>
                )}

                {lastExpense.expense === 0 && (
                  <>+{lastExpense.income}</>
                )}
              </span>
            </div>

            <p className="mt-2 text-sm text-white/80">
              {lastExpense.reason || "No comment"}
            </p>
          </div>

          {/* Statistics */}

          <div className="space-y-4 p-5">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Overview
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">This month</span>

                  <span className="font-bold text-slate-900">
                    {monthExpenses}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Today</span>

                  <span className="font-bold text-slate-900">
                    {todayExpenses}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    In Category <span className="font-bold">{lastExpense.category}</span>
                  </span>

                  <span className="font-bold text-emerald-600">
                    {categoryExpenses}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => todayClick(msgIndex)}
                className="
                  rounded-2xl
                  bg-slate-100
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-emerald-50
                  hover:text-emerald-700
                  hover:shadow-md
                  active:scale-95
                "
              >
                📅 Today
              </button>

              <button
                onClick={() => staticsClick(msgIndex)}
                className="
                  rounded-2xl
                  bg-slate-100
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-50
                  hover:text-blue-700
                  hover:shadow-md
                  active:scale-95
                "
              >
                📊 Statistics
              </button>
            </div>

            <button
              onClick={closeAll}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                py-3
                text-sm
                font-semibold
                text-slate-600
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-slate-100
                hover:shadow-md
                active:scale-95
              "
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  return renderMsg();
};

export default RecordMessage;
