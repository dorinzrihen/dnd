import React, { useState, useEffect, useRef } from "react";
import MyMap from "./MyMap";
import DataService from "../utility/DataService";
import Note from "./Note";
import NewNote from "./NewNote";
import Util from '../utility/Util';
import Tools from './Tools';
import "../style-map/MapContainer.css";
import MapDescription from './MapDescription';


const MapContainer = (props) => {
  const [response, setResponse] = useState([]);
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
    const myEvent = event;
    if (ref.current.contains(myEvent.target)) {
      return;
    }
    const updateValue = Util.getCoordinates(myEvent,newNotes);
    setNewNotes(updateValue);
  };

  const renderCards = async () => {
    const response = await DataService.get();
    setResponse(response.data);
  };

  const removeEditCard = (cotdineate) => {
    let newArrayOfNew = [];
    for (const newNotesCordineate of newNotes) {
      (cotdineate[0] !== newNotesCordineate[0] ||
        cotdineate[1] !== newNotesCordineate[1]) &&
        newArrayOfNew.push(newNotesCordineate);
    }
    setNewNotes(newArrayOfNew);
  };

  const addNewNote = async (info) => {
    const myInfo = {
      xCordination: info.left,
      yCordination: info.top,
      info: info.value,
    };
    await DataService.create(myInfo);
    removeEditCard([info.left, info.top]);
    renderCards();
  };

  const notes = response.map((note) => {
    return (
      <Note
        key={note.id}
        left={note.xCordination}
        top={note.yCordination}
        info={note.info}
      />
    );
  });

  const setNewNote = newNotes.map((note, index) => {
    return (
      <NewNote
        saveNewCard={addNewNote}
        key={index}
        left={note[0]}
        top={note[1]}
      />
    );
  });

  return (
    <div className="mapBox">
      <Tools/>
      <div className="MapContainer" onClick={printMousePos}>
        <div ref={ref}>
          {notes}
          {setNewNote}
        </div>
        <MyMap />
      </div>
      <MapDescription />
    </div>
  );
};

export default MapContainer;
