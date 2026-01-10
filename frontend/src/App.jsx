import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Provider } from "react-redux";
import store from "./util/store";
import Feed from "./components/Feed";
import ConnectionRequests from "./components/ConnectionRequests";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/login" element={<Login signUp={false} />}/>
            <Route path="/signUp" element={<Login signUp={true} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/theme" element={<ThemeSwitcher />} />
            <Route path="/requests" element={<ConnectionRequests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
