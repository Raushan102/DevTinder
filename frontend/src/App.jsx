import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import LandingPage from "./components/layout/LandingPage";
import Login from "./components/auth/Login";
import Body from "./components/layout/Body";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import ThemeSwitcher from "./components/util/ThemeSwitcher";
import ConnectionRequests from "./components/connections/ConnectionRequests";
import Connections from "./components/connections/Connections";
import OTPInput from "./components/auth/OTPVerification/OTPInput";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import TermsOfService from "./components/policies/TermsOfService";
import RefundPolicy from "./components/policies/RefundPolicy";
import ContactUs from "./components/policies/ContactUs";
import AboutUs from "./components/policies/AboutUs";
import Team from "./components/policies/Team";
import PaymentForm from "./components/payment/Membership";
import PremiumSuccess from "./components/payment/PremiumSuccess";
import PremiumFailed from "./components/payment/PremiumFailed";
import ScrollToTop from "./components/util/ScrollToTop";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/devtinder">
        <ScrollToTop />

        <Routes>
          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login signUp={false} />} />
          <Route path="/signUp" element={<Login signUp={true} />} />
          <Route path="/otp" element={<OTPInput />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile" element={<Login edit={true} />} />
            <Route path="/theme" element={<ThemeSwitcher />} />
            <Route path="/requests" element={<ConnectionRequests />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/paymentForm" element={<PaymentForm />} />
            <Route path="/premium-success" element={<PremiumSuccess />} />
            <Route path="/premium-failed" element={<PremiumFailed />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
