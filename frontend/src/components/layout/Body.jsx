import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../util/constent";
import { useEffect, useState } from "react";
import ErrorModal from "../util/ErrorModal";

function Body() {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }

      setShowModal({
        open: true,
        errorMessage: error.response?.data?.message,
      });
    }
  };

  useEffect(() => {
    if (!userData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-base-200">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>

        <ErrorModal
          title="Error"
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
