import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db, storage } from "../myBase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Form, Button, Stack } from "react-bootstrap";
import "../css/NweetForm.css";
import ImgMordal from "./ImgMordal";

function NweetForm({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [formImgMordal, setFormImgMordal] = useState(false);
  const clearRef = useRef();
  const nickName = userObj.email.split("@")[0];

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let attachmentUrl = null;
      if (attachment) {
        const attachmentRef = ref(storage, `${userObj.uid}/${v4()}`);
        await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(attachmentRef);
      }
      await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
        nickName,
      });
      setNweet("");
      onClearPhotoClick();
    } catch (error) {
      alert(error);
    }
  };

  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };

  const onFileChange = ({ target: { files } }) => {
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finish) => {
      const {
        currentTarget: { result },
      } = finish;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhotoClick = () => {
    setAttachment(null);
    clearRef.current.value = null;
  };
  return (
    <div className="formBox">
      {attachment && (
        <img
          src={attachment}
          alt="shortcut"
          width="50px"
          height="50px"
          className="inputImg"
          onClick={() => {
            setFormImgMordal(true);
          }}
        />
      )}
      <ImgMordal
        show={formImgMordal}
        onHide={() => setFormImgMordal(false)}
        imgsrc={attachment}
      />
      <Form onSubmit={onSubmit} className="mb-5">
        <Form.Control
          type="text"
          as="textarea"
          placeholder="What is on your mind?"
          value={nweet}
          onChange={onChange}
          className="mb-2"
          style={{ resize: "none" }}
        />

        <Stack direction="horizontal" gap={1}>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={clearRef}
            className="w-50"
          />
          {attachment && (
            <Button variant="danger" onClick={onClearPhotoClick}>
              clear
            </Button>
          )}
          <Button type="Submit" className="ms-auto">
            Enter
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

export default NweetForm;
