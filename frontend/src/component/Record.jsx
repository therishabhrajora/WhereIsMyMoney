import { useContext, useState } from "react";
import { GlobalContext } from "../api/Context";
import MenuMessage from "./MenuMessage";
import RecordMessage from "./RecordMessage";

const Record = ({ record, msgIndex }) => {
  const { expenses, inputMessages, messages } = useContext(GlobalContext);

  // Prevents crashing if arrays are completely empty
  const menuMsg = inputMessages[inputMessages.length - 1] === "/menu";
  const lastExpense = record || { income: 0, expense: 0, reason: "None" };
  // 1. Get the current date parameters dynamically
  const currentDate = new Date();
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
    <div className="w-full max-w-sm rounded-2xl flex flex-col gap-1 shadow-sm overflow-hidden animate-in fade-in duration-200 bg-transparent">
      {menuMsg ? (
        <MenuMessage
          monthExpenses={monthExpenses}
          todayExpenses={todayExpenses}
        />
      ) : (
        <RecordMessage
          monthExpenses={monthExpenses}
          todayExpenses={todayExpenses}
          categoryExpenses={categoryExpenses}
          lastExpense={lastExpense}
          msgIndex={msgIndex}
        />
      )}
    </div>
  );
};

export default Record;
