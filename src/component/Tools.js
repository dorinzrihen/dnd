import React, { useState, useEffect } from "react";
import "../style-map/Tools.css";
import ToolBtn from './ToolBtn'

const Tools = (props) => {
    let displayTools = [];
    for(const tool in props.tools){
        const btn = <ToolBtn key={tool} click={() => {props.changeTool(props.tools[tool])}} title={props.tools[tool]}/>
        displayTools.push(btn);
    }
  return (
    <div className="tools">
        {displayTools}
    </div>
  );
};

export default Tools;
