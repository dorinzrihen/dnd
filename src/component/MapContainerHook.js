import React, { useState, useEffect, useRef } from "react";
import MyMap from "./MyMap";
import DataService from "../utility/DataService";
import Note from "./Note";
import NewNote from "./NewNote";
import Util from "../utility/Util";
import Tools from "./Tools";
import "../style-map/MapContainer.css";
import MapDescription from "./MapDescription";
import MapCanvas from "./canvas/MapCanvas";
import MoreInfo from "./canvas/MoreInfo";
import useWindowSize from './useWindowSize';


const MapContainer = (props) => {
  const [response, setResponse] = useState([]);
  const [exsitNotes, setExsitNotes] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const [pickTool, setPickTool] = useState("");
  const [area, setArea] = useState([]);
  const [showMarks , setShowMard] = useState([]);

  const [editArea, setEditArea] = useState([]);
  const [text, setText] = useState('');

  const [width, height] = useWindowSize();
  

  const ref = useRef();
  const refContainer = useRef();

  //run only once
  useEffect(() => {
    (async function () {
      const response = await DataService.get(`${props.id}/notesArr`);
      const responseArea = await DataService.get(`${props.id}/mapCoordinates`);
      setExsitNotes(response.data);
      setArea(responseArea.data);
      setResponse(response.data);
      console.log("im here");
    })();
  }, [pickTool,newNotes]);

  function updateOptions(id) {
    let mySelector = Array.from(showMarks);
    mySelector.indexOf(id) === -1 ? mySelector.push(id) : mySelector.splice(mySelector.indexOf(id), 1)
    setShowMard(mySelector);
    console.log(mySelector);
    //renderMap();
  }

  const printMousePos = (event) => {
    const myEvent = event;
    if (ref.current.contains(myEvent.target)) {
      return;
    }
    if (pickTool === "note") {
      const updateValue = Util.getCoordinates(myEvent, newNotes);
      setNewNotes(updateValue);
    }
    if (pickTool === "select area") {
      const imgCoordination = event.target.getBoundingClientRect();
      const left = event.clientX - imgCoordination.x;
      const top = event.clientY - imgCoordination.y;
      let updateValue = Array.from(editArea);
      updateValue.push([left, top]);
      setEditArea(updateValue);
    }
  };

  const updateAreaSelected = () => {
    if (pickTool !== "select area") {
      return;
    }
    updateNewMapSelectArea();
    setEditArea("");
    setPickTool("");
  };

 
  const updateNewMapSelectArea = async () => {
    const myInfo = {
      title: text,
      color: Util.getRandomColor(),
      mapCoordinate: Util.setAsPercentage(editArea , refContainer),
    };
    await DataService.create(myInfo, `${props.id}/mapCoordinates`);
    //renderMap();
  };

  const removeMapCrud = async (id) => {
    await DataService.remove(`${props.id}/mapCoordinates/${id}`);
    //renderMap();
  }

  //notes
  const removeEditNote = (cotdineate) => {
    let newArrayOfNew = [];
    for (const newNotesCordineate of newNotes) {
      (cotdineate[0] !== newNotesCordineate[0] ||
        cotdineate[1] !== newNotesCordineate[1]) &&
        newArrayOfNew.push(newNotesCordineate);
    }
    setNewNotes(newArrayOfNew);
  };

  // CRUD for notes

  // const renderMap = async () => {
  //   const response = await DataService.get(`${props.id}/notesArr`);
  //   const responseArea = await DataService.get(`${props.id}/mapCoordinates`);
  //   setExsitNotes(response.data);
  //   setArea(responseArea.data);
  // };

  const addNewNote = async (info) => {
    const myInfo = {
      x: info.left,
      y: info.top,
      info: info.value,
      noteImg: info.noteBackGround,
    };
    await DataService.create(myInfo, `${props.id}/notesArr`);
    removeEditNote([info.left, info.top]);
    //renderMap();
  };

  async function updateCrud(id, data) {
    await DataService.update(`${props.id}/notesArr/${id}`, { info: data });
    //renderMap();
  }

  async function deleteCrud(id) {
    await DataService.remove(`${props.id}/notesArr/${id}`);
    //renderMap();
  }

  //update new notes and rerender exist notes
  const notes = exsitNotes.map((note, index) => {
    return (
      <Note
        isVisibale={showMarks.indexOf('notes') === -1 ? true : false }
        id={note.id}
        key={index}
        left={note.x}
        top={note.y}
        info={note.info}
        noteSrc={note.noteImg}
        onUpdate={updateCrud}
        onDelete={deleteCrud}
      />
    );
  });

  const setNewNote = newNotes.map((note, index) => {
    return (
      <NewNote
        isVisibale={true}
        saveNewCard={addNewNote}
        key={index}
        left={note[0]}
        top={note[1]}
        noteSrc={Util.noteBackGround()}
      />
    );
  });

  let exstraInfo = pickTool === "select area" && (
    <MoreInfo value="Add Area Title" saveInfo={(value)=>setText(value)} />
  );

  return (
    <div className="mapBox">
      <Tools
        changeTool={(tool) => setPickTool(tool)}
        tools={Util.toolsOptions()}
      />
      <div
        ref={refContainer}
        className="MapContainer"
        onClick={printMousePos}
        onDoubleClick={updateAreaSelected}
      >
        <div ref={ref}>
          {exstraInfo}
          {notes}
          {setNewNote}
        </div>
        <MapCanvas size={refContainer} points={editArea} fullMapsPoints={area} unShow={showMarks} />
        <MyMap backgroundMap={props.src}/>
      </div>
      <MapDescription updateInfo={updateOptions} mapSelect={area} removeMap={removeMapCrud}/>
    </div>
  );
};

export default MapContainer;
