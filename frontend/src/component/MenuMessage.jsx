import { useContext } from "react";
import { GlobalContext } from "../api/Context";

const MenuMessage=()=>{
    const {messages,expenses,setExpenses,inputMessages}=useContext(GlobalContext);
    console.log(messages[messages.length-1]);
    console.log(inputMessages[inputMessages.length-1]);

return (
    <div>
        
    </div>
)
}

export default MenuMessage;