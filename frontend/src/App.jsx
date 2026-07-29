import "./App.css";
import { useContext, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultMessage from "./component/menu/DefaultMessage";
import MessageSender from "./component/forms/MessageSender";
import Chatting from "./component/pages/Chatting";
import PrivateRoute from "./component/pages/PrivateRoute";
import ChatWindow from "./component/pages/ChatWindow";
import ResetPassword from "./component/auth/ResetPassword";
import { GlobalContext } from "./api/Context";
import ExpenseAgentsModal from "./component/pages/ExpenseAgentsModal";

function ResetPasswordWrapper() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  return <ResetPassword token={token} />;
}

function App() {
  const user = localStorage.getItem("user");

  // 1. CRITICAL FIX: Destructure 'setShowExpenseAgents' so you can actually update the state!
  const { start, messages, showExpenseAgents, setShowExpenseAgents } = useContext(GlobalContext);





  return (
    <div className="relative min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50">

      {/* 2. OPTIMIZATION: Render the modal globally if it can be accessed anywhere */}


      <Routes>
        {/* Core Root Location Handler */}
        <Route
          path="/"
          element={
            user ? (
              <PrivateRoute />
            ) : (
              <div className="animate-in fade-in duration-500">

                {showExpenseAgents && typeof setShowExpenseAgents === "function" ? (
                  <ExpenseAgentsModal onClose={() => setShowExpenseAgents(false)} />
                ) :
                  <>
                    <DefaultMessage />
                    {
                      start && (
                        <>
                          <Chatting messages={messages} />
                          <MessageSender />
                          <ChatWindow />
                        </>
                      )
                    }
                  </>}
              </div>
            )
          }
        />

        {/* Secure Reset Password Location Hook */}
        <Route path="/reset-password" element={<ResetPasswordWrapper />} />

        {/* Fallback Route */}
        <Route path="* " element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}

export default App;
