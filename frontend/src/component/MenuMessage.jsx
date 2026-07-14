import { useContext } from "react";
import { GlobalContext } from "../api/Context";
import { ChevronLeft, Languages } from "lucide-react";

const MenuMessage = () => {
    const { messages, expenses, setExpenses, inputMessages } = useContext(GlobalContext);

    const menuMsg = inputMessages[inputMessages.length - 1] == "/menu";
    const lastExpense = expenses[expenses.length - 1];

    return (
        <div className="w-full max-w-sm rounded-xl flex gap-1 flex-col animate-in fade-in duration-200">
            <table className="w-full  text-sm ">
                {menuMsg ?
                    <tbody>
                        <tr className="bg-white">
                            <td colSpan={2}>
                                <p>-----</p>
                                <p>this month: <span className="font-semibold">0</span> </p>
                                <p>today:<span className="font-semibold">0</span></p>
                            </td>
                        </tr>
                        <tr className="bg-blend-color font-semibold text-center bg-white">
                            <td>Today</td>
                            <td>Statics</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="p-2 text-center text-[10px]  rounded-b-lg font-mono">
                                back
                            </td>
                        </tr>
                    </tbody> : <tbody>
                        <tr className="bg-white">
                            <td colSpan={2}>
                                <div className="">
                                    <p>Saved</p>
                                    <p>
                                        {lastExpense.income == 0 && <span className="font-semibold">{lastExpense.expense}.0</span>}
                                        {lastExpense.expense == 0 && <span className="font-semibold">{lastExpense.income}.0</span>}
                                    </p>
                                    <p>comment: <span>{lastExpense.reason}</span></p>
                                </div>
                                <div>
                                    <p>-----</p>
                                    <p>this month: <span className="font-semibold">{0}.0</span> </p>
                                    <p>today:<span className="font-semibold">{ }.0</span></p>
                                    <p>In the category:<span className="font-semibold">{expenses.reason}.0</span><span >0.0</span></p>

                                </div>

                            </td>
                        </tr>
                        <tr className="bg-blend-color font-semibold text-center bg-white">
                            <td>Today</td>
                            <td>Statics</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="p-2 text-center text-[10px]  rounded-b-lg font-mono">
                                back
                            </td>
                        </tr>
                    </tbody>
                }
            </table>

        </div>
    );
};

export default MenuMessage;
