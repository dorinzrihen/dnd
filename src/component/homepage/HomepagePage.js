import React from "react";

const HomepagePage = (props) => {
  return (
    <div className="infoConatiner">
      <img src={props.img} alt="" />
      <h2>{props.title}</h2>
      <p>{props.info}</p>
    </div>
  );
};

export default HomepagePage;
