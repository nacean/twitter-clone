import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../myBase";
import { Card, Button } from "react-bootstrap";
import "../css/Nweet.css";
import ImgMordal from "./ImgMordal";

function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [updateNweet, setUpdateNweet] = useState(nweetObj.text);
  const [modalShow, setModalShow] = useState(false);

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
    <section>
      <Card style={{ width: "500px", height: "120px" }} className="mb-3">
        <Card.Header>{nweetObj.nickName}</Card.Header>
        {editing ? (
          <Card.Body>
            <form onSubmit={onUpdateSubmit}>
              <input
                type="text"
                value={updateNweet}
                onChange={onChangeUpdate}
                className="editTextBox"
              />
              <div className="nweetButtons">
                <Button size="sm" type="submit">
                  Update
                </Button>{" "}
                <Button size="sm" variant="danger" onClick={toggleEditing}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Text>{nweetObj.text}</Card.Text>
            {nweetObj.attachmentUrl && (
              <img
                className="thumbnail"
                src={nweetObj.attachmentUrl}
                alt="shortcut"
                onClick={() => {
                  setModalShow(true);
                }}
              ></img>
            )}
            {isOwner && (
              <div className="nweetButtons">
                <Button size="sm" onClick={toggleEditing}>
                  Edit
                </Button>{" "}
                <Button size="sm" variant="danger" onClick={onDeleteClick}>
                  Delete
                </Button>
              </div>
            )}
            <ImgMordal
              show={modalShow}
              onHide={() => setModalShow(false)}
              imgsrc={nweetObj.attachmentUrl}
            />
          </Card.Body>
        )}
      </Card>
    </section>
  );
}
export default Nweet;
