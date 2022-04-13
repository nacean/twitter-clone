import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db, storage } from "../myBase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function NweetForm({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState(null);
  const clearRef = useRef();
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
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={clearRef}
      />
      {attachment && (
        <div>
          <img src={attachment} alt="shortcut" width="50px" height="50px" />
          <button onClick={onClearPhotoClick}>clear</button>
        </div>
      )}
    </form>
  );
}

export default NweetForm;
