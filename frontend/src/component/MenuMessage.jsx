import { useContext } from "react";
import { GlobalContext } from "../api/Context";
import { ChevronLeft, Languages } from "lucide-react";

const MenuMessage = () => {
    const { messages, expenses, setExpenses, inputMessages } = useContext(GlobalContext);

    // Get the latest values safely using optional chaining
    const lastUserMsg = inputMessages?.[inputMessages.length - 1] || "No history";
    const lastBotMsg = messages?.[messages.length - 1] || "No response";

    return (
        <div className="w-full max-w-sm bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex gap-1 flex-col animate-in fade-in duration-200 shadow-md">

            {/* Modern Styled Table Context */}
            <table className="w-full text-left border-collapse text-xs text-indigo-900">
                <thead>
                    <tr className="border-b border-indigo-200 bg-indigo-200/50">
                        <th colSpan={2} className="p-2 font-bold uppercase tracking-wider text-center rounded-t-lg">
                            Latest Log Entry Summary
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-indigo-100 hover:bg-indigo-100/40 transition-colors">
                        <td className="p-2 font-semibold border-r border-indigo-100 w-1/3">User Said:</td>
                        <td className="p-2 break-words italic text-indigo-700">{lastUserMsg}</td>
                    </tr>
                    <tr className="border-b border-indigo-100 hover:bg-indigo-100/40 transition-colors">
                        <td className="p-2 font-semibold border-r border-indigo-100">Bot Reply:</td>
                        <td className="p-2 break-words text-indigo-800">{lastBotMsg}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="p-2 text-center text-[10px] text-indigo-400 bg-indigo-100/20 rounded-b-lg font-mono">
                            Logs Synced Successfully
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default MenuMessage;
