import { useSelector } from "react-redux";
import ConnectionRequest from "./ConnectionRequest";

export default function ConnectionRequests() {
  const requests = useSelector((store) => store.connectionRequests);

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
            requests.map((request) => <ConnectionRequest request={request} key={request._id} />)
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
    </div>
  );
}
