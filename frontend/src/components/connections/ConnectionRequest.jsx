import { Check, X, MapPin, Briefcase, Code, User, Mail, Calendar, Sparkles } from "lucide-react";
import { removeConnectionRequest } from "../../store/ConnectionRequestSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { addUser } from "../../store/userSlice";
import { useState } from "react";
import ErrorModal from "../util/ErrorModal";
import Notification from "../util/Notification";

const ConnectionRequest = ({ request }) => {
  const dispatch = useDispatch();

  // ✅ Safety check: If request or sender is invalid, don't render
  if (!request || !request._id || !request.fromUserId) {
    console.warn('Invalid request data:', request);
    return null;
  }

  const sender = request.fromUserId;

  const [loading, setLoading] = useState({
    accepted: false,
    rejected: false,
  });

  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const requestAcceptedOrRejected = async (id, status) => {
    setLoading((previousState) => ({
      ...previousState,
      [status]: true,
    }));

    try {
      const result = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      setNotify({
        open: true,
        type: "success",
        message: `Connection ${status} successfully`,
      });

      if (result) {
        setTimeout(() => {
          dispatch(removeConnectionRequest(id));
          dispatch(addUser(result.data.data));
        }, 500);
      }
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage:
          error?.response?.data?.message ||
          error?.data?.message ||
          `Something went wrong while ${status} request`,
      });
    } finally {
      setLoading({ accepted: false, rejected: false });
    }
  };

  return (
    <>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden hover:bg-white/15 transition-all duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* LEFT: PROFILE PHOTO */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden border-4 border-white/30 shadow-2xl">
                {sender.photoUrl ? (
                  <img
                    src={sender.photoUrl}
                    alt={`${sender.firstName} ${sender.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <User size={48} className="text-white sm:text-black opacity-50" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            </div>

            {/* MIDDLE: PROFILE INFO */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              {/* Name & Badge */}
              <div>
                <h2
                  className="text-white sm:text-black text-2xl sm:text-3xl font-semibold mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {sender.firstName}{" "}
                  <span className="text-black">{sender.lastName}</span>
                </h2>

                <div className="inline-block px-3 py-1 bg-orange-400/20 border border-orange-400/30 text-black text-[10px] uppercase tracking-[0.15em] font-bold">
                  New Request
                </div>
              </div>

              {/* Quick Info Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {sender.age && (
                  <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                    <Calendar size={12} strokeWidth={2.5} />
                    <span>{sender.age} Years</span>
                  </div>
                )}

                {sender.gender && (
                  <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                    <MapPin size={12} strokeWidth={2.5} />
                    <span>{sender.gender}</span>
                  </div>
                )}

                {sender.profession && (
                  <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                    <Briefcase size={12} strokeWidth={2.5} />
                    <span>{sender.profession}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              {sender.email && (
                <div className="backdrop-blur-md bg-white/5 border border-white/20 p-3 inline-block">
                  <p className="text-white sm:text-black text-xs font-semibold flex items-center gap-2">
                    <Mail size={14} strokeWidth={2.5} className="text-black" />
                    {sender.email}
                  </p>
                </div>
              )}

              {/* About */}
              {sender.about && (
                <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
                  <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-black mb-2 flex items-center gap-2">
                    <Sparkles size={12} strokeWidth={2.5} />
                    About
                  </p>
                  <p className="text-white sm:text-black text-sm leading-relaxed italic">
                    "{sender.about.length > 150 ? sender.about.substring(0, 150) + "..." : sender.about}"
                  </p>
                </div>
              )}

              {/* Skills */}
              {sender.skills && sender.skills.length > 0 && (
                <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
                  <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-black mb-3 flex items-center gap-2">
                    <Code size={12} strokeWidth={2.5} />
                    Skills
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {sender.skills.slice(0, 6).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-orange-400/20 text-black border border-orange-400/30 text-[10px] font-bold uppercase tracking-[0.1em]"
                      >
                        {skill}
                      </span>
                    ))}
                    {sender.skills.length > 6 && (
                      <span className="px-3 py-1.5 bg-white/10 text-white sm:text-black border border-white/20 text-[10px] font-bold uppercase tracking-[0.1em]">
                        +{sender.skills.length - 6} More
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: ACTION BUTTONS */}
            <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto lg:min-w-[140px]">
              {/* ACCEPT BUTTON */}
              <button
                onClick={() => requestAcceptedOrRejected(request._id, "accepted")}
                disabled={loading.accepted || loading.rejected}
                className="relative flex-1 lg:flex-none px-6 py-4 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold overflow-hidden group transition-colors duration-300 border border-white/30 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out group-disabled:transform-none"></span>
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                  {loading.accepted ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <Check size={16} strokeWidth={2.5} />
                      <span>Accept</span>
                    </>
                  )}
                </span>
              </button>

              {/* REJECT BUTTON */}
              <button
                onClick={() => requestAcceptedOrRejected(request._id, "rejected")}
                disabled={loading.accepted || loading.rejected}
                className="relative flex-1 lg:flex-none px-6 py-4 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold overflow-hidden group transition-colors duration-300 border border-white/30 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0  text-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out group-disabled:transform-none"></span>
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                  {loading.rejected ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <X size={16} strokeWidth={2.5} />
                      <span>Ignore</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS & NOTIFICATIONS */}
      <ErrorModal
        title="Request Error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
      />

      <Notification
        open={notify.open}
        type={notify.type}
        message={notify.message}
        duration={2000}
        onClose={() => setNotify((p) => ({ ...p, open: false }))}
      />
    </>
  );
};

export default ConnectionRequest;
