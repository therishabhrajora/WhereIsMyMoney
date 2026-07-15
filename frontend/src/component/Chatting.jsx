import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../api/Context";
import StartMessage from "./StartMessage";
import Introduction from "./Introduction";
import Record from "./Record";
import MenuMessage from "./MenuMessage";

const Chatting = () => {
  const { messages, inputMessages } = useContext(GlobalContext);
  const messagesEndRef = useRef(null);
 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentDate = new Date();
  const currentTime = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl pb-16">
        {messages.map((message, index) => {
          const formattedTime = `${currentTime < 10 ? `0${currentTime}` : currentTime}:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}`;
        
          switch (message?.type) {
            case "user":
              return (
                <div key={index} className="flex w-full justify-end mb-2 animate-in fade-in slide-in-from-bottom-1">
                  <div className="max-w-[75%] rounded-2xl rounded-br-none bg-emerald-600 pl-4 pr-2 py-1 text-sm font-medium text-white shadow-sm">
                    {message.text}
                    <p className="text-[10px] text-right opacity-50">{formattedTime}</p>
                  </div>
                </div>
              );

            case "record":
              return <Record key={index} time={formattedTime} record={message} isMenu={message.type === "menu"} msgIndex={index} />;

            case "introduction":
              return <Introduction key={index} time={formattedTime} />;

            case "menu":
              return <MenuMessage key={index} time={formattedTime}/>;

            case "startMessage":
              return <StartMessage key={index} time={formattedTime}/>;

            default:
              return null;
          }
        })}


        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chatting;