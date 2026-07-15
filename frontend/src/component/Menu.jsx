import { Terminal } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../api/Context";
import StartMessage from "./StartMessage";

import Record from "./Record";
import DefaultMessage from "./DefaultMessage";
import Introduction from "./Introduction";

export const Menu = () => {
  const { command, setCommand, setMessages, handleMessages, setIsMenuOpen, isMenuOpen } =
    useContext(GlobalContext);
  const onCommandSelect = (command) => {
    setCommand(command);
    if (command === "/start") {
      handleMessages({
        type: "user",
        text: command
      });
      handleMessages({
        type: "startMessage"
      });
    } else if (command === "/help") {
      handleMessages({
        type: "user",
        text: command
      });
      handleMessages({
        type: "introduction"
      });
    } else if (command === "/menu") {
      handleMessages({
        type: "user",
        text: command
      });

      handleMessages({
        type: "menu"
      });
    }

    setIsMenuOpen(!isMenuOpen);

  };

  return (
    /* Changed bottom-12 to bottom-14 to add clear breathing space above the chat box */
    <div className="absolute bottom-14 left-1 w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Component Title Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-slate-50 pb-2">
        <Terminal className="h-4 w-4 text-slate-400" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Available Commands
        </h4>
      </div>

      {/* Styled Layout Table */}
      <table className="w-full border-collapse text-left text-sm text-slate-600">
        <tbody>
          <tr
            onClick={() => onCommandSelect("/help")}
            className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
          >
            <td className="py-2.5 pr-4 text-slate-500">How to use the bot</td>
            <td className="py-2.5 text-right font-mono font-bold text-emerald-600">
              /help
            </td>
          </tr>
          <tr
            onClick={() => onCommandSelect("/menu")}
            className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
          >
            <td className="py-2.5 pr-4 text-slate-500">Show the menu</td>
            <td className="py-2.5 text-right font-mono font-bold text-emerald-600">
              /menu
            </td>
          </tr>
          <tr
            onClick={() => onCommandSelect("/start")}
            className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
          >
            <td className="py-2.5 pr-4 text-slate-500">Start the bot</td>
            <td className="py-2.5 text-right font-mono font-bold text-emerald-600">
              /start
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
