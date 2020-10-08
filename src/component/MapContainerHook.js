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


let toolOptions = { notes: true };

const MapContainer = (props) => {
  const [response, setResponse] = useState([]);
  const [exsitNotes, setExsitNotes] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const [pickTool, setPickTool] = useState("");
  const [options, setOptions] = useState(toolOptions);
  const [counter, setCounter] = useState(0);
  const [area, setArea] = useState([]);
  const [editArea, setEditArea] = useState([]);
  const [width, height] = useWindowSize();

  const ref = useRef();
  const refContainer = useRef();

  //run only once
  useEffect(() => {
    (async function () {
      const response = await DataService.get("1/notesArr");
      const responseArea = await DataService.get("1/mapCoordinates");
      setExsitNotes(response.data);
      setArea(responseArea.data);
    })();
  }, []);

  function updateOptions(newValue) {
    setOptions(newValue);
    setCounter(counter + 1);
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
      tite: "something",
      color: Util.getRandomColor(),
      mapCoordinate: Util.setAsPercentage(editArea , refContainer),
    };
    await DataService.create(myInfo, "1/mapCoordinates");
  };

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

  const renderNotes = async () => {
    const response = await DataService.get("1/notesArr");
    setExsitNotes(response.data);
  };

  const addNewNote = async (info) => {
    const myInfo = {
      x: info.left,
      y: info.top,
      info: info.value,
      noteImg: info.noteBackGround,
    };
    await DataService.create(myInfo, "1/notesArr");
    removeEditNote([info.left, info.top]);
    renderNotes();
  };

  async function updateCrud(id, data) {
    await DataService.update(`1/notesArr/${id}`, { info: data });
    renderNotes();
  }

  async function deleteCrud(id) {
    await DataService.remove(`1/notesArr/${id}`);
    renderNotes();
  }

  //update new notes and rerender exist notes
  const notes = exsitNotes.map((note, index) => {
    return (
      <Note
        isVisibale={options.notes}
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
        isVisibale={""}
        saveNewCard={addNewNote}
        key={index}
        left={note[0]}
        top={note[1]}
        noteSrc={Util.noteBackGround()}
      />
    );
  });

  let exstraInfo = pickTool === "select area" && (
    <MoreInfo value="Add Area Title" />
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
        <MapCanvas size={refContainer} points={editArea} fullMapsPoints={area}/>
        <MyMap />
      </div>
      <MapDescription updateInfo={updateOptions} options={options} />
    </div>
  );
};

export default MapContainer;
