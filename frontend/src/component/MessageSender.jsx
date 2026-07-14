import { SendIcon, Menu as MenuIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { Menu } from "./Menu";
import { GlobalContext } from "../api/Context";
import MenuMessage from "./MenuMessage";
// Import Menu from your file structure here, or use the export from above
// import Menu from "./Menu";

const MessageSender = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    handleInputMessages,
    handleChat,
    expenses,
    setMessages,
    handleExpenses
  } = useContext(GlobalContext);
  const [input, setInput] = useState("");
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [cat, setCat] = useState("");
  const [reason, setReason] = useState("");
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    handleExpense(input);
    handleInputMessages(input);
    handleChat(input);
    handleChat("menuMessage");

    // FIXED: This will now successfully clear the textbox on submit
    setInput("");
  };

  const handleExpense = (input) => {
  const words = input.trim().split(/\s+/);
  
  // Find the index of the first numeric word
  const numIndex = words.findIndex(word => /^-?\d+$/.test(word));
  
  // If no number is found, abort parsing
  if (numIndex === -1) return;

  const number = parseInt(words[numIndex], 10);
  
  // Slice array to cleanly extract parts without looping state updates
  const extractedCat = words.slice(0, numIndex).join(" ");
  const extractedReason = words.slice(numIndex + 1).join(" ");

  // Isolate hashtags from the reason if they exist
  const hashtags = words.filter(word => word.startsWith("#")).join(" ");
  const cleanReason = extractedReason.replace(/#\S+/g, "").trim();

 

  // 2. Append directly to your global object/array state safely
  const newRecord = {
    id: Date.now(),
    expense: number < 0 ? Math.abs(number) : 0,
    income: number > 0 ? number : 0,
    category: extractedCat,
    reason: cleanReason,
    hashtags: hashtags,
    date:new Date().getDate(),
    month:new Date().getMonth() + 1,
    year:new Date().getFullYear(),
  };


  // Assuming expenses is an array in your GlobalContext:
  handleExpenses(newRecord);
};


  return (
    /* Container layout anchor element keeping Menu popup and Chatbar tied together safely */
    <div className="fixed bottom-2 left-2 right-2 max-w-2xl mx-auto z-40">
      {/* Conditionally Rendered Floating Command Table Popup */}
      {isMenuOpen && <Menu />}

      {/* Interactive Main Dock Input Panel */}
      <div className="flex h-12 gap-1 rounded-full bg-slate-900/90 p-1 backdrop-blur-sm shadow-lg">
        {/* Menu Toggle Action Button */}
        <button
          type="button"
          className="rounded-full flex gap-1.5 items-center bg-slate-800 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all active:scale-95 select-none"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? (
            <>
              <X className="h-4 w-4 text-rose-400" />
              <span>Close</span>
            </>
          ) : (
            <>
              <MenuIcon className="h-4 w-4 text-slate-400" />
              <span>Menu</span>
            </>
          )}
        </button>

        {/* Input Form Wrapper Area */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-1 items-center gap-1"
        >
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            value={input}
            className="h-full flex-1 rounded-full bg-transparent px-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            placeholder="Type expense (e.g., 21 cafe #travel)..."
          />

          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-all active:scale-95"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageSender;
