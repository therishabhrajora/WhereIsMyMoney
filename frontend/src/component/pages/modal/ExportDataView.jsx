import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../api/Context'; // Adjust path based on your file structure
import { Download, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

function ExportDataView() {
  const { messages } = useContext(GlobalContext);
  const [isExporting, setIsExporting] = useState(false);

  // 1. Filter out only valid financial ledger records
  const records = (messages || []).filter(item => item.type === "record");

  const handleExportCSV = () => {
    if (records.length === 0) {
      toast.warning("No transaction records found to export!");
      return;
    }

    setIsExporting(true);

    try {
      // 2. Define standard Excel CSV header columns
      const headers = ["Transaction ID", "Date", "Time", "Category", "Income (₹)", "Expense (₹)", "Description"];

      // 3. Map individual transaction parameters into safe, comma-separated row text strings
      const csvRows = records.map(item => {
        return [
          item.id,
          item.date || "N/A",
          item.time || "00:00:00",
          `"${(item.category || "Uncategorized").replace(/"/g, '""')}"`, // Wrap strings in quotes to handle inner spacing breaks safely
          item.income || 0,
          item.expense || 0,
          `"${(item.message || "").replace(/"/g, '""')}"` // Sanitize user messages to protect CSV row structure
        ].join(",");
      });

      // Combine headers and data arrays into one master string block
      const csvContent = [headers.join(","), ...csvRows].join("\n");

      // 4. Create an immutable Blob binary object and force browser download pipeline triggers
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      
      // Auto-generate timestamped file name (e.g., Ledger_Statement_2026-07-29.csv)
      const currentIsoDate = new Date().toISOString().split('T')[0];
      downloadLink.setAttribute("download", `Ledger_Statement_${currentIsoDate}.csv`);
      
      document.body.appendChild(downloadLink);
      downloadLink.click(); // Trigger native download window
      document.body.removeChild(downloadLink); // Clean up DOM tree
      URL.revokeObjectURL(url); // Free application memory cache allocation

      toast.success("Excel CSV file downloaded successfully! 📊");
    } catch (error) {
      console.error("CSV compilation crash:", error);
      toast.error("Failed to generate file statement.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full text-left bg-white rounded-2xl animate-in fade-in duration-300">
      
      {/* Title Subheader */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          📥 Excel CSV Statement Compilation Core
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Compile and export your transaction logs into an industry-standard format compatible with Excel and Google Sheets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Configuration Summary Panel */}
        <div className="lg:col-span-2 bg-slate-50/60 border border-slate-100 p-5 rounded-2xl flex flex-col justify-between">
          
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileSpreadsheet size={14} className="text-slate-500" /> Statement Profile Summary
            </h4>

            {/* Grid Metrics List */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white border border-slate-200/40 p-4 rounded-xl shadow-2xs">
              <div>
                <span className="text-slate-400 block">Available Entries</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 block">{records.length} Records</span>
              </div>
              <div>
                <span className="text-slate-400 block">Output Ext Format</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 block">Excel CSV (.csv)</span>
              </div>
              <div className="border-t border-slate-100 pt-2 mt-1">
                <span className="text-slate-400 block">Character Encoding</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 block">UTF-8 Security</span>
              </div>
              <div className="border-t border-slate-100 pt-2 mt-1">
                <span className="text-slate-400 block">Delimiting Parameter</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 block">Comma Standard ( , )</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed bg-white border border-slate-200/40 p-3 rounded-xl">
              💡 <span className="font-semibold text-slate-700">Audit Hint:</span> This file statement contains your full transaction history ledger. You can import this dataset directly into bookkeeping suites or use it for financial compliance auditing.
            </p>
          </div>

          {/* Trigger Master Download Action Button */}
          <button
            onClick={handleExportCSV}
            disabled={isExporting || records.length === 0}
            className={`w-full text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer select-none active:scale-[0.99] ${
              records.length === 0 
                ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md'
            }`}
          >
            <Download size={18} className={isExporting ? 'animate-bounce' : ''} />
            {isExporting ? "Compiling spreadsheet cells..." : "Download CSV Statement"}
          </button>

        </div>

        {/* RIGHT COLUMN: Feature Status Checklist */}
        <div className="bg-slate-50/40 border border-slate-100 p-5 rounded-2xl flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Export Validation Checks
          </h4>
          
          <div className="flex flex-col gap-3">
            {/* Rule 1 Check */}
            <div className="flex items-start gap-2.5 text-xs bg-white p-3 rounded-xl border border-slate-200/40">
              {records.length > 0 ? (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold text-slate-700 block">Ledger Verification</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">
                  {records.length > 0 ? `${records.length} objects verified inside active memory.` : "Ledger is empty. No rows can be built."}
                </span>
              </div>
            </div>

            {/* Rule 2 Check */}
            <div className="flex items-start gap-2.5 text-xs bg-white p-3 rounded-xl border border-slate-200/40">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700 block">String Data Sanitization</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">
                  Cell mapping logic encapsulates multi-word strings in quotes to prevent layout alignment shifting.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ExportDataView;
