import axios from "axios";
import { BASE_URL } from "../../util/constent";
import reset from "./resetFields";
async function handleloginFunction(
  emailRef,
  passwordRef,
  dispatch,
  addUser,
  setNotify,
  navigate,
) {
  const res = await axios.post(
    `${BASE_URL}/login`,
    {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    },
    { withCredentials: true },
  );
  reset(emailRef, passwordRef);
  dispatch(addUser(res.data.data));
  setNotify({
    open: true,
    type: "success",
    message: "login successful",
  });

  setTimeout(() => {
    navigate("/feed");
  }, 1000);
}

export default handleloginFunction;
