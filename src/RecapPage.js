import React, { useState, useEffect } from "react";
import MapContainerHook from "./component/MapContainerHook";
import SquareButton from "./component/buttons/SquareButton";
import DataService from "./utility/DataService";
import RecapPostContainer from './component/recap/RecapPostContainer';
import './style-recap/RecapPage.css';


const RecapPage = () => {
  const [response, setResponse] = useState([]);
  const [recapCounter, setRecapCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await DataService.get("recap");
      setRecapCounter(response.data.length);
      setResponse(response.data);
      console.log("recap");
    })();
  }, [recapCounter]);


  const handleCreate = async () => {
    const myInfo = {
      imgSrc:``,
      lastUpdate:``,
      story:``,
      title:``
    };
    await DataService.create(myInfo, `recap`);
    setEditMode(false);
    setRecapCounter(recapCounter+1);
  }

  const handleUpdate = async (data, id) => {
    await DataService.update(`recap/${id}`,data );
  }
  // const removeMap = async (id) => {
  //   await DataService.remove(`${id}`);
  //   setRecapCounter(recapCounter-1);
  // }

  let container = [];

  container = response.map((post) => {
    return <RecapPostContainer img={post.imgSrc} key={post.id} id={post.id} title={post.title} story={post.story} handleUpdate={handleUpdate}/> ;
  });


  //const addInput = editMode && <AddNewMapMsg createNewMap={createNewMap}/>

  return (
    <div className="RecapPage">
      <SquareButton
        className="MapPageBtn"
        background="#0185ff"
        value="Create new recap"
        clickHandler={handleCreate}
      />
      {/* {addInput} */}
      <div>
        {container}
      </div>
    </div>
  );
};

export default RecapPage;
