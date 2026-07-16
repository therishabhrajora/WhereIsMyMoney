import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./api/Context";

import DefaultMessage from "./component/DefaultMessage";
import MessageSender from "./component/MessageSender";
import Chatting from "./component/Chatting";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const user = localStorage.getItem("user");

  const { start } = useContext(GlobalContext);


  return (
    <div
      className="
        relative
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-emerald-50
      "
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
              <Chatting />

              <MessageSender />

            </>

          )}

        </div>

      )}

    </div>
  );
}

export default App;