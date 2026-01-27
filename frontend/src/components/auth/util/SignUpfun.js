import axios from "axios";
import { BASE_URL } from "../../util/constent";
import reset from "./resetFields";

async function handleSignUp(signUpData) {
  await axios.post(
    `${BASE_URL}/signUp`,
    {
      ...signUpData,
    },
    { withCredentials: true },
  );
}

export default handleSignUp;
