import "./App.css";
import { useContext, useEffect, useState } from "react";

import DefaultMessage from "./component/menu/DefaultMessage";
import MessageSender from "./component/forms/MessageSender";

import Chatting from "./component/pages/Chatting";
import PrivateRoute from "./component/pages/PrivateRoute";
import { GlobalContext } from "./api/Context";


function App() {
  const user = localStorage.getItem("user");

  const { start, loading,messages } = useContext(GlobalContext);
  
 

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50"
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
