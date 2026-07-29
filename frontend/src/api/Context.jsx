import React, { createContext, useEffect, useRef, useState } from "react";
import DefaultMessage from "../component/menu/DefaultMessage";
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
  const [loading, setLoading] = useState(true);
  const [showExpenseAgents, setShowExpenseAgents] = useState(false);
  const endRef = useRef(null);


  const scrollToBottom = () => {
    const scroll = () => {
      console.log("hello")
      if (endRef.current) {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    setTimeout(() => {
      scroll()
      console.log("timeout")
    }, 10);

  };

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
    loading,
    showExpenseAgents,
    setShowExpenseAgents,
    endRef,
    scrollToBottom,
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
