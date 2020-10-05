import React, { useState } from "react";
import "../style-map/NewNote.css";
import Util from '../utility/Util';




const NewNote = (props) => {
  const [value, setValue] = useState('');
  const background = Util.noteBackGround();

  const mystyle = {
    top: `${props.top}%`,
    left: `${props.left}%`,
    backgroundImage: `url(${background})`,
  };
  return (
    <div className="newNote" style={mystyle}>
      <textarea
        type="text"
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button
        onClick={() => props.saveNewCard({ top: props.top, left: props.left, value })}
      >
        click
      </button>
    </div>
  );
};

export default NewNote;
