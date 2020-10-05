import React, { Component } from "react";
import "../style-map/Note.css";

const background = `http://www.up2me.co.il/imgs/45208150.png`;



const Note = (props) => {
  const mystyle = {
    top: props.top,
    left: props.left,
    backgroundImage: `url(${background})`
  };
  return (
    <div className="note" style={mystyle}>
      <p>test שמג sdfs</p>
    </div>
  );
};

export default Note;
