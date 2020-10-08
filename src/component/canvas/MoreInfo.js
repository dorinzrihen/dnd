import React ,{ useState } from "react";

const MoreInfo = (props) => {
    const [value,setValue] = useState('');
  return <div className="moreInfoSelectArea">
      <input type="text" placeholder={props.value} onChange={(e) => setValue(e.target.value)}/>
      <button>Add map title</button>
  </div>
};

export default MoreInfo;
