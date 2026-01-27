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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/devtinder">
        <Routes>
          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login signUp={false} />} />
          <Route path="/signUp" element={<Login signUp={true} />} />
          <Route path="/otp" element={<OTPInput/>}/>

          {/* 🔒 PROTECTED ROUTES */}
          <Route element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile" element={<Login edit={true} />} />
            <Route path="/theme" element={<ThemeSwitcher />} />
            <Route path="/requests" element={<ConnectionRequests />} />
            <Route path="/connections" element={<Connections />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
