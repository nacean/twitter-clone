import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../route/Auth";
import Home from "../route/Home";
import Profile from "../route/Profile";
import Navigation from "./Navigation";
function Router({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="Profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
}

export default Router;
