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

  const { start, messages, setIsAuthenticated, setAllMessagesBatch, handleMessages, setMessages } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  let count = 0;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // 1. Await your API call to resolve the promise safely
        const records = await RecordService.getRecords();
        if (records && records.length > 0) {
          setAllMessagesBatch(records);
         // FIXED 5: Force start to true so the Chatting feed block mounts instantly
        }
        // 2. Process your records cleanly


      } catch (error) {
        console.error("Failed to load records on initial mount:", error.message);
      } finally {
        // FIXED 1: Turn off the loading shield only after the entire array loop finishes processing
        setLoading(false);

      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchRecords();
    } else {
      // FIXED 2: If there is no token, turn off loading immediately so the login view can render
      setLoading(false);
    }
  }, []);


  if (loading)
    return <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-emerald-50">
      <div className="space-y-4 text-center animate-pulse">
        {/* Animated Spinner Icon Element */}
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Syncing account database...
        </p>
      </div>
    </div>




  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50"
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