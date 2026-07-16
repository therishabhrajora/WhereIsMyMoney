import React, { createContext, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";
import Data from "./Data"

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [todayExpenseOpen, setTodayExpenseOpen] = useState(-1);
  const [staticsOpen, setStaticsOpen] = useState(-1);

  const handleMessages = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateTodayExpenseOpen = (index) => {
    setTodayExpenseOpen(prev => prev === index ? -1 : index);
  }
  const updateStaticsOpen = (index) => {
    setStaticsOpen(prev => prev === index ? -1 : index);
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
