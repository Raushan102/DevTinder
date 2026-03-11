import { Link, useLocation } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCw, Info, ShieldAlert } from "lucide-react";

const PremiumFailed = () => {
  const location = useLocation();
  const errorDetails = location.state || {
    message: "Transaction declined. Please verify your card details.",
    id: "REF-9920-X",
    amount: "₹999.00"
  };

  return (
    <div className="h-[85vh] flex items-center justify-center px-4 bg-transparent relative">

      {/* Main Glass Card - Rounded 8px */}
      <div className="relative max-w-lg w-full backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-[8px] shadow-2xl overflow-hidden">

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-red-500/20 rounded-[4px]">
            <XCircle size={32} className="text-red-500" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white md:text-black">
              Payment Failed
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 md:text-black/60">
              Transaction Error
            </p>
          </div>
        </div>

        {/* Error Details Section */}
        <div className="space-y-6 mb-10 text-left">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <span className="text-[11px] font-bold uppercase text-white/50 md:text-black/50">Status</span>
            <span className="text-sm font-bold text-red-500 uppercase flex items-center gap-1">
              <ShieldAlert size={14} /> Declined
            </span>
          </div>

          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <span className="text-[11px] font-bold uppercase text-white/50 md:text-black/50">Amount</span>
            <span className="text-lg font-black text-white md:text-black">{errorDetails.amount}</span>
          </div>

          <div className="bg-black/20 md:bg-white/5 p-4 rounded-[4px] border border-white/5">
            <div className="flex gap-2 mb-2">
              <Info size={14} className="text-white/40 md:text-black/40" />
              <span className="text-[10px] font-bold uppercase text-white/40 md:text-black/40 tracking-wider">Reason</span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white md:text-black">
              {errorDetails.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/paymentForm"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-xs tracking-widest rounded-[4px] transition-all"
          >
            <RefreshCw size={16} />
            Try Again
          </Link>

          <Link
            to="/feed"
            className="flex-1 flex items-center justify-center gap-2 py-4 border border-white/20 md:border-black/20 text-white md:text-black font-bold uppercase text-xs tracking-widest rounded-[4px] hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>

        {/* Reference Footer */}
        <div className="mt-8 flex justify-between items-center opacity-30 text-[9px] font-mono text-white md:text-black uppercase">
          <span>DevTinder Secure Pay</span>
          <span>ID: {errorDetails.id}</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumFailed;
