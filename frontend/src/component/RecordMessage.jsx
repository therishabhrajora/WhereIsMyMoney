import { useEffect, useState } from "react";
import MenuMessage from "./MenuMessage";
import StatisticsMessage from "./StatisticsMessage";

const RecordMessage = (props) => {
  const {
    categoryExpenses,
    monthExpenses,
    todayExpenses,
    msgIndex,
    lastExpense,
  } = props;

  const [targetIndex, setTargetIndex] = useState(-1);
  const [todayExpenseOpen, setTodayExpenseOpen] = useState(false);
  const [staticsOpen, setStaticsOpen] = useState(false);

  const todayClick = (index) => {
    setTargetIndex(index);
    setTodayExpenseOpen(!todayExpenseOpen);
  };
  const staticsClick = (index) => {
    setTargetIndex(index);
    setStaticsOpen(!staticsOpen);
  };
  useEffect(()=>{
    renderMsg();
  },[todayExpenseOpen,staticsOpen])

  const renderMsg = () => {
    if (todayExpenseOpen) {
      return <MenuMessage
        todayExpenses={todayExpenses}
        monthExpenses={monthExpenses}
      />;
    } else if (staticsOpen) {
      return <StatisticsMessage currentMo/>
    } else {
      return (
        <table className="w-full text-sm table-fixed border-separate border-spacing-y-1">
          <tbody>
            <tr className="bg-white">
              <td colSpan={2} className="p-4 text-slate-700 rounded-t-2xl">
                <div className="space-y-1 pb-3">
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                    Saved
                  </p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">
                    {lastExpense.income === 0 && (
                      <span className="font-semibold">
                        {lastExpense.expense}.0
                      </span>
                    )}
                    {lastExpense.expense === 0 && (
                      <span className="font-semibold">
                        {lastExpense.income}.0
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    comment:{" "}
                    <span className="italic text-slate-700">
                      {lastExpense.reason}
                    </span>
                  </p>
                </div>
                <div className="pt-3 space-y-1">
                  <div className="text-slate-300 font-mono text-xs pb-1">
                    -----
                  </div>
                  <p className="text-slate-600">
                    this month:{" "}
                    <span className="font-semibold text-slate-900">
                      {monthExpenses}
                    </span>{" "}
                  </p>
                  <p className="text-slate-600">
                    today:{" "}
                    <span className="font-semibold text-slate-900">
                      {todayExpenses}
                    </span>
                  </p>
                  <p className="text-slate-600">
                    In the category{" "}
                    <span className="font-semibold text-slate-900">
                      {lastExpense.reason}
                    </span>
                    :{" "}
                    <span className="text-slate-400 text-xs">
                      {categoryExpenses}
                    </span>
                  </p>
                </div>
              </td>
            </tr>
            {/* Fixed backdrop filter structure for rows */}
            <tr className="font-semibold text-center text-slate-800 bg-slate-100">
              <td
                onClick={() => todayClick(msgIndex)}
                className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg"
              >
                Today
              </td>
              <td
                onClick={() => staticsClick(msgIndex)}
                className="py-2.5 px-4 cursor-pointer hover:bg-slate-200 transition-colors border-l border-slate-300 rounded-r-lg"
              >
                Statistics
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
      );
    }
  };
  return renderMsg();
};

export default RecordMessage;
