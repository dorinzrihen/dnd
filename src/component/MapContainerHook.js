import React, { useState, useEffect, useRef } from "react";
import MyMap from "./MyMap";
import DataService from "../utility/DataService";
import Note from "./Note";
import NewNote from "./NewNote";

const MapContainer = (props) => {
  const [response, setResponse] = useState([]);
  const [noteCordineate, setNoteCordineate] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const ref = useRef();

  //run only once
  useEffect(() => {
    (async function () {
      const response = await DataService.get();
      setResponse(response.data);
    })();
  }, []);

  const printMousePos = (event) => {
    if (ref.current.contains(event.target)) {
      return;
    }
    const imgCordination = event.target;
    const left = (event.clientX - imgCordination.x) / window.innerWidth;
    const top = (event.clientY - imgCordination.y) / window.innerHeight;
    const leftPercentage = Math.floor(left.toFixed(2) * 100);
    const topPercentage = Math.floor(top.toFixed(2) * 100);
    let updateValue = Array.from(newNotes);
    updateValue.push([leftPercentage, topPercentage]);
    console.log("im here");
    setNewNotes(updateValue);
  };

  const notes = response.map((note) => {
    return (
      <Note key={note.id} left={note.xCordination} top={note.yCordination} />
    );
  });

  const setNewNote = newNotes.map((note, index) => {
    return <NewNote key={index} left={note[0]} top={note[1]} />;
  });

  return (
    <div className="test" onClick={printMousePos}>
      <div ref={ref}>
        {notes}
        {setNewNote}
      </div>
      <MyMap />
    </div>
  );
};

export default MapContainer;
