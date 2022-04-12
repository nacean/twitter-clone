import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../myBase";

function Profile() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
}

export default Profile;
