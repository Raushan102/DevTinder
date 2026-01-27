import axios from "axios";
import { BASE_URL } from "../../util/constent";
async function verifyOtp(email, otp) {
  const response = await axios.post(
    `${BASE_URL}/otp/verify-otp`,
    {
      email,
      otp,
    },
    {
      withCredentials: true,
    },
  );
  return response;
}
export default verifyOtp;
