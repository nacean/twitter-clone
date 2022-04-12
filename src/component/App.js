import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../myBase.js";
import Router from "./Router.js";
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
        "Initializing..."
      )}
    </>
  );
}

export default App;
