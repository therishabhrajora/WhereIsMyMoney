import React, { createContext, useEffect, useState } from "react";
import DefaultMessage from "../component/menu/DefaultMessage";
import Data from "./Data"
import apiClient, { RecordService, UserMessageService } from "./apiClient";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState(Data.data);
  const [records, setRecords] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [todayExpenseOpen, setTodayExpenseOpen] = useState(-1);
  const [staticsOpen, setStaticsOpen] = useState(-1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleMessages = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateTodayExpenseOpen = (index) => {
    setTodayExpenseOpen((prev) => (prev === index ? -1 : index));
  };
  const updateStaticsOpen = (index) => {
    setStaticsOpen((prev) => (prev === index ? -1 : index));
  };

  

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
    updateStaticsOpen,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    setLoading,
    loading
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
