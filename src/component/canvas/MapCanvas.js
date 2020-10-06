import React, { useEffect, useState , useRef} from "react";

const MapCanvas = (props) => {
    const [size, setSize] = useState([])

    const canvasRef = useRef(null);
    const ref = useRef(null);

    useEffect(() => {
        const getSize = props.size.current.getBoundingClientRect();
        setSize([getSize.width,getSize.height])
    }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = imgRef.current;
//       ctx.font = "40px Courier";

//   }, []);



  return (
    <div ref={ref}>
      <canvas ref={canvasRef} width={size[0]} height={size[1]} />
    </div>
  );
};

export default MapCanvas;
