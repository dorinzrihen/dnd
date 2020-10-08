import React, { useState, useEffect } from "react";
import Util from "../utility/Util";
import "../style-map/Note.css";
import SquareButton from "./buttons/SquareButton";

const Note = (props) => {
  const [open, setOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [value, setValue] = useState(props.info);

  const mystyle = {
    top: `${props.top}%`,
    left: `${props.left}%`,
    backgroundImage: `url(${props.noteSrc})`,
  };

  const openBtn = () => {
    setOpen(true);
  };

  function handleDelete() {
    if (open) {
      setUpdateMode(false);
      props.onDelete(props.id);
    }
  }

  function handleUpdate() {
    if (updateMode) {
      props.onUpdate(props.id, value);
      setUpdateMode(false);
    } else {
      setUpdateMode(true);
    }
  }

  const AddedElement = (
    <div>
      <SquareButton background="#0185ff" value="Update" clickHandler={handleUpdate} />
      <SquareButton background="#B31004" value="Delete" clickHandler={handleDelete} />
    </div>
  );

  const editUpdateMode = (
    <>
      {updateMode ? (
        <textarea
          onChange={(e) => setValue(e.target.value)}
          className="note-value"
          type="text"
          value={value}
        ></textarea>
      ) : (
        <p className="note-value">{props.info}</p>
      )}
    </>
  );

  const visibale = props.isVisibale ? "" : "remove-object";

  return (
    <div
      className={`note ${visibale}`}
      style={mystyle}
      onClick={openBtn}
      onMouseLeave={() => {
        !updateMode && setOpen(false);
      }}
    >
      {editUpdateMode}
      {open && AddedElement}
    </div>
  );
};

export default Note;
