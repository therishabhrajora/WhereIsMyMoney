import React, { createContext, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";
import Data from "./Data"

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState(Data.data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [todayExpenseOpen, setTodayExpenseOpen] = useState(false);
  const [staticsOpen, setStaticsOpen] = useState(false);

  const handleMessages = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateTodayExpenseOpen = () => {
    setTodayExpenseOpen(!todayExpenseOpen);
  }
  const updateStaticsOpen = () => {
    setStaticsOpen(!staticsOpen);
  }



  // Consolidate values inside a single data container package object
  const valuePackage = {
    start,
    setStart,
    command,
    setCommand,
    messages,
    setMessages,
    handleMessages,
    isMenuOpen,
    setIsMenuOpen,
    todayExpenseOpen,
    updateTodayExpenseOpen,
    staticsOpen,
    updateStaticsOpen
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
