import React, { createContext, useState } from "react";
import DefaultMessage from "../component/DefaultMessage";
import Data from "./Data"

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState(Data.data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMessages = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
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
  };

  return (
    <GlobalContext.Provider value={valuePackage}>
      {children}
    </GlobalContext.Provider>
  );
};
