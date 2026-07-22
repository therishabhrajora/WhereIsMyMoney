import "./App.css";
import { useContext, useEffect, useState } from "react";

import DefaultMessage from "./component/menu/DefaultMessage";
import MessageSender from "./component/forms/MessageSender";

import Chatting from "./component/pages/Chatting";
import PrivateRoute from "./component/pages/PrivateRoute";
import { GlobalContext } from "./api/Context";
import ChatWindow from "./component/pages/ChatWindow";
import { Route, Router, Routes } from "react-router-dom";
import ResetPassword from "./component/auth/ResetPassword";


function App() {
  if (window.location.pathname === "/reset-password") {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token") || "";
    return <ResetPassword token={token} />;
  }

  // 2. Default workspace core context properties
  const user = localStorage.getItem("user");
  const { start, loading, messages } = useContext(GlobalContext);




  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50"
    >
      {user ? (
        <PrivateRoute />

      ) : (
        <div
          className="
            animate-in
            fade-in
            duration-500
          "
        >
          <DefaultMessage />

          {start && (
            <>
              <Chatting messages={messages} />
              <MessageSender />
              <ChatWindow />
            </>
          )}
        </div>
      )}
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
