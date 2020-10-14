import React from "react";

const ToolBtn = (props) => {
  const mystyle = {
    background: props.background,
  };

  return <button style={mystyle} onClick={() => {props.click()}}>{props.title}</button>;
};

export default ToolBtn;
