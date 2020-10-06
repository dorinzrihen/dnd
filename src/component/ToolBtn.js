import React, { Component } from "react";

const ToolBtn = (props) => {
  return <button onClick={() => {props.click()}}>{props.title}</button>;
};

export default ToolBtn;
