import React, { useState, useEffect, useRef } from "react";
import MyMap from "./MyMap";
import DataService from "../utility/DataService";
import Note from "./Note";
import NewNote from "./NewNote";
import Util from "../utility/Util";
import Tools from "./Tools";
import "../style-map/MapContainer.css";
import MapDescription from "./MapDescription";
import MapCanvas from './canvas/MapCanvas';

let toolOptions = { notes: true}

const MapContainer = (props) => {
  const [response, setResponse] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const [pickTool, setPickTool] = useState("");
  const [options , setOptions] = useState(toolOptions);
  const [counter , setCounter] = useState(0);
  const [area, setArea] = useState([]);
  const [editArea, setEditArea] = useState([]);

  const ref = useRef();
  const refContainer = useRef();

  //run only once
  useEffect(() => {
    (async function () {
      const responseApi = await DataService.get();
      setResponse(responseApi.data);
    })();
  },[]);

function updateOptions(newValue){
  console.log(newValue);
  setOptions(newValue)
  setCounter(counter+1)
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
      const left = (event.clientX - imgCoordination.x) ;
      const top = (event.clientY - imgCoordination.y);
      let updateValue = Array.from(editArea)
      updateValue.push([left,top])
      setEditArea(updateValue);
    }
  };

  const updateAreaSelected = (event) =>{
    if(pickTool !== "select area"){
      return;
    }
    const newArr = Array.from(editArea);
    let areaArr = Array.from(area);
    areaArr.push([newArr]);
    setArea(areaArr);
    setEditArea('')
    setPickTool('');
  }

  const renderNotes = async () => {
    const responseApi = await DataService.get();
    setResponse(responseApi.data);
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
    renderNotes();
  };

  async function updateCrud(id, data) {
    await DataService.update(id, { info: data });
    renderNotes();
  }

  async function deleteCrud(id) {
    await DataService.remove(id);
    await renderNotes();
  }

  const notes = response.map((note) => {
    return (
      <Note
        isVisibale={options.notes}
        id={note.id}
        key={note.id}
        left={note.xCordination}
        top={note.yCordination}
        info={note.info}
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
      />
    );
  });

  let exstraInfo = <div>HI</div>;

  return (
    <div className="mapBox">
      <Tools
        changeTool={(tool) => setPickTool(tool)}
        tools={Util.toolsOptions()}
      />
      <div ref={refContainer} className='MapContainer' onClick={printMousePos} onDoubleClick={updateAreaSelected}>
        <div ref={ref}>
          {exstraInfo}
          {notes}
          {setNewNote}
        </div>
        <MapCanvas size={refContainer} points={editArea} fullPoints={area}/>
        <MyMap />
      </div>
      <MapDescription updateInfo={updateOptions} options={options}/>
    </div>
  );
};

export default MapContainer;
