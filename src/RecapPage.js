import React, { useState, useEffect, useReducer } from "react";
import SquareButton from "./component/buttons/SquareButton";
import DataService from "./utility/DataService";
import RecapPostContainer from "./component/recap/RecapPostContainer";
import "./style-recap/RecapPage.css";
import Loader from "./component/Loader";

const RecapPage = () => {
  const [response, setResponse] = useState([]);
  const [load, setLoad] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoad(true);
        const response = await DataService.get("recap");
        setResponse(response.data);
        setLoad(false);
      } catch {
        throw "Unable connect";
      }
    }
    fetchData();
  }, [ignored]);

  const handleCreate = async () => {
    const myInfo = {
      imgSrc: ``,
      lastUpdate: ``,
      story: ``,
      title: ``,
    };
    try {
      setLoad(true);
      await DataService.create(myInfo, `recap`);
      forceUpdate();
      setLoad(false);
    } catch {
      throw "Unable connect";
    }
  };

  const handleUpdate = async (data, id) => {
    try {
      setLoad(true);
      await DataService.update(`recap/${id}`, data);
      setLoad(false);
    } catch {
      throw "Unable connect";
    }
  };

  const removeRecap = async (id) => {
    try {
      setLoad(true);
      await DataService.remove(`recap/${id}`);
      setLoad(false);
      forceUpdate();
    } catch {
      throw "Unable connect";
    }
  };

  let container = [];

  container = response
    .slice(0)
    .reverse()
    .map((post) => {
      return (
        <RecapPostContainer
          img={post.imgSrc}
          key={post.id}
          id={post.id}
          title={post.title}
          story={post.story}
          handleUpdate={handleUpdate}
          removeRecapHendler={removeRecap}
        />
      );
    });

  //const addInput = editMode && <AddNewMapMsg createNewMap={createNewMap}/>

  return (
    <div>
      {load && <Loader />}
      <SquareButton
        className="MapPageBtn"
        background="#0185ff"
        value="Create new recap"
        clickHandler={handleCreate}
      />
      <div className="RecapPage">
        {/* {addInput} */}
        <div>{container}</div>
      </div>
    </div>
  );
};

export default RecapPage;
