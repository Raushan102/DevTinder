import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionRequest from "./ConnectionRequest";
import { removeConnectionRequest } from "../util/ConnectionRequestSlice";
import axios from "axios";
import { BASE_URL } from "./constent";
import ErrorModal from "./ErrorModal";
export default function ConnectionRequests() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const requests = useSelector((store) => store.connectionRequests);
  const [loading ,setLoading]=useState({
    state:false,
  })

  const requestAcceptedOrRejected = async (id, status) => {
    setLoading({
    state:true,
    [status]:true,
  })
    try {
      const result = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (result) {
        dispatch(removeConnectionRequest(id));
      }

      setLoading(false)
    } catch (error) {
      console.log(error);
      setShowModal({
        open: true,
        errorMessage:
          error?.response?.data.message ||
          `something went wrong while ${status} request`,
      });
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">
            Connection Requests
          </h1>
          <p className="text-sm opacity-60 mt-2">
            {requests.length} pending request{requests.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <ConnectionRequest
                key={request._id}
                request={request}
                onAcceptorReject={requestAcceptedOrRejected}
                loading={loading}
              />
            ))
          ) : (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12">
                <p className="text-lg opacity-60">
                  No pending connection requests
                </p>
              </div>
            </div>
          )}
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
    </div>
  );
}
