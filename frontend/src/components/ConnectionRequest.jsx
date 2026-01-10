import React from "react";
import { Check, X, MapPin, Briefcase, Code } from "lucide-react";
import LoaderButton from "./loaderButton";

const ConnectionRequest = ({ request, onAcceptorReject, loading }) => {
  const user = request.fromUserId;

  return (
    <div className="card card-side bg-base-100 shadow-xl border-l-[6px] border-primary  hover:bg-base-200/50 transition-all duration-300">
      <div className="card-body p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left: Avatar with Secondary Ring */}
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-4">
              <img
                src={user.photoUrl || "https://via.placeholder.com/150"}
                alt={user.firstName}
              />
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-1 space-y-2 text-center lg:text-left">
            <div>
              <h2 className="card-title text-2xl font-bold inline-block mr-2">
                {user.firstName} {user.lastName}
              </h2>
              <div className="badge badge-secondary badge-outline font-bold">
                New Request
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <span className="flex items-center gap-1 text-sm opacity-70">
                <Briefcase size={14} className="text-primary" />
                {user.role || "Professional"}
              </span>
              <span className="flex items-center gap-1 text-sm opacity-70">
                <MapPin size={14} className="text-primary" />
                {user.location || "Remote"}
              </span>
            </div>

            {user.about && (
              <p className="text-sm text-base-content/70 italic line-clamp-2 mt-2">
                "{user.about}"
              </p>
            )}

            {/* Skills as DaisyUI Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1 mt-3">
              {user.skills?.map((skill, index) => (
                <div key={index} className="badge badge-primary badge-sm gap-1">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-row  lg:flex-col gap-2 w-full lg:w-auto">
            <button
              onClick={() => onAcceptorReject(request._id, "accepted")}
              className="btn btn-primary  flex-1 lg:flex-none gap-2"
            >
              <Check size={18} />
              {loading.state && loading.accepted ? <LoaderButton /> : "Accept"}
            </button>
            <button
              onClick={() => onAcceptorReject(request._id, "rejected")}
              className="btn btn-ghost  text-error hover:bg-error/10 flex-1 lg:flex-none gap-2"
            >
              <X size={18} />
              {loading.state && loading.rejected ? <LoaderButton /> : "Ignore"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequest;
