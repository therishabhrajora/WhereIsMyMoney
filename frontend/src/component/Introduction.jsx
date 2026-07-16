const Introduction = ({ time }) => {
  return (
    <div
      className="
        w-full
        max-w-3xl
        rounded-3xl
        border
        border-slate-200/70
        bg-white
        p-7
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-2xl
        animate-in
        fade-in
        slide-in-from-bottom-4
      "
    >
      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl shadow-lg animate-pulse">
          💰
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            Welcome to your Expense Tracker
            <span className="animate-bounce">✨</span>
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            Take control of your finances with a simple chat. Record expenses,
            monitor income, organize budgets, and understand your spending
            habits effortlessly.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          What you can do
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 text-2xl">➕</div>

            <h4 className="font-semibold text-slate-900">
              Add Transactions
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Quickly save income and expenses using natural language.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 text-2xl">📊</div>

            <h4 className="font-semibold text-slate-900">
              Track Budgets
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Keep spending under control with monthly budget tracking.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 text-2xl">📈</div>

            <h4 className="font-semibold text-slate-900">
              View Insights
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Understand where your money goes with reports and analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Guide */}
      <div className="space-y-8 border-t border-slate-100 pt-8">
        {/* Save Expense */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            💸 How to save an expense
          </h3>

          <p className="text-sm text-slate-500">
            Send a message with the amount and category. For example:
          </p>

          <div className="mt-4 rounded-2xl bg-slate-900 p-4 font-mono text-sm text-emerald-300">
            -300 food <br />
            -150 car <br />
            -21 cafe ice cream #travel #vacation <br />
            +3000 salary
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Use <strong>+</strong> for income and <strong>-</strong> for
            expenses.
          </p>
        </div>

        {/* Comments */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            📝 Comments
          </h3>

          <p className="text-sm text-slate-500">
            Save plain text notes along with your expenses.
          </p>

          <div className="mt-4 rounded-xl bg-slate-100 p-3 font-mono text-sm text-slate-700">
            Supermarket 300 some food
          </div>
        </div>

        {/* Edit */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            ✏️ Edit Expenses
          </h3>

          <p className="text-sm leading-7 text-slate-500">
            Edit or delete any expense by changing the original message.
            Setting the amount to <strong>0</strong> removes the expense.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-slate-100 pt-4">
        <p className="text-right text-[11px] tracking-wide text-slate-400">
          {time}
        </p>
      </div>
    </div>
  );
};

export default Introduction;