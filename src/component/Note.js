import React, { Component } from "react";
import Util from '../utility/Util';
import "../style-map/Note.css";


const Note = (props) => {
  const mystyle = {
    top: `${props.top}%`,
    left: `${props.left}%`,
    backgroundImage: `url(${Util.noteBackGround()})`,
  };

  return (
    <div className="note" style={mystyle}>
      <p className="note-value">{props.info}</p>
    </div>
  );
};

export default Note;
