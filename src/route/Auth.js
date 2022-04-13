import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../myBase";
import AuthForm from "../component/AuthForm";

function Auth() {
  const [newAccount, setNewAccount] = useState(false);

  const toggleAccount = () => {
    const opposite = !newAccount;
    setNewAccount(opposite);
  };

  const goggleLogin = async (e) => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm newAccount={newAccount} />
      <div>
        <button onClick={toggleAccount}>toggle</button>
        <button onClick={goggleLogin}>Continue with Goggle</button>
      </div>
    </div>
  );
}

export default Auth;
