import React, { useState, useEffect } from "react";
import MapContainerHook from "./component/MapContainerHook";
import SquareButton from "./component/buttons/SquareButton";
import DataService from "./utility/DataService";
import AddNewMapMsg from './component/map/AddNewMapMsg';

const MapPage = () => {
  const [response, setResponse] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await DataService.get("");
      setResponse(response.data);
    })();
  }, [editMode]);

  function handleCreate() {
    setEditMode(true);
  }

  async function createNewMap(value) {
    const myInfo = {
      mapSrc: value,
    };
    await DataService.create(myInfo, ``);
    setEditMode(false);
  }

  const container = response.map((map) => {
    return <MapContainerHook key={map.id} id={map.id} src={map.mapSrc.value} />;
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
