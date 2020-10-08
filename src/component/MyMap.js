import React from "react";

const MyMap = (props) =>{
  return (
    <>
      <img
        className="imgFormat"
        src={props.backgroundMap}
        alt="map img"
        ismap='true'
      />
    </>
  );
}
export default MyMap;
