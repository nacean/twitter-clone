import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../myBase";

function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [updateNweet, setUpdateNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(db, "nweets", nweetObj.id));
      if (nweetObj.attachmentUrl) {
        const urlRef = ref(storage, nweetObj.attachmentUrl);
        await deleteObject(urlRef);
      }
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
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              alt="shortcut"
              width="50px"
              height="50px"
            ></img>
          )}
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
