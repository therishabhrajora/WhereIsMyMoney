import { useContext, useState } from "react";
import Data from "../api/Data";
import { GlobalContext } from "../api/Context";

const StatisticsMessage = ({ msgIndex }) => {
  const { monthNames } = Data;

  const {
    messages,
    updateStaticsOpen,
  } = useContext(GlobalContext);


  const [selectedDate, setSelectedDate] = useState(new Date());


  const historicalExpenses = messages
    .filter((item) => item.type === "record")
    .slice(0, msgIndex + 1);


  const currentMonthNum = selectedDate.getMonth() + 1;
  const currentYearNum = selectedDate.getFullYear();



  const nextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(next);
  };


  const prevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(prev);
  };



  const monthExpenses = historicalExpenses
    .filter(
      (item) =>
        Number(item.record.month) === currentMonthNum &&
        Number(item.record.year) === currentYearNum
    )
    .reduce((sum, item) => {

      const expenseValue = Number(item.record.expense || 0);
      const incomeValue = Number(item.record.income || 0);

      return expenseValue === 0
        ? sum + incomeValue
        : sum - expenseValue;

    }, 0);



  const closeAll = () => {
    updateStaticsOpen(-1);
  };



  return (

    <div
      className="
        animate-in
        fade-in
        slide-in-from-bottom-3
        duration-500
      "
    >

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white/90
          shadow-xl
          backdrop-blur-xl
        "
      >


        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            p-5
            text-white
          "
        >

          <p
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-white/70
              font-semibold
            "
          >
            Statistics
          </p>


          <div className="mt-2 flex items-center justify-between">

            <h2 className="text-2xl font-extrabold">

              {monthNames[currentMonthNum]}
              {" "}
              {currentYearNum}

            </h2>

          </div>


          <div
            className="
              mt-4
              rounded-2xl
              bg-white/20
              p-3
              backdrop-blur
            "
          >

            <p className="text-xs text-white/80">
              Total Balance
            </p>

            <p className="text-2xl font-bold">
              {monthExpenses}
            </p>

          </div>


        </div>




        {/* Empty statistics section */}

        <div className="p-5">

          <div
            className="
              rounded-2xl
              bg-slate-50
              p-4
              text-center
            "
          >

            <p className="text-sm text-slate-500">
              Monthly statistics overview
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Navigate between months using the buttons below
            </p>

          </div>


          {/* Navigation */}

          <div className="mt-4 grid grid-cols-2 gap-3">


            <button
              onClick={prevMonth}
              className="
                rounded-2xl
                bg-slate-100
                py-3
                font-semibold
                text-slate-700
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-blue-50
                hover:text-blue-700
                hover:shadow-md
                active:scale-95
              "
            >
              ← Previous
            </button>



            <button
              onClick={nextMonth}
              className="
                rounded-2xl
                bg-slate-100
                py-3
                font-semibold
                text-slate-700
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-blue-50
                hover:text-blue-700
                hover:shadow-md
                active:scale-95
              "
            >
              Next →
            </button>


          </div>



          <button
            onClick={closeAll}
            className="
              mt-3
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              py-3
              font-semibold
              text-slate-600
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-slate-100
              hover:shadow-md
              active:scale-95
            "
          >
            ← Back
          </button>


        </div>


      </div>


    </div>

  );
};


export default StatisticsMessage;