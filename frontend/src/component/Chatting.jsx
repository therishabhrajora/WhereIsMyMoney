import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../api/Context";
import StartMessage from "./StartMessage";
import Introduction from "./Introduction";
import Record from "./Record";
import MenuMessage from "./MenuMessage";

const Chatting = () => {
  const { messages } = useContext(GlobalContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentDate = new Date();
  const currentTime = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  return (
    <>
      {/* Component Styles */}
      <style>{`
        @keyframes messageSlide {
          0% {
            opacity: 0;
            transform: translateY(18px) translateX(12px) scale(.96);
          }
          70% {
            opacity: 1;
            transform: translateY(-2px) translateX(0) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-slide {
          animation: messageSlide .45s ease;
        }

        .chat-fade {
          animation: fadeUp .4s ease;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50">
        <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
          {messages.map((message, index) => {
            const formattedTime = `${currentTime < 10 ? `0${currentTime}` : currentTime
              }:${currentMinutes < 10
                ? `0${currentMinutes}`
                : currentMinutes
              }`;

            switch (message?.type) {
              case "user":
                return (
                  <div
                    key={index}
                    className="flex w-full justify-end mb-4 message-slide"
                  >
                    <div
                      className="
                        max-w-[75%]
                        rounded-[22px]
                        rounded-br-md
                        bg-gradient-to-br
                        from-emerald-500
                        via-emerald-600
                        to-emerald-700
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        shadow-lg
                        shadow-emerald-500/20
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-xl
                        hover:shadow-emerald-500/30
                        cursor-default
                      "
                    >
                      <p className="leading-relaxed break-words">
                        {message.text}
                      </p>

                      <p className="mt-1 text-[10px] text-right tracking-wide text-white/70">
                        {formattedTime}
                      </p>
                    </div>
                  </div>
                );

              case "record":
                return (
                  <div key={index} className="chat-fade">
                    <Record
                      time={formattedTime}
                      record={message}
                      isMenu={message.type === "menu"}
                      msgIndex={index}
                    />
                  </div>
                );

              case "introduction":
                return (
                  <div key={index} className="chat-fade">
                    <Introduction time={formattedTime} />
                  </div>
                );

              case "menu":
                return (
                  <div key={index} className="chat-fade">
                    <MenuMessage time={formattedTime} />
                  </div>
                );

              case "startMessage":
                return (
                  <div key={index} className="chat-fade">
                    <StartMessage time={formattedTime} />
                  </div>
                );

              default:
                return null;
            }
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default Chatting;