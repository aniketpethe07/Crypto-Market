import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Info from "./Components/Info";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./Components/Cart";
import { loginContext } from "./Context/context";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutus" element={<Navbar />} />
            {/* Use an inline function to conditionally render */}
            <Route
              path="/home"
              element={loggedIn ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/info"
              element={loggedIn ? <Info /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/cart"
              element={loggedIn ? <Cart /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </BrowserRouter>
      </loginContext.Provider>
    </div>
  );
}

export default App;
