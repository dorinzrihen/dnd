import React, { useState } from "react";
import SquareButton from "../buttons/SquareButton";
import "../.././style-map/MapNotification.css";

const AddNewMapMsg = (props) => {
  const [value, setValue] = useState("");
  return (
    <div className="MapNotification">
      <div className="notification">
        <input
          type="text"
          placeholder="Map Url"
          onChange={(e) => setValue(e.target.value)}
        />
        <SquareButton
          background="#0185ff"
          value="Create"
          clickHandler={() => props.createNewMap({ value })}
        />
      </div>
    </div>
  );
};

export default AddNewMapMsg;
