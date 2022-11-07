import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { dbService } from "Myfirebase";

const Xweet = ({ xweetObj, isOwner }) => {
  const storage = getStorage();
  const [editing, setEditing] = useState(false);
  const [newXweet, setnewXweet] = useState(xweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 지우시겠습니까?");
    if (ok) {
      //delete xweet
      await deleteDoc(doc(dbService, "xweets", xweetObj.id));
      await deleteObject(ref(storage, xweetObj.attachmentURL));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "xweets", xweetObj.id), {
      text: newXweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewXweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              {" "}
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  value={newXweet}
                  onChange={onChange}
                  required
                  autoFocus
                  className="formInput"
                />
                <input type="submit" value="Update Xweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                취소
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{xweetObj.text}</h4>
          {xweetObj.attachmentURL && <img src={xweetObj.attachmentURL} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Xweet;
