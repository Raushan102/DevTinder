import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Provider } from "react-redux";
import store from "./util/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/theme" element={<ThemeSwitcher />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
