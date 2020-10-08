import React, { Component } from "react";
import DescriptionInfo from "./description/DescriptionInfo";
import "../style-map/MapDescription.css";
import SquareButton from "./buttons/SquareButton";

const MapDescription = (props) => {
  function updateInfo(click) {
    props.updateInfo(click);
  }

  let description = [];

  const obj = (
    <DescriptionInfo
      updateInfo={updateInfo}
      key={"notes"}
      objValue={"notes"}
      returnVal={"notes"}
      isClicked={true}
    />
  );

  description.push(obj);

  for (const map of props.mapSelect) {
    const obj = (
      <div key={map.title.value}>
        <DescriptionInfo
          updateInfo={updateInfo}
          key={map.id}
          objValue={map.title.value}
          returnVal={map.id}
          isClicked={true}
        />
        <SquareButton background="#787878" value="Remove" clickHandler={()=>props.removeMap(map.id)}/>
      </div>
    );
    description.push(obj);
  }

  return <div className="mapDescription">{description}</div>;
};

export default MapDescription;
