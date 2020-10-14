import React, { useState, useEffect } from "react";
import MapContainerHook from "./component/MapContainerHook";
import SquareButton from "./component/buttons/SquareButton";
import DataService from "./utility/DataService";
import AddNewMapMsg from "./component/map/AddNewMapMsg";
import Loader from './component/Loader'

const MapPage = () => {
  const [response, setResponse] = useState([]);
  const [mapCounter, setMapCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [load , setLoad] = useState(false);

  useEffect(() => {
    (async function () {
      try{
        setLoad(true);
        const response = await DataService.get("data");
        setMapCounter(response.data.length);
        setResponse(response.data);
        setLoad(false);
      }
      catch{
        throw "Unable to get the DATA"
      }

    })();
  }, [mapCounter]);

  function handleCreate() {
    setEditMode(true);
  }

  async function createNewMap(value) {
    const myInfo = {
      mapSrc: value,
    };
    await DataService.create(myInfo, `data`);
    setEditMode(false);
    setMapCounter(mapCounter + 1);
  }

  const removeMap = async (id) => {
    await DataService.remove(`${id}`);
    setMapCounter(mapCounter - 1);
  };

  let container = [];

  container = response
    .slice(0)
    .reverse()
    .map((map) => {
      return (
        <MapContainerHook
          key={map.id}
          id={map.id}
          src={map.mapSrc.value}
          handleRemoveMap={removeMap}
        />
      );
    });

  const addInput = editMode && <AddNewMapMsg createNewMap={createNewMap} />;


  return (
    <div>
      {load && <Loader/>}
      <SquareButton
        className="MapPageBtn"
        background="#0185ff"
        value="New map"
        clickHandler={handleCreate}
      />
      {addInput}
      <div className="MapPage">{container}</div>
      <footer>
        <a href="https://pngtree.com/so/sticky-notes">
          sticky-notes png from pngtree.com
        </a>
      </footer>
    </div>
  );
};

export default MapPage;
