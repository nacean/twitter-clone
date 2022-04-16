import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../component/Nweet";
import { db } from "../myBase";
import NweetForm from "../component/NweetForm";
import "../css/Home.css";

function Home({ userObj }) {
  const [nweetGroup, setNweetGroup] = useState([]);
  const nickName = userObj.email.split("@")[0];

  const getSnapShot = async () => {
    const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const snapArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweetGroup(snapArr);
    });
  };

  useEffect(() => {
    getSnapShot();
  }, []);

  return (
    <article className="homeContainer">
      <NweetForm userObj={userObj} />
      <div>
        {nweetGroup.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            nickName={nickName}
          />
        ))}
      </div>
    </article>
  );
}

export default Home;
