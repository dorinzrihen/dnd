import React, { useState , useRef } from "react";

const MoreInfo = (props) => {
  const [value, setValue] = useState("");
  const ref = useRef();

  return (
    <div className="moreInfoSelectArea">
      <input
        type="text"
        placeholder={props.value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button ref={ref} onClick={()=>{
        ref.current.setAttribute("disabled", "disabled");
        props.saveInfo({ value })}}>Create</button>
    </div>
  );
};

export default MoreInfo;
