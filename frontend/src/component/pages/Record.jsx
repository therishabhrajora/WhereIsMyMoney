import { useContext } from "react";
import { GlobalContext } from "../../api/Context";
import MenuMessage from "../menu/MenuMessage";
import RecordMessage from "./RecordMessage";

const Record = ({ record, msgIndex, isMenu, time }) => {
  const { messages } = useContext(GlobalContext);

  const lastExpense = record || {
    income: 0,
    expense: 0,
    reason: "None",
  };

  

  const currentDate = new Date();

  const currentDayNum = currentDate.getDate();
  const currentMonthNum = currentDate.getMonth() + 1;
  const currentYearNum = currentDate.getFullYear();

  const historicalExpenses = messages
    .filter((item) => item.type === "record")
    .slice(0, msgIndex + 1);


  const calculateTotal = (data) =>
    data.reduce((sum, item) => {
      const expenseValue = Number(item.expense || 0);
      const incomeValue = Number(item.income || 0);

      return expenseValue === 0
        ? sum + incomeValue
        : sum - expenseValue;
    }, 0);


  const todayExpenses = calculateTotal(
    historicalExpenses.filter(
      (item) =>
        Number(item.date) === currentDayNum &&
        Number(item.month) === currentMonthNum &&
        Number(item.year) === currentYearNum
    )
  );


  const monthExpenses = calculateTotal(
    historicalExpenses.filter(
      (item) =>
        Number(item.month) === currentMonthNum &&
        Number(item.year) === currentYearNum
    )
  );


  const yearExpenses = calculateTotal(
    historicalExpenses.filter(
      (item) =>
        Number(item.year) === currentYearNum
    )
  );


  const categoryExpenses = calculateTotal(
    historicalExpenses.filter(
      (item) =>
        item.category === lastExpense.category
    )
  );


  return (
    <div
      className="
        group
        mb-5
        w-[75%]
        max-w-md
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/70
        bg-white/80
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-2xl
        animate-in
        fade-in
        slide-in-from-bottom-4
      "
    >

      {/* Top Gradient Line */}
      <div className="h-1 w-full " />


      <div>

        {isMenu ? (
          <div className="animate-in fade-in duration-300">
            <MenuMessage
              monthExpenses={monthExpenses}
              todayExpenses={todayExpenses}
              width={true}
            />
          </div>
        ) : (

          <div className="animate-in fade-in duration-300">

            <RecordMessage
              monthExpenses={monthExpenses}
              todayExpenses={todayExpenses}
              categoryExpenses={categoryExpenses}
              lastExpense={lastExpense}
              msgIndex={msgIndex}
            />

            <div className="border-t border-slate-100 p-4">
              <p
                className="
                  text-right
                  text-[11px]
                  tracking-wide
                  text-slate-400
                "
              >
                {time}
              </p>
            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Record;