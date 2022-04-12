import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../component/Nweet";
import { db } from "../myBase";

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setNweet("");
    } catch (error) {
      alert(error);
    }
  };

  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="What is on your mind?"
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
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
