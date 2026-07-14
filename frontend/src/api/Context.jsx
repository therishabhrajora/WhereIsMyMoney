import React, { createContext, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";
import Data from "./Data"

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [historicalExpenses, setHistoricalExpenses] = useState([]);
  const [messages, setMessages] = useState(Data.data);
  const [inputMessages, setInputMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expenses, setExpenses] = useState(Data.data);
  const [lastExpense, setLastExpenses] = useState({});

  const handleChat = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };
  const handleInputMessages = (newMessage) => {
    setInputMessages((prev) => [...prev, newMessage]);
  };
  const handleExpenses = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const currentDate = new Date();
  const currentDayNum = currentDate.getDate();
  const currentMonthNum = currentDate.getMonth() + 1; // JS months are 0-11
  const currentYearNum = currentDate.getFullYear();
  const historicData = (msgIndex) => {
    setHistoricalExpenses(messages.slice(0, msgIndex + 1));
  }
  const setLastExpense = (record) => {
    setLastExpenses(record || { income: 0, expense: 0, reason: "None" });
  }

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

  // Consolidate values inside a single data container package object
  const valuePackage = {
    start,
    setStart,
    command,
    setCommand,
    messages,
    setMessages,
    handleChat,
    inputMessages,
    setInputMessages,
    handleInputMessages,
    isMenuOpen,
    setIsMenuOpen,
    expenses,
    setExpenses,
    handleExpenses,
    todayExpenses,
    monthExpenses,
    yearExpenses,
    categoryExpenses,
    historicData,
    lastExpense,
    setLastExpense,
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
