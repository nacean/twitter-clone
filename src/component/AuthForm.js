import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../myBase";
import { Form, FloatingLabel, Button } from "react-bootstrap";

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
    <Form onSubmit={onSubmit} className="w-25 mt-5">
      <Form.Group className="mb-3">
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={onChange}
            required
          ></Form.Control>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onChange}
            required
          ></Form.Control>
        </FloatingLabel>
      </Form.Group>
      <div className="d-grid my-3">
        <Button variant="primary" size="lg" type="submit">
          {newAccount ? "Sign In" : "Log In"}
        </Button>
      </div>
    </Form>
  );
}

export default AuthForm;
