import React, { createContext, useEffect, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";
import Data from "./Data"
import apiClient, { RecordService, UserMessageService } from "./apiClient";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([]);
  const [records, setRecords] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [todayExpenseOpen, setTodayExpenseOpen] = useState(-1);
  const [staticsOpen, setStaticsOpen] = useState(-1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const setAllMessagesBatch = (recordsArray) => {
    const formatted = recordsArray.map(r => ({
      type: "record", // Crucial for your switch-case render routing paths
      record: r,
      id: r.id
    }));
    setMessages(formatted);
  };
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
    updateStaticsOpen,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    setAllMessagesBatch
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
