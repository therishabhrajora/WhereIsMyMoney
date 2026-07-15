import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../api/Context";
import StartMessage from "./StartMessage";
import Introduction from "./Introduction";
import Record from "./Record";

const Chatting = () => {
  const { messages, inputMessages } = useContext(GlobalContext);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(messages);
  const currentDate = new Date();
  const currentTime = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl pb-16 ">
        {messages.map((message, index) => {
          console.log(message);
          if (inputMessages.includes(message)) {
            return (
              <div
                key={index}
                className="flex w-full  justify-end  mb-2  animate-in fade-in slide-in-from-bottom-1 "
              >
                <div className="max-w-[75%] rounded-2xl rounded-br-none bg-emerald-600 pl-4 pr-2  py-1 text-sm font-medium text-white shadow-sm">
                  {message}
                  <p className="text-[10px] text-right  opacity-50">{currentTime<10 ? <span>0{currentTime}</span>:currentTime}:{currentTime<10 ? <span>0{currentTime}</span>:currentTime}</p>
                </div>

              </div>
            );
          } else {
            switch (message) {
              case "startMessage": return <StartMessage />;
              case "introduction": return <Introduction />;
              default:
                return (
                  // <div
                  //   key={index}
                  //   className="flex w-full justify-start mb-2 animate-in fade-in slide-in-from-bottom-1"
                  // >
                  //   <div className="max-w-[75%] rounded-2xl rounded-tl-none px-4 py-2 text-sm font-medium text-slate-100 ">

                  //   </div>
                  // </div>
                  <Record key={index} record={message} msgIndex={index} />
                );
            }

          }
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chatting;
