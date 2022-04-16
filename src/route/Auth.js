import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../myBase";
import AuthForm from "../component/AuthForm";
import { Image, Button } from "react-bootstrap";
import "../css/Auth.css";

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
    <article className="authContainer">
      <Image src={process.env.PUBLIC_URL + "/images/twitter-logo.svg"} />
      <AuthForm newAccount={newAccount} />
      <div className="d-grid gap-2 w-25">
        <Button variant="primary" size="lg" onClick={toggleAccount}>
          Switch Log in / Sign in
        </Button>
        <Button variant="secondary" size="lg" onClick={goggleLogin}>
          Continue with Goggle
        </Button>
      </div>
    </article>
  );
}

export default Auth;
