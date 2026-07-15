import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../api/Context";
import MenuMessage from "./MenuMessage";
import RecordMessage from "./RecordMessage";

const Record = ({ record, msgIndex }) => {
  const {
    inputMessages,
    messages,
  } = useContext(GlobalContext);

  // Prevents crashing if arrays are completely empty
  const menuMsg = inputMessages[inputMessages.length - 1] === "/menu";
  const lastExpense = record || { income: 0, expense: 0, reason: "None" }

  // 1. Get the current date parameters dynamically
  const currentDate = new Date();
  const currentTime = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentDayNum = currentDate.getDate();
  const currentMonthNum = currentDate.getMonth() + 1; // JS months are 0-11
  const currentYearNum = currentDate.getFullYear();
  const historicalExpenses = messages.slice(0, msgIndex + 1);

  const todayExpenses = historicalExpenses
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

  const monthExpenses = historicalExpenses
    .filter(
      (item) =>
        Number(item.month) === currentMonthNum &&
        Number(item.year) === currentYearNum,
    )
    .reduce((sum, item) => {
      const expenseValue = Number(item.expense || 0);
      const incomeValue = Number(item.income || 0);

      return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
    }, 0);

  const yearExpenses = historicalExpenses
    .filter((item) => Number(item.year) === currentYearNum)
    .reduce((sum, item) => {
      const expenseValue = Number(item.expense || 0);
      const incomeValue = Number(item.income || 0);

      return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
    }, 0);

  // 3. Optional: Category-specific calculation matching your last entry
  const categoryExpenses = historicalExpenses
    .filter((item) => item.category === lastExpense.category)
    .reduce((sum, item) => {
      const expenseValue = Number(item.expense || 0);
      const incomeValue = Number(item.income || 0);

      return expenseValue === 0 ? sum + incomeValue : sum - expenseValue;
    }, 0);

  return (
    <div className="w-[75%] mb-4 max-w-sm rounded-2xl flex flex-col space-y-4 border-stone-200 shadow-sm border-b border-r border-l overflow-hidden animate-in fade-in duration-200 bg-transparent">
      {menuMsg ? (
        <>
          <MenuMessage
            monthExpenses={monthExpenses}
            todayExpenses={todayExpenses}
          />
          <p className="text-[10px] text-right mr-2 mb-3 opacity-50">{currentTime<10 ? <span>0{currentTime}</span>:currentTime}:{currentTime<10 ? <span>0{currentTime}</span>:currentTime}</p>
        </>

      ) : (
        <>
          <RecordMessage
            monthExpenses={monthExpenses}
            todayExpenses={todayExpenses}
            categoryExpenses={categoryExpenses}
            lastExpense={lastExpense}
            msgIndex={msgIndex}
          />
          <p className="text-[10px] text-right mr-2 mb-3 opacity-50">{currentTime<10 ? <span>0{currentTime}</span>:currentTime}:{currentTime<10 ? <span>0{currentTime}</span>:currentTime}</p>
        </>
      )}
    </div>
  );
};

export default Record;
