import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import SquareButton from "../buttons/SquareButton";

const RecapPostContainer = (props) => {
  const [editImage, setEditImage] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editText, setEditText] = useState(false);

  const [imgUrl, setImgUrl] = useState(``);
  const [title, setTitle] = useState(``);
  const [story, setStory] = useState(``);

  const firstUpdate = useRef(true);

  useEffect(() => {
    setImgUrl(props.img);
    setTitle(props.title);
    setStory(props.story);
    props.img === `` && setEditImage(true);
    props.title === `` && setEditTitle(true);
    props.story === `` && setEditText(true);
  }, [props.img,props.title,props.story]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    imgUrl === `` && setEditImage(true);
    title === `` && setEditTitle(true);
    story === `` && setEditText(true);
  }, [editImage, editTitle, editText, imgUrl , title , story]);


  const editNewImg = !editImage ? (
    <img
      alt="header img"
      src={imgUrl}
      onDoubleClick={() => setEditImage(true)}
    />
  ) : (
    <input
      type="text"
      placeholder="img url"
      value={imgUrl}
      onChange={(e) => setImgUrl(e.target.value)}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          props.handleUpdate({ imgSrc: imgUrl }, props.id);
          setEditImage(false);
        }
      }}
    />
  );

  const editNewTitle = !editTitle ? (
    <h2 onDoubleClick={() => setEditTitle(true)}>{title}</h2>
  ) : (
    <input
      type="text"
      placeholder="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          props.handleUpdate({ title: title }, props.id);
          setEditTitle(false);
        }
      }}
    />
  );

  const editNewStory = !editText ? (
    <span className="main-body__story" onDoubleClick={() => setEditText(true)}>
      {story}
    </span>
  ) : (
    <div className="main-body__fit">
      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
      ></textarea>
      <SquareButton
        background="#0185ff"
        value="Update"
        clickHandler={() => {
          props.handleUpdate({ story: story }, props.id);
          setEditText(false);
        }}
      />
    </div>
  );

  return (
    <div className="recap-template">
      <div className="img-header">{editNewImg}</div>
      <div className="main-body">
        <div className="main-body__title">{editNewTitle}</div>
        {editNewStory}
      </div>
      <div className="footer-Options">
        <SquareButton
          background="#2f4c58"
          value="remove"
          clickHandler={() => {
            props.removeRecapHendler(props.id);
          }}
        />
      </div>
    </div>
  );
};

export default RecapPostContainer;
