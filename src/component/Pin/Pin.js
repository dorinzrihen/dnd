import React, { useState } from "react";
import SquareButton from "../buttons/SquareButton"; 

const Pin = (props) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const openBtn = () => {
    setOpen(true);
  };

  
  function handleDelete() {
    if (open) {
      props.onDelete(props.id);
    }
  }

  const mystyle = {
    top: `${props.top}%`,
    left: `${props.left}%`,
    backgroundImage: `url(${props.noteSrc})`,
  };
  const data = props.value ? (
    <p>{props.value}</p>
  ) : (
    <input
      type="text"
      onChange={(e) => setValue(e.target.value)}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
            props.saveNew({y: props.top, x: props.left, info:value})
        }
      }}
    />
  );

  const addedElement = (
    <div>
      <SquareButton background="#B31004" value="X" clickHandler={handleDelete} />
    </div>
  );

  const visibale = props.isVisibale ? "" : "remove-object";

  return (
    <div className = {`Pin ${visibale}`} style={mystyle} onClick={openBtn} onMouseLeave={() => {setOpen(false);
      }}>
      <img
        src="https://res.cloudinary.com/dqrxjebxc/image/upload/v1602242822/pin/Pin_jzg633.png"
        alt="pin"
      />
      {data}
      {(open && props.value )&& addedElement}
    </div>
  );
};

export default Pin;
