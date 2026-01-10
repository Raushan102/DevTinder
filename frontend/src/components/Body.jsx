import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../util/userSlice";
import axios from "axios";
import { BASE_URL } from "./constent";
import { useEffect, useState } from "react";
import ErrorModal from "./ErrorModal";

function Body() {
  const Dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });
  const [requestCount, setRequestCount] = useState();
  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      Dispatch(addUser(user.data.data));
    } catch (error) {
      if (error.response.data.status === 401) {
        return navigate("/login");
      }

      setShowModal({
        open: true,
        errorMessage: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    !userData && fetchUser();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4">
        <Outlet />
        <ErrorModal
          title="error"
          message={showModal.errorMessage}
          type="error"
          isOpen={showModal.open}
          onClose={() => setShowModal({ open: false, errorMessage: null })}
          redirect="/login"
        />
      </main>

      <Footer />
    </div>
  );
}

export default Body;
