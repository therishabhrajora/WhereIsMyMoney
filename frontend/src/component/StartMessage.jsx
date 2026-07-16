import React, { useContext } from "react";
import { Languages, ChevronLeft } from "lucide-react";
import { GlobalContext } from "../api/Context";

const StartMessage = () => {
  const { setCommand, handleMessages } = useContext(GlobalContext);

  const handleLanguageSelect = (lang) => {
    handleMessages(`Selected Language: ${lang}`);
    setCommand("");
  };

  return (
    <div
      className="
        w-full
        max-w-sm
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
          p-4
          shadow-xl
          backdrop-blur-xl
        "
      >

        {/* Header */}

        <div
          className="
            mb-4
            flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-teal-600
            p-4
            text-white
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-white/20
              backdrop-blur
            "
          >
            <Languages className="h-5 w-5" />
          </div>


          <div>

            <h2 className="text-sm font-bold">
              Select Language
            </h2>

            <p className="text-xs text-white/80">
              भाषा चुनें
            </p>

          </div>

        </div>



        {/* Language Buttons */}

        <div className="space-y-3">


          <button
            onClick={() => handleLanguageSelect("English")}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700
              hover:shadow-md
              active:scale-95
            "
          >

            <span className="flex items-center gap-2">
              🇺🇸 English
            </span>


            <span
              className="
                rounded-full
                bg-white
                px-3
                py-1
                text-xs
                font-normal
                text-slate-400
                transition
                group-hover:bg-emerald-100
                group-hover:text-emerald-600
              "
            >
              Select
            </span>

          </button>



          <button
            onClick={() => handleLanguageSelect("Hindi")}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3.5
              text-sm
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-300
              hover:bg-orange-50
              hover:text-orange-700
              hover:shadow-md
              active:scale-95
            "
          >

            <span className="flex items-center gap-2">
              🇮🇳 हिन्दी (Hindi)
            </span>


            <span
              className="
                rounded-full
                bg-white
                px-3
                py-1
                text-xs
                font-normal
                text-slate-400
                transition
                group-hover:bg-orange-100
                group-hover:text-orange-600
              "
            >
              चुनें
            </span>

          </button>



          {/* Back */}

          <button
            onClick={() => setCommand("")}
            className="
              mt-2
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-dashed
              border-slate-300
              px-4
              py-3
              text-xs
              font-semibold
              text-slate-500
              transition-all
              duration-300
              hover:border-slate-400
              hover:bg-slate-50
              hover:text-slate-700
              active:scale-95
            "
          >

            <ChevronLeft className="h-4 w-4" />

            Back to Main Menu

          </button>


        </div>

      </div>

    </div>
  );
};

export default StartMessage;