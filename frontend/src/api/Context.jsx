import React, { createContext, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";

// 1. Initialize the global context channel
export const GlobalContext = createContext(null);

// 2. Create the wrapper component provider layer
export const GlobalProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessages, setInputMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expenses, setExpenses] = useState({
    id:Date.now(),
    expense:0,
    income:0,
    category:"",
    reason:"",
    hastags:"",
  });

  const handleChat = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };
  const handleInputMessages = (newMessage) => {
    setInputMessages((prev) => [...prev, newMessage]);
  };

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
    setExpenses
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
