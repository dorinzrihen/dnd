import React from "react";

const SquareButton = (props) => {
  return <button onClick={props.clickHandler}>{props.value}</button>;
};

export default SquareButton;
