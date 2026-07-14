const MenuMessage=({todayExpenses,monthExpenses})=>{
    console.log(todayExpenses,monthExpenses);
    return (
        <table className="w-full text-sm table-fixed border-separate border-spacing-y-1">
            <tbody>
            <tr className="bg-white">
              <td
                colSpan={2}
                className="p-4 text-slate-700 space-y-1 rounded-t-2xl"
              >
                <div className="border-b border-dashed border-slate-200 pb-2 mb-2 text-slate-400 font-mono">
                  -----
                </div>
                <p className="text-slate-600">
                  this month:{" "}
                  <span className="font-semibold text-slate-900">
                    {monthExpenses}
                  </span>{" "}
                </p>
                <p className="text-slate-600">
                  today:{" "}
                  <span className="font-semibold text-slate-900">
                    {todayExpenses}
                  </span>
                </p>
              </td>
            </tr>
            <tr className="font-semibold text-center bg-slate-50 text-slate-700">
              <td className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors rounded-l-lg">
                Today
              </td>
              <td className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors border-l border-slate-200 rounded-r-lg">
                Statics
              </td>
            </tr>
            <tr className="font-semibold text-center bg-slate-50 text-slate-700">
              <td
                colSpan={2}
                className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors rounded-l-lg"
              >
                back
              </td>
            </tr>
          </tbody>
        </table>
    )
}

export default MenuMessage;