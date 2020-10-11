import React, { useEffect, useState, useRef } from "react";
import Util from '../../utility/Util'

const MapCanvas = (props) => {
  const [size, setSize] = useState([]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const getSize = props.size.current.getBoundingClientRect();
    setSize([getSize.width, getSize.height]);
  }, [props.size]);


  const setPoints = (ctx, points, color=120) => {
    ctx.fillStyle = `hsla(${color},100%,50%,0.3)`;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, size[0], size[1]);
    if (props.points.length) {
      setPoints(ctx, props.points);
    }
    if (props.fullMapsPoints.length) {
      for (const map of props.fullMapsPoints) {
        const backToPoints = Util.getBackCoordinate(map.mapCoordinate , props.size);
        if(props.unShow.indexOf(map.id) === -1){
          setPoints(ctx, backToPoints, map.color);
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    draw(ctx);
  }, [draw]);

  return (
    <>
      <canvas
        className="canvas"
        ref={canvasRef}
        width={size[0]}
        height={size[1]}
      />
    </>
  );
};

export default MapCanvas;
