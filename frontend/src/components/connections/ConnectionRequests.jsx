import { useSelector } from "react-redux";
import ConnectionRequest from "./ConnectionRequest";
import GlassmorphismLayout from "../util/Glassmorphismlayout";
import { Users, Activity, Layers } from "lucide-react";

export default function ConnectionRequests() {
  const requests = useSelector((store) => store.connectionRequests);

  // ✅ Filter out invalid requests for accurate count
  const validRequests = requests?.filter((request) => request && request._id && request.fromUserId) || [];

  return (
    <GlassmorphismLayout
      backgroundImage="/assets/bgc-1.jpg"
      mobileBackgroundImage="/assets/c1.jpg"
      overlayStyle="editorial"
      loaderDuration={1000}
      showShutterEffect={true}
    >
      <div className="min-h-screen w-full flex flex-col items-center px-4 sm:px-6 py-10 sm:py-20">
        <div className="w-full max-w-4xl">

          {/* MINIMALIST HEADER */}
          <div
            className="mb-12 border-b border-white/10 pb-10"
            style={{
              opacity: 0,
              animation: "fadeIn 0.8s ease-out forwards",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 opacity-50">
                  <Activity size={14} className="text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Inbound Signals</span>
                </div>
                <h1 className="text-white sm:text-black text-4xl sm:text-5xl  tracking-tight font-bold">
                  Connection <span className="font-bold">Requests</span>
                </h1>
              </div>

              {/* Minimalist Glass Chip */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 self-start md:self-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-black">
                  {validRequests.length} Pending
                </p>
              </div>
            </div>
          </div>

          {/* REQUESTS LIST */}
          <div className="space-y-4">
            {validRequests.length > 0 ? (
              validRequests.map((request, index) => (
                <div
                  key={request._id}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.6s ease-out ${0.1 * (index + 1)}s forwards`,
                  }}
                >
                  <ConnectionRequest request={request} />
                </div>
              ))
            ) : (
              /* EMPTY STATE - MINIMALIST */
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-16 sm:p-24 flex flex-col items-center text-center"
                style={{ animation: "fadeIn 1s ease-out forwards" }}
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Layers size={32} className="text-white/20" strokeWidth={1} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-white text-xl font-medium tracking-tight">
                    Inbox Clear
                  </h3>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                    No pending protocols at this time
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Minimalist Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </GlassmorphismLayout>
  );
}
