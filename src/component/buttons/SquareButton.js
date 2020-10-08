import React from "react";

const SquareButton = (props) => {
  const mystyle = {
    background: props.background,
  };

  return <button className="SquareButton" style={mystyle} onClick={props.clickHandler}>{props.value}</button>;
};

export default SquareButton;
