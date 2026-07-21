import { Terminal } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../../api/Context";

export const Menu = () => {
  const {
    setCommand,
    handleMessages,
    setIsMenuOpen,
    isMenuOpen,
  } = useContext(GlobalContext);

  const onCommandSelect = (command) => {
    setCommand(command);

    switch (command) {
      case "/start":
        handleMessages({ type: "startMessage" });
        break;

      case "/help":
        handleMessages({ type: "introduction" });
        break;

      case "/menu":
        handleMessages({ type: "menu" });
        break;

      case "/logout":
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        location.reload();
        break;

      default:
        break;
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const commands = [
    {
      title: "How to use the bot",
      command: "/help",
      icon: "❓",
    },
    {
      title: "Show command menu",
      command: "/menu",
      icon: "📋",
    },
    {
      title: "Start the bot",
      command: "/start",
      icon: "🚀",
    },
    {
      title: "Logout",
      command: "/logout",
      icon: "🚀",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes menuEnter{
          from{
            opacity:0;
            transform:translateY(20px) scale(.96);
          }
          to{
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        .menu-enter{
          animation:menuEnter .35s ease;
        }
      `}</style>

      <div
        className="
          menu-enter
          absolute
          bottom-16
          left-3
          z-50
          w-[340px]
          overflow-hidden
          rounded-3xl
          border
          border-white/70
          bg-white/90
          shadow-2xl
          backdrop-blur-xl
        "
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-linear-to-r from-emerald-500 to-teal-600 px-5 py-4 text-white">
          <div className="rounded-xl bg-white/20 p-2">
            <Terminal className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold">Bot Commands</h3>
            <p className="text-xs text-white/80">
              Select a command to continue
            </p>
          </div>
        </div>

        {/* Commands */}
        <div className="p-3">
          {commands.map((item) => (
            <button
              key={item.command}
              onClick={() => onCommandSelect(item.command)}
              className="
                group
                mb-2
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-transparent
                bg-slate-50
                px-4
                py-3
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-200
                hover:bg-emerald-50
                hover:shadow-lg
              "
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm transition group-hover:scale-110">
                  {item.icon}
                </div>

                <div>
                  <p className="font-medium text-slate-800">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    Execute this command
                  </p>
                </div>
              </div>

              <span className="rounded-lg bg-emerald-100 px-3 py-1 font-mono text-sm font-semibold text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                {item.command}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;