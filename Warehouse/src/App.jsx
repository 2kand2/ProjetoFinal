import React from "react";
import { UserStorage } from "./UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Components/Login/Login";
import ProtectedRouter from "./Components/Helper/ProtectedRouter";

import "./App.css";
import Home from "./Components/Home";
import NotFound from "./Components/Helper/NotFound";

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/" element={<Login />} end />
          <Route
            path="home/*"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
