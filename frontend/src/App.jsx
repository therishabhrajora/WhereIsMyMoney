import "./App.css";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./api/Context";

import DefaultMessage from "./component/DefaultMessage";
import MessageSender from "./component/MessageSender";
import Chatting from "./component/Chatting";
import PrivateRoute from "./component/PrivateRoute";
import { RecordService } from "./api/apiClient";

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
