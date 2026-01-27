import axios from "axios";
import { BASE_URL } from "../../util/constent";
async function sendOtp(email) {
  const response = await axios.post(
    `${BASE_URL}/otp/send-otp`,
    {
      email: email,
    },
    {
      withCredentials: true,
    },
  );
  return response;
}
export default sendOtp;
