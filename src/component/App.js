import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../myBase.js";
import Router from "./Router.js";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    setInit(true);
  });

  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing..."}</>;
}

export default App;
