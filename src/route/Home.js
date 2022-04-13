import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../component/Nweet";
import { db } from "../myBase";
import NweetForm from "../component/NweetForm";

function Home({ userObj }) {
  const [nweetGroup, setNweetGroup] = useState([]);

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
    <div>
      <NweetForm userObj={userObj} />
      <div>
        {nweetGroup.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
