import { Check, X, MapPin, Briefcase, Code } from "lucide-react";
import LoaderButton from "../util/LoaderButton";
import { removeConnectionRequest } from "../../store/ConnectionRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { addUser } from "../../store/userSlice";
import { useState } from "react";
import ErrorModal from "../util/ErrorModal";
import Notification from "../util/Notification";

const ConnectionRequest = ({ request }) => {
  const dispatch = useDispatch(); // ✅ FIX: Added parentheses
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
        message: `connection  ${status} successfully`,
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
          error?.data?.message ||
          `Something went wrong while ${status} request`,
      });
    } finally {
      setLoading({ accepted: false, rejected: false });
    }
  };

  return (
    <div
      key={request._id}
      className="card card-side bg-base-100 shadow-xl border-l-[6px] border-primary hover:bg-base-200/50 transition-all duration-300"
    >
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-4">
              {sender.photoUrl ? (
                <img src={sender.photoUrl} alt={sender.firstName} />
              ) : (
                <div className="bg-secondary/20 flex items-center justify-center text-xl sm:text-2xl font-black">
                  {sender.firstName?.[0]}
                  {sender.lastName?.[0]}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
              <h2 className="card-title text-xl sm:text-2xl font-bold">
                {sender.firstName} {sender.lastName}
              </h2>
              <div className="badge badge-secondary badge-outline font-bold text-xs">
                New Request
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {sender.age && (
                <span className="flex items-center gap-1 text-sm opacity-70">
                  <Briefcase size={14} className="text-primary" />
                  {sender.age} years
                </span>
              )}
              {sender.gender && (
                <span className="flex items-center gap-1 text-sm opacity-70">
                  <MapPin size={14} className="text-primary" />
                  {sender.gender}
                </span>
              )}
            </div>

            {sender.about && (
              <p className="text-sm text-base-content/70 italic line-clamp-2 mt-2">
                "{sender.about}"
              </p>
            )}

            {/* Skills */}
            {sender.skills && sender.skills.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-1 mt-3">
                {sender.skills.map((skill, index) => (
                  <div key={index} className="badge badge-primary badge-sm">
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
            <button
              onClick={() => requestAcceptedOrRejected(request._id, "accepted")}
              className="btn btn-primary btn-sm sm:btn-md flex-1 lg:flex-none gap-2"
            >
              <Check size={18} />
              {loading.accepted ? <LoaderButton /> : "Accept"}
            </button>
            <button
              onClick={() => requestAcceptedOrRejected(request._id, "rejected")}
              className="btn btn-ghost btn-sm sm:btn-md text-error hover:bg-error/10 flex-1 lg:flex-none gap-2"
            >
              <X size={18} />
              {loading.rejected ? <LoaderButton /> : "Ignore"}
            </button>
          </div>
        </div>
      </div>

      <ErrorModal
        title="error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
        redirect="/requests"
      />

      <Notification
        open={notify.open}
        type={notify.type}
        message={notify.message}
        duration={2000}
        onClose={() => setNotify((p) => ({ ...p, open: false }))}
      />
    </div>
  );
};

export default ConnectionRequest;
