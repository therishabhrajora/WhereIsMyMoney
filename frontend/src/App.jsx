import { useContext, useState } from "react";
import "./App.css";
import { Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutel from "./component/PrivateRoute";
import DefaultMessage from "./component/DefaultMessage";
import MessageSender from "./component/MessageSender";
import StartMessage from "./component/StartMessage";
import Record from "./component/Record";
import { GlobalContext } from "./api/Context";
import Chatting from "./component/Chatting";

function App() {
  const user = localStorage.getItem("user");
  const { start,expenses } = useContext(GlobalContext);
  return (
    <div className="relative">
      {user ? (
        <PrivateRoute />
      ) : (
        <div>
          <DefaultMessage />
          {start && (
            <>
              <MessageSender /> 
              <Chatting />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
