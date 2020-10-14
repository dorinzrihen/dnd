import React from "react";
import "../style-map/Tools.css";
import ToolBtn from "./ToolBtn";
import SquareButton from "./buttons/SquareButton";

const Tools = (props) => {
  let displayTools = [];
  for (const tool in props.tools) {
    const btn = (
      <ToolBtn
      background={props.tools[tool] === props.toolPicked && "#4897C9" }
        key={tool}
        click={() => {
          props.changeTool(props.tools[tool]);
        }}
        title={props.tools[tool]}
      />
    );
    displayTools.push(btn);
  }
  return (
    <div className="tools">
      <div>{displayTools}</div>
      <SquareButton
        background="#B31004"
        value="X"
        clickHandler={() => {props.handelRemoveMap()}}
      />
    </div>
  );
};

export default Tools;
