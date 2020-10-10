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
      <SquareButton background="#0185ff" value="Create" clickHandler={() => props.saveNew({noteImg: props.noteSrc, y: props.top, x: props.left, info:value})} />

    </div>
  );
};

export default NewNote;
