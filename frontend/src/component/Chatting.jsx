import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../api/Context";

const Chatting = () => {
  const { messages, inputMessages } = useContext(GlobalContext);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="mx-auto max-w-2xl mb-16">
      {messages.map((message, index) => {
        if (inputMessages.includes(message)) {
          return (
            <div
              key={index}
              className="flex w-full justify-end mb-2 animate-in fade-in slide-in-from-bottom-1 "
            >
              <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
                {message}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="flex w-full justify-start mb-2 animate-in fade-in slide-in-from-bottom-1"
            >
              <div className="max-w-[75%] rounded-2xl rounded-tl-none px-4 py-2 text-sm font-medium text-slate-100 ">
                {message}
              </div>
            </div>
          );
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chatting;
