import React from "react";
import DescriptionInfo from "./description/DescriptionInfo";
import "../style-map/MapDescription.css";
import SquareButton from "./buttons/SquareButton";

const MapDescription = (props) => {
  function updateInfo(click) {
    props.updateInfo(click);
  }
  
  const descriptionTitle = ['notes','pin'];

  let description = [];

  for (const title of descriptionTitle){
    const obj = (
      <DescriptionInfo
        updateInfo={updateInfo}
        key={title}
        objValue={title}
        returnVal={title}
        isClicked={true}
      />
    );

    description.push(obj);
  }

  for (const map of props.mapSelect) {
    const obj = (
      // eslint-disable-next-line
      <div key={map.title.value} key={map.id+999}>
        <DescriptionInfo
          updateInfo={updateInfo}
          key={map.id}
          objValue={map.title.value}
          returnVal={map.id}
          isClicked={true}
        />
        <SquareButton key={map.id+305} background="#787878" value="Remove" clickHandler={()=>props.removeMap(map.id)}/>
      </div>
    );
    description.push(obj);
  }

  return <div className="mapDescription">{description}</div>;
};

export default MapDescription;
