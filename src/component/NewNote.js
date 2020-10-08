import React, { useState } from "react";
import "../style-map/NewNote.css";
import SquareButton from "./buttons/SquareButton";

const NewNote = (props) => {
  const [value, setValue] = useState('');


  const mystyle = {
    top: `${props.top}%`,
    left: `${props.left}%`,
    backgroundImage: `url(${props.noteSrc})`,
  };
  return (
    <div className="newNote" style={mystyle}>
      <textarea
        type="text"
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <SquareButton background="#0185ff" value="Create" clickHandler={() => props.saveNewCard({noteBackGround: props.noteSrc, top: props.top, left: props.left, value})} />

    </div>
  );
};

export default NewNote;
