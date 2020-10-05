import React, { useState  } from "react";
import "../style-map/NewNote.css";

const background = `http://www.up2me.co.il/imgs/45208150.png`;



const NewNote = (props) => {
    const mystyle = {
      top: `${props.top}%`,
      left: `${props.left}%`,
      backgroundImage: `url(${background})`
    };
    return (
      <div className="note" style={mystyle}>
        <textarea type="text" onChange={(e) =>{console.log(e.target.value);}}></textarea>
        <button>click</button>
      </div>
    );
  
}

export default NewNote;
