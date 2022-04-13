import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../route/Auth";
import Home from "../route/Home";
import Profile from "../route/Profile";
import Navigation from "./Navigation";
function Router({ isLoggedIn, userObj }) {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="Profile" element={<Profile userObj={userObj} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
}

export default Router;
