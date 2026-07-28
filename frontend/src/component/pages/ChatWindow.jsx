import React, { useState, useEffect, useRef } from "react";
import { GeminiService } from "../../api/apiClient";
import ReactMarkdown from "react-markdown";

const generateSessionId = () =>
    "session-" + Math.random().toString(36).substring(2, 11);

export default function ChatWindow() {
    const [conversationId, setConversationId] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const sampleFAQs = [
        {
            label: "📊 Summary",
            text: "Give me my financial record summary",
        },
        {
            label: "💡 Saving Tips",
            text: "Analyze my records and give me 3 saving tips",
        },
        {
            label: "🍿 Netflix",
            text: "Track a new monthly subscription for Netflix at $15.49",
        },
        {
            label: "✏️ Edit",
            text: "Change the amount of my last recorded expense to $50",
        },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    useEffect(() => {
        setMessages([
            {
                id: 1,
                text: "👋 Hello! I'm MoneyBot.\n\nTell me your expenses or ask anything about your finances.",
                type: "bot",
            },
        ]);

        setConversationId(generateSessionId());
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const processSubmitMessage = (text) => {
        setInput(text);

        setTimeout(() => {
            document.getElementById("send-btn")?.click();
        }, 100);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        const userText = input.trim();

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: userText,
                type: "user",
            },
        ]);

        setInput("");
        setIsLoading(true);

        try {
            const response = await GeminiService.getChatResponse({
                message: userText,
                id: conversationId,
            });

            try {
                const json = JSON.parse(response.data);

                if (json.action === "REDIRECT_MAIN_PAGE") {
                    setIsOpen(false);
                    return;
                }
            } catch (err) { }

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: response.data,
                    type: "bot",
                },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: "❌ Something went wrong.",
                    type: "bot",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <style>
                {`
    /* Smooth scrollbar */

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hide horizontal scrollbar */

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
}

/* Markdown spacing */

.prose p {
  margin: 0.4rem 0;
}

.prose ul {
  margin: 0.5rem 0;
  padding-left: 1rem;
}

.prose li {
  margin: 0.25rem 0;
}

/* Nice fade animation */

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeUp {
  animation: fadeUp .25s ease;
}
    `}
            </style>
            <div className="fixed inset-x-0 bottom-24 md:bottom-24 lg:bottom-5 md:right-8    left-auto z-50 flex justify-end mx-4">

                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="
          group
          flex
          items-center
          gap-3
          rounded-full
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-purple-600
          text-white
          p-2
          lg:px-4
          lg:py-2
          shadow-2xl
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
          border
          border-white/20
          opacity-40
          hover:opacity-100
          
          "
                    >
                        <span className="text-lg">🤖</span>

                        <div className=" flex-col items-start leading-none hidden lg:flex">
                            <span className="font-bold text-sm">
                                MoneyBot
                            </span>

                            <span className="text-[8px] opacity-80 hidden lg:flex">
                                AI Assistant
                            </span>
                        </div>
                    </button>
                )}

                {isOpen && (
                    <div
                        className="
          w-[60%]
          max-w-md
          md:w-[430px]
          h-[80vh]
          md:h-[70vh]
          bg-white/95
          backdrop-blur-xl
          rounded-3xl
          border
          border-slate-200
          shadow-[0_25px_80px_rgba(0,0,0,.18)]
          overflow-hidden
          flex
          flex-col
          "
                    >

                        {/* Header */}

                        <div
                            className="
            sticky
            top-0
            z-20
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            px-5
            py-4
            text-white
            flex
            justify-between
            items-center
            shadow-lg
            "
                        >

                            <div className="flex gap-3 items-center">

                                <div
                                    className="
                w-12
                h-12
                rounded-2xl
                bg-white/20
                flex
                items-center
                justify-center
                text-2xl
                "
                                >
                                    💰
                                </div>

                                <div>

                                    <h2 className="font-bold text-lg">
                                        MoneyBot
                                    </h2>

                                    <p className="text-xs text-blue-100 flex items-center gap-2">

                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

                                        AI Expense Assistant

                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="
              w-9
              h-9
              rounded-full
              hover:bg-white/20
              transition
              "
                            >
                                ✕
                            </button>

                        </div>

                        {/* Messages */}

                        <div
                            className="
            flex-1
            overflow-y-auto
            bg-gradient-to-b
            from-slate-50
            to-white
            px-4
            py-5
            space-y-5
            scroll-smooth
            "
                        >

                            {messages.map((msg) => (

                                <div
                                    key={msg.id}
                                    className={`flex ${msg.type === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >

                                    <div
                                        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-7 shadow-md

                  ${msg.type === "user"
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
                                                : "bg-white border border-slate-200 rounded-bl-md text-slate-800"
                                            }
                  `}
                                    >

                                        {msg.type === "bot" ? (
                                            <ReactMarkdown>
                                                {msg.text}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.text
                                        )}

                                    </div>

                                </div>

                            ))}

                            {isLoading && (

                                <div className="flex justify-start">

                                    <div
                                        className="
                  bg-white
                  rounded-3xl
                  rounded-bl-md
                  px-5
                  py-4
                  shadow-md
                  border
                  border-slate-200
                  flex
                  gap-2
                  "
                                    >

                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>

                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100"></span>

                                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200"></span>

                                    </div>

                                </div>

                            )}

                            <div ref={messagesEndRef} />

                        </div>
                        {/* FAQ Chips */}

                        <div className="border-t border-slate-200 bg-white px-3 py-3">

                            <div className="flex gap-2 overflow-x-auto scrollbar-thin">

                                {sampleFAQs.map((faq, index) => (

                                    <button
                                        key={index}
                                        onClick={() => processSubmitMessage(faq.text)}
                                        className="
                  shrink-0
                  rounded-full
                  bg-slate-50
                  border
                  border-slate-200
                  hover:bg-blue-50
                  hover:border-blue-400
                  hover:text-blue-700
                  transition-all
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  active:scale-95
                  
                  "
                                    >
                                        {faq.label}
                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* Input */}

                        <form
                            onSubmit={handleSendMessage}
                            className="
            bg-white
            border-t
            border-slate-200
            p-3
            flex
            items-center
            gap-3
            "
                        >

                            <input
                                type="text"
                                value={input}
                                disabled={isLoading}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your expense..."
                                className="
              flex-1
              rounded-full
              border
              border-slate-300
              bg-slate-50
              px-3
              py-2
              text-sm
              outline-none
              transition-all
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              placeholder:text-slate-400
              "
                            />

                            <button
                                id="send-btn"
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="
              h-10
              lg:h-12
              w-12
              rounded-full
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              text-white
              shadow-lg
              flex
              items-center
              justify-center
              transition-all
              hover:scale-105
              active:scale-95
              disabled:opacity-40
              disabled:cursor-not-allowed
              "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M22 2L11 13"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M22 2L15 22L11 13L2 9L22 2Z"
                                    />
                                </svg>

                            </button>

                        </form>

                    </div>

                )}

            </div>
        </>

    );

}