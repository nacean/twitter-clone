import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../myBase";

function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [updateNweet, setUpdateNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(db, "nweets", nweetObj.id));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChangeUpdate = ({ target: { value } }) => {
    setUpdateNweet(value);
  };

  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "nweets", nweetObj.id);
    await updateDoc(updateRef, {
      text: updateNweet,
    });
    toggleEditing();
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onUpdateSubmit}>
            <input type="text" value={updateNweet} onChange={onChangeUpdate} />
            <input type="submit" value="update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Nweet;
