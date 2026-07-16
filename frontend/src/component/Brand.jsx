const Brand = () => {
  return (
    <div className="mx-auto max-w-2xl">

      <header
        className="
          mb-8
          flex
          items-center
          justify-between
          animate-in
          fade-in
          slide-in-from-top-3
          duration-600
        "
      >

        {/* Brand Logo */}

        <div className="group cursor-default">

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900
              transition-all
              duration-300
              group-hover:tracking-normal
            "
          >
            SpendWise
            <span
              className="
                text-emerald-500
                transition-colors
                duration-300
                group-hover:text-emerald-600
              "
            >
              .
            </span>
          </h1>


          <div
            className="
              mt-1
              h-1
              w-0
              rounded-full
              bg-emerald-500
              transition-all
              duration-500
              group-hover:w-full
            "
          />

        </div>



        {/* Status Badge */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-200
            bg-emerald-50
            px-4
            py-2
            text-sm
            font-semibold
            text-emerald-700
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >

          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
              animate-pulse
            "
          />

          Live Tracker

        </div>


      </header>

    </div>
  );
};

export default Brand;