import React, { useState, useEffect , useLayoutEffect } from "react";
import MapContainerHook from "./component/MapContainerHook";
import SquareButton from "./component/buttons/SquareButton";
import DataService from "./utility/DataService";
import AddNewMapMsg from './component/map/AddNewMapMsg';
import Util from './utility/Util';

const MapPage = () => {
  const [response, setResponse] = useState([]);
  const [mapCounter, setMapCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await DataService.get("");
      setMapCounter(response.data.length);
      setResponse(response.data);
      console.log("hi");
    })();
  }, [mapCounter]);



  function handleCreate() {
    setEditMode(true);
  }

  async function createNewMap(value) {
    const myInfo = {
      mapSrc: value,
    };
    await DataService.create(myInfo, ``);
    setEditMode(false);
    setMapCounter(mapCounter+1);
  }

  const removeMap = async (id) => {
    await DataService.remove(id);
    setMapCounter(mapCounter-1);
  }

  let container = [];

  container = response.map((map) => {
    return <MapContainerHook key={map.id} id={map.id} src={map.mapSrc.value} handleRemoveMap={removeMap} />;
  });


  const addInput = editMode && <AddNewMapMsg createNewMap={createNewMap}/>

  return (
    <div>
      <SquareButton
        className="MapPageBtn"
        background="#0185ff"
        value="New map"
        clickHandler={handleCreate}
      />
      {addInput}
      <div className="MapPage">
        {container}
      </div>
    </div>
  );
};

export default MapPage;
