import React, { Component } from "react";

const DescriptionInfo = (props) => {
  return (
    <div className="descriptionInfo">
      <input
        type="checkBox"
        defaultChecked={props.isClicked}
        onChange={(e) => props.updateInfo(e.target.checked, props.objValue)}
      />
      <p>{props.objValue}</p>
    </div>
  );
};

export default DescriptionInfo;
