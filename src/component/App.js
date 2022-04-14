import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../myBase.js";
import Router from "./Router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import "../css/App.css";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        setInit(true);
      } else {
        setIsLoggedIn(false);
        setInit(true);
      }
    });
  });

  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <article className="loading">
          <Spinner animation="border" />
        </article>
      )}
    </>
  );
}

export default App;
