const sendEmail = require("../config/sendEmail");
const Otp = require("../model/otp");
const User = require("../model/user");
const validator = require("validator");
const otpTemplate = (otp) => `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #FF4B2B; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">devTinder</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; text-align: center; color: #333333;">
              <h2 style="margin-top: 0;">Verify Your Identity</h2>
              <p style="font-size: 16px; line-height: 24px;">Use the code below to complete your login. This code is valid for 5 minutes.</p>

              <div style="background-color: #f8f9fa; border: 2px dashed #FF4B2B; border-radius: 6px; padding: 20px; margin: 30px 0; display: inline-block;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #FF4B2B;">${otp}</span>
              </div>

              <p style="font-size: 14px; color: #777777;">If you didn't request this code, you can safely ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #999999; font-size: 12px;">
              © 2026 devTinder | raushankumarsaw.in
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// generate a 6 digit otp
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// send otp to the email and crete new otp document
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = validator.isEmail(email);
    if (!checkEmail) {
      return res.status(400).json({
        status: 400,
        message: "invalid email",
      });
    }

    const otp = generateOtp();
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: 400,
        message: "user already exists please login",
      });
    }

    await Otp.findOneAndDelete({ email });
    await new Otp({ email, otp }).save();

    const sendMailParameters = {
      toAddress: email,
      fromAddress: "auth@raushankumarsaw.in",
      subject: "🔐 Your devTinder verification code",
      body: otpTemplate(otp),
      text: `Your devTinder OTP is: ${otp}. Valid for 5 minutes.`,
    };

    const emailResponse = await sendEmail(
      sendMailParameters.toAddress,
      sendMailParameters.fromAddress,
      sendMailParameters.subject,
      sendMailParameters.body,
      sendMailParameters.text,
    );
    res.status(200).json({
      status: 200,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

// verify the otp and return the user data
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
      return res.status(400).json({
        status: 400,
        message: "invalid otp",
      });
    }

    res.status(200).json({
      status: 200,
      message: "otp verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
