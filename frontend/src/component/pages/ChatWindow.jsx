// import React, { useState, useEffect, useRef } from 'react';
// import apiClient, { GeminiService } from '../../api/apiClient';
// import ReactMarkdown from 'react-markdown';


// // Generates a random session string like "session-171829384"
// const generateSessionId = () => 'session-' + Math.random().toString(36).substring(2, 11);

// export default function ChatWindow() {
//     const [conversationId, setConversationId] = useState('');
//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [isOpen, setIsOpen] = useState(false); // Manages minimizing/expanding the window
//     const [isLoading, setIsLoading] = useState(false); // Shows typing indicator

//     const messagesEndRef = useRef(null);
//     const sampleFAQs = [
//         { label: "📊 Get summary", text: "Give me my financial record summary" },
//         { label: "💡 Saving tips", text: "Analyze my records and give me 3 saving tips" },
//         { label: "🍿 Add subscription", text: "Track a new monthly subscription for Netflix at $15.49" },
//         { label: "✏️ Fix a mistake", text: "Change the amount of my last recorded expense to $50" }
//     ];
//     // Auto-scrolls the dialogue block down when a message arrives
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' ,block:"end"});
//     };

//     // Generate the session ID once when the chat component mounts
//     useEffect(() => {
//         setMessages([{ id: 1, text: "Hello! Provide an expense to track.", type: 'bot' }]);
//         setConversationId(generateSessionId());
//     }, []);

//     // Watch messages array to trigger scroll action
//     useEffect(() => {
//         scrollToBottom();
//     }, [messages, isLoading]);

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!input.trim()) return;

//         // Append user message to UI state layout
//         const userText = input.trim();
//         setMessages(prev => [...prev, { id: Date.now(), text: userText, type: 'user' }]);
//         setInput('');
//         setIsLoading(true); // Turn on loading indicator

//         try {

//             // Send message to your new Spring Boot endpoint
//             const response = await GeminiService.getChatResponse({
//                 message: userText,
//                 id: conversationId // Keeps memory tied to this specific user session!
//             })





//             try {
//                 const cleanJson = JSON.parse(rawResponseText.trim());

//                 if (response.action === "REDIRECT_MAIN_PAGE") {
//                     setIsOpen(false);

//                     // Or use your router: navigate("/dashboard");
//                     return;
//                 }
//             } catch (e) {
//                 // Not a JSON signal payload, proceed to render it as standard markdown text
//             }
//             setMessages(prev => [...prev, {
//                 id: Date.now(),
//                 text: response.data,
//                 type: 'bot',
//             }]);

//         } catch (error) {
//             console.log(error);
//             setMessages(prev => [...prev, { id: Date.now(), text: "Error saving record. Please verify database availability.", type: 'bot' }]);
//         } finally {
//             setIsLoading(false); // Turn off loading indicator
//         }
//     };

//     return (
//         <div className="fixed bottom-6 right-6 z-50 font-sans selection:bg-blue-200">
//             {/* Floating Minimize Button Toggle */}
//             {!isOpen && (
//                 <button
//                     onClick={() => setIsOpen(true)}
//                     className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-4 py-2 shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border border-blue-400"
//                 >
//                     <span className="text-lg">💰</span>
//                     <span className="font-semibold text-sm tracking-wide">Ask</span>
//                 </button>
//             )}

//             {/* Main Chat Box Interface Container */}
//             {isOpen && (
//                 <div className="bg-white w-96 h-[520px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300">

//                     {/* Header Panel */}
//                     <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 flex justify-between items-center shadow-md">
//                         <div className="flex items-center gap-3">
//                             <div className="bg-white/20 p-2 rounded-xl text-xl backdrop-blur-md">🤖</div>
//                             <div>
//                                 <h3 className="font-bold text-base tracking-tight">MoneyBot Agent</h3>
//                                 <p className="text-[11px] text-blue-100 flex items-center gap-1.5 font-medium">
//                                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
//                                     Connected to Record Engine
//                                 </p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={() => setIsOpen(false)}
//                             className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold"
//                             title="Minimize chat"
//                         >
//                             ✕
//                         </button>
//                     </div>

//                     {/* Messages Scroll viewport Area */}
//                     <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
//                         {messages.map((msg) => (
//                             <div
//                                 key={msg.id}
//                                 className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                             >
//                                 <div
//                                     className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all duration-150 leading-relaxed ${msg.type === 'user'
//                                         ? 'whitespace-pre-line bg-blue-600 text-white rounded-tr-none font-medium'
//                                         : 'whitespace-pre-line bg-white text-gray-800 border border-slate-200/80 rounded-tl-none'
//                                         }`}
//                                 >
//                                     {msg.type === "bot" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : <div className="whitespace-pre-line">{msg.text}</div>}

//                                 </div>
//                             </div>
//                         ))}

//                         {messages.length === 1 && !isLoading && (
//                             <div className="grid grid-cols-2 gap-2 mt-2 px-1 animate-fade-in">
//                                 {sampleFAQs.map((faq, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => processSubmitMessage(faq.text)}
//                                         className="text-left bg-white hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-700 px-3 py-2.5 rounded-xl shadow-sm transition-all hover:border-blue-300 hover:scale-[1.02] active:scale-95 active:bg-blue-100 text-ellipsis overflow-hidden"
//                                     >
//                                         {faq.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Simulated Dynamic Bot Typing Indicator Bubble */}
//                         {isLoading && (
//                             <div className="flex justify-start">
//                                 <div className="bg-white text-gray-400 border border-slate-200/80 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
//                                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//                                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Auto scroll anchor ref point */}
//                         <div ref={messagesEndRef} />
//                     </div>



//                     {/* Submission Input Control Form */}
//                     <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t border-slate-100 flex gap-2.5 items-center">
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="e.g., Spent $12 on lunch yesterday"
//                             className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50 placeholder:text-gray-400 text-gray-800 font-medium transition-all"
//                             disabled={isLoading}
//                         />
//                         <button
//                             type="submit"
//                             disabled={!input.trim() || isLoading}
//                             className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-150 active:scale-95"
//                         >
//                             Send
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }


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