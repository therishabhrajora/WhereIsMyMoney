import React, { createContext, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";
import data from "./Data";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessages, setInputMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expenses, setExpenses] = useState(data);

  const handleChat = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };
  const handleInputMessages = (newMessage) => {
    setInputMessages((prev) => [...prev, newMessage]);
  };
  const handleExpenses = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  }

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
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
