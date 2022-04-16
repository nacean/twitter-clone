import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nweet from "../component/Nweet";
import { auth, db } from "../myBase";
import "../css/Profile.css";
import { Button } from "react-bootstrap";

function Profile({ userObj }) {
  const [myNweets, setMyNweets] = useState([]);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(db, "nweets"),
      where("creatorId", "==", `${userObj.uid}`)
    );
    onSnapshot(q, (snapshot) => {
      const snapArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyNweets(snapArr);
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <section className="profileContainer">
      <Button
        size="lg"
        variant="danger"
        onClick={onLogOutClick}
        className="mb-5"
      >
        Log Out
      </Button>
      <div>
        {myNweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
