import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowRight, Crown, ShieldCheck, ChevronRight} from "lucide-react";

const PremiumSuccess = () => {
  const location = useLocation();
  const details = location.state || {
    paymentId: "PAYID-99283745",
    amount: "₹999.00",
    orderId: "ORD-DT-552",
    date: new Date().toLocaleDateString(),
  };

  return (
    <div className="h-[80vh] flex items-center justify-center px-4 bg-transparent relative">

      {/* Main Glass Card - Rounded 8px */}
      <div className="relative max-w-lg w-full backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-[8px] shadow-2xl overflow-hidden">

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="relative p-3 bg-amber-500/20 rounded-[4px]">
             <Crown size={32} className="text-amber-500" />
             <div className="absolute -top-1 -right-1">
               <CheckCircle2 size={16} className="text-white fill-amber-500" />
             </div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white md:text-black">
              Upgrade Successful
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 md:text-black/60">
              Elite Membership Active
            </p>
          </div>
        </div>

        {/* Success Details Section */}
        <div className="space-y-6 mb-10 text-left">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <span className="text-[11px] font-bold uppercase text-white/50 md:text-black/50">Plan</span>
            <span className="text-sm font-bold text-amber-500 uppercase">Premium Tier</span>
          </div>

          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <span className="text-[11px] font-bold uppercase text-white/50 md:text-black/50">Amount</span>
            <span className="text-lg font-black text-white md:text-black">{details.amount}</span>
          </div>

          {/* Transaction Metadata Plate */}
          <div className="bg-black/20 md:bg-white/5 p-5 rounded-[4px] border border-white/5">
            <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-bold uppercase text-white/40 md:text-black/40 tracking-wider flex items-center gap-1">
                 <ShieldCheck size={12} /> Transaction ID
               </span>
               <span className="text-[10px] font-mono text-white/60 md:text-black/60">{details.paymentId}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold uppercase text-white/40 md:text-black/40 tracking-wider">Confirmed On</span>
               <span className="text-[10px] font-mono text-white/60 md:text-black/60">{details.date}</span>
            </div>
          </div>
        </div>

        {/* Action: Single Primary Button */}
        <div className="flex flex-col gap-3">
          <Link
            to="/feed"
            className="w-full flex items-center justify-center gap-3 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black uppercase text-xs tracking-[0.2em] rounded-[4px] transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            Enter the Feed
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Reference Footer */}
        <div className="mt-8 flex justify-between items-center opacity-30 text-[9px] font-mono text-white md:text-black uppercase">
          <span>DevTinder Elite Cloud</span>
          <span>ORD: {details.orderId}</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumSuccess;
