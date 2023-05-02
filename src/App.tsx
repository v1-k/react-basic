import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Protected from "./components/Protected";
import Navigation from "./components/Navigation";
import Logout from "./components/Logout";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");

  function setToken(token: string) {
    console.log("token");
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const decodedUser = jwtDecode<{ username: string }>(token);
    Cookies.set("access_token", token, {
      expires: new Date(decodedToken.exp * 1000),
    });
    Cookies.set("username", decodedUser.username, {
      expires: new Date(decodedToken.exp * 1000),
    });
    setUsername(decodedUser.username);
    setLoggedIn(true);
  }
  function getUsername() {
    const x = Cookies.get("username");
    return x;
  }
  function getToken() {
    const x = Cookies.get("access_token");
    return x;
  }

  function removeToken() {
    Cookies.remove("access_token");
    setLoggedIn(false);
  }

  useEffect(() => {
    if (getToken()) {
      setLoggedIn(true);
      setUsername(getUsername());
    } else {
      setLoggedIn(false);
      setUsername("");
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Navigation loggedIn={loggedIn} userName={userName} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/protected"
            element={<Protected getToken={getToken} />}
          />
          <Route
            path="/logout"
            element={<Logout removeToken={removeToken} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
