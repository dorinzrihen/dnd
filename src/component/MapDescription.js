import React, { Component } from "react";
import styled from "styled-components";
import DescriptionInfo from './description/DescriptionInfo';
import '../style-map/MapDescription.css'


const MapDescription = (props) => {
  function updateInfo(click,value){
    let newValue = props.options;
    newValue[value] = click;
    props.updateInfo(newValue);
  }

  let description = [];
  for(const [key, value] of Object.entries(props.options)){
    const obj = <DescriptionInfo updateInfo={updateInfo} key={key} objValue={key} isClicked={value}/>
    description.push(obj);
  }


  return (
    <div className="mapDescription">
      {description}
    </div>
  );
};

export default MapDescription;
