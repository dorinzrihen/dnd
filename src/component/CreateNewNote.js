import React, { Component } from "react";
import "../style/Note.css";

class CreateNewNote extends Component {
  render() {
    const mystyle = {
      top: this.props.top,
      left: this.props.left,
      //backgroundImage: this.props.noteBackground
    };
    return (
      <div className="note" style={mystyle}>
        <textarea></textarea>
        <button>click</button>
        <img src="http://www.up2me.co.il/imgs/45208150.png" alt="note" />
      </div>
    );
  }
}

export default CreateNewNote;
