import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../myBase";

function AuthForm({ newAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = ({ target: { name, value } }) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(data);
      } else {
        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={onChange}
        required
      />
      <input type="submit" value={newAccount ? "Sign In" : "Log In"} />
    </form>
  );
}

export default AuthForm;
