import { SendIcon, Menu as MenuIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { Menu } from "./Menu";
import { GlobalContext } from "../api/Context";

const MessageSender = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    handleMessages,
  } = useContext(GlobalContext);

  const [input, setInput] = useState("");

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    handleMessages({
      type: "user",
      text: input,
    });

    const parsed = handleExpense(input);

    if (parsed === false) {
      setInput("");
      return;
    }

    setInput("");
  };

  const handleExpense = (input) => {
    const words = input.trim().split(/\s+/);

    const numIndex = words.findIndex((word) =>
      /^-?\d+$/.test(word)
    );

    if (numIndex === -1) {
      return false;
    }

    const number = parseInt(words[numIndex], 10);

    const extractedCat = words
      .slice(0, numIndex)
      .join(" ");

    const extractedReason = words
      .slice(numIndex + 1)
      .join(" ");

    const hashtags = words
      .filter((word) => word.startsWith("#"))
      .join(" ");

    const cleanReason = extractedReason
      .replace(/#\S+/g, "")
      .trim();


    const newRecord = {
      id: Date.now(),
      expense: number < 0 ? Math.abs(number) : 0,
      income: number > 0 ? number : 0,
      category: extractedCat,
      reason: cleanReason,
      hashtags,
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };

    handleMessages({
      type: "record",
      record: newRecord,
    });

    return true;
  };


  return (
    <>
      <style>{`
        @keyframes dockIn {
          from {
            opacity:0;
            transform:translateY(30px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        .message-dock {
          animation:dockIn .45s ease;
        }

        .send-glow:hover {
          box-shadow:0 0 20px rgba(16,185,129,.5);
        }
      `}</style>


      <div
        className="
          fixed
          bottom-3
          left-3
          right-3
          z-40
          mx-auto
          max-w-2xl
          message-dock
        "
      >

        {isMenuOpen && <Menu />}


        <div
          className="
            flex
            items-center
            gap-2
            rounded-[28px]
            border
            border-white/10
            bg-slate-950/90
            p-2
            shadow-2xl
            backdrop-blur-xl
          "
        >

          {/* Menu Button */}

          <button
            type="button"
            onClick={handleToggleMenu}
            className="
              flex
              h-10
              items-center
              gap-2
              rounded-full
              bg-slate-800
              px-4
              text-sm
              font-semibold
              text-slate-200
              transition-all
              duration-300
              hover:bg-slate-700
              hover:-translate-y-0.5
              active:scale-95
            "
          >
            {isMenuOpen ? (
              <>
                <X className="h-4 w-4 text-red-400" />
                Close
              </>
            ) : (
              <>
                <MenuIcon className="h-4 w-4 text-slate-400" />
                Menu
              </>
            )}
          </button>


          {/* Input */}

          <form
            onSubmit={handleSubmit}
            className="
              flex
              flex-1
              items-center
              gap-2
            "
          >

            <div
              className="
                flex-1
                rounded-full
                bg-slate-800/60
                px-4
                transition-all
                focus-within:bg-slate-700/70
                focus-within:ring-2
                focus-within:ring-emerald-500/40
              "
            >

              <input
                type="text"
                value={input}
                onChange={handleInput}
                className="
                  h-10
                  w-full
                  bg-transparent
                  text-sm
                  text-white
                  placeholder:text-slate-400
                  focus:outline-none
                "
                placeholder="Try: -300 food #travel"
              />

            </div>


            {/* Send */}

            <button
              type="submit"
              className="
                send-glow
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-emerald-400
                to-emerald-600
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                active:scale-90
              "
            >
              <SendIcon className="h-5 w-5" />
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default MessageSender;