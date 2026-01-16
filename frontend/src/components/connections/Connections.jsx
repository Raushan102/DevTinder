import ConnectionList from "./connectionList";
import ChartWindow from "./ChartWindow";
import ErrorModal from "../util/ErrorModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../store/ConnectionsLayer";
import Feed from "../feed/Feed";
import { current } from "@reduxjs/toolkit";
import ViewNavigator from "./ViewNavigator";
function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });
  async function fetchConnections() {
    try {
      setLoading(true);
      const profiles = await axios(`${BASE_URL}/request/connectedDeveloper`, {
        withCredentials: true,
      });
      dispatch(addConnections(profiles.data.data));
    } catch (error) {
  

      setShowModal({
        open: true,
        errorMessage:
          error?.data?.message ||
          `Something went wrong while fetching the connetions request`,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConnections();
  }, [user]);

  return (
    <main className="h-screen w-full flex overflow-hidden bg-base-200">
      <aside className="w-[30vw] hidden sm:block bg-base-100 h-full border-r border-base-300 shadow-xl overflow-hidden">
        <ConnectionList profiles={connections} loading={loading} />
      </aside>

      <section className="flex-1 bg-base-200 min-h-screen">
        <ChartWindow />
      </section>

      <ErrorModal
        title="error"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
        redirect="/requests"
      />

    </main>
  );
}

export default Connections;
