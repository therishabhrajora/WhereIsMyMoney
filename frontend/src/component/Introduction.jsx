const Introduction = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-xl shadow-slate-100 transition-all">
      {/* Title & Introduction */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>Welcome to your Expense Tracker!</span>
          <span className="animate-bounce">💰</span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Taking control of your money starts here. This app helps you monitor
          your daily spending habits so you can hit your financial goals faster.
        </p>
      </div>

      {/* Feature List */}
      <div className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          What you can do right now
        </h3>

        <ul className="grid gap-3 text-sm text-slate-600">
          <li className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-50 text-xs">
              ➕
            </span>
            <p>
              <strong className="font-semibold text-slate-900">
                Add Transactions:
              </strong>
              Log income and expenses instantly with custom categories.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-50 text-xs">
              📊
            </span>
            <p>
              <strong className="font-semibold text-slate-900">
                Track Budgets:
              </strong>{" "}
              Set smart monthly limits and stop overspending before it happens.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-purple-50 text-xs">
              📈
            </span>
            <p>
              <strong className="font-semibold text-slate-900">
                View Insights:
              </strong>{" "}
              Visualize exactly where your money goes with charts and
              breakdowns.
            </p>
          </li>
        </ul>
      </div>

      {/* Bottom Call to Action Hint */}

      <div className="">
        <div className="my-4">
          <h1 className="text-lg font-semibold  ">How to save an expense</h1>
          <p className="text-sm text-slate-500">
            Just send me a number and I'll save it to your expenses. For
            exmaple:
          </p>

          <ul className="text-slate-500 text-sm my-4" type="disc">
            <li>-300 food</li>
            <li>-car 150</li>
            <li>-21 cafe ice crean #travel #vacation</li>
          </ul>

          <div className="text-sm  text-slate-500">
            This app support plus (+300 salary) and minus (-300 food) signs if
            you want to track income money;
          </div>
        </div>

        <div className="my-4">
          <h1 className="text-ls font-semibold">Comments</h1>
          <p className="text-sm text-slate-500">
            You can also write any text to save a comment:
          </p>
          <p className="text-sm text-slate-500 ml-5 my-4">
            Supermarket 300 some food{" "}
          </p>
        </div>

        <div className="my-4">
          <h1 className="text-ls font-semibold">how to edit your expenses</h1>
          <p className="text-sm text-slate-500">
            You can edi or delete any expense, just edit the message. Change the
            amount to 0 to delete the expanse.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Introduction;
