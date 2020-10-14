import DataService from "./DataService";

const noteBackGround = () => {
  const arr = [
    "https://res.cloudinary.com/dqrxjebxc/image/upload/v1601887983/notes/note5_lnorfy.png",
    "https://res.cloudinary.com/dqrxjebxc/image/upload/v1601887983/notes/note2_xq3ukf.png",
    "https://res.cloudinary.com/dqrxjebxc/image/upload/v1601887983/notes/note6_kuplho.png",
    "https://res.cloudinary.com/dqrxjebxc/image/upload/v1601887982/notes/note1_b96kik.png",
    "https://res.cloudinary.com/dqrxjebxc/image/upload/v1601887982/notes/note3_dqlpox.png",
    "https://res.cloudinary.com/dqrxjebxc/image/upload/v1601887982/notes/note4_kznx3w.png",
  ];
  return arr[Math.floor(Math.random() * arr.length)];
};

//get x y to so spesific img
const getCoordinates = (event, existsPoints) => {
  const imgCoordination = event.target.getBoundingClientRect();
  const left = (event.clientX - imgCoordination.x - 20) / imgCoordination.width;
  const top = (event.clientY - imgCoordination.y - 5) / imgCoordination.height;
  const leftPercentage = Math.floor(left.toFixed(3) * 100);
  const topPercentage = Math.floor(top.toFixed(3) * 100);
  let updateValue = Array.from(existsPoints);
  updateValue.push([leftPercentage, topPercentage]);
  return updateValue;
};

const getPinCoordinates = (event, existsPoints) => {
  const imgCoordination = event.target.getBoundingClientRect();
  const left = (event.clientX - imgCoordination.x) / imgCoordination.width;
  const top = (event.clientY - imgCoordination.y -20) / imgCoordination.height;
  const leftPercentage = Math.floor(left.toFixed(3) * 100);
  const topPercentage = Math.floor(top.toFixed(3) * 100);
  let updateValue = Array.from(existsPoints);
  updateValue.push([leftPercentage, topPercentage]);
  return updateValue;
};

const toolsOptions = () => {
  return ["note", "select area",'Text'];
};


const getRandom = () => {
  return Math.floor(Math.random() * 999999) + 10000;
}

const getRandomColor = () =>{
  return Math.floor(Math.random() * 360);
}

const setAsPercentage = (arr, ref) => {
  const getSize = ref.current.getBoundingClientRect();
  const arrUpdated = arr.map(coordinate =>{
    const left = coordinate[0] / getSize.width;
    const top = coordinate[1] / getSize.height;
    const leftPercentage = Math.floor(left * 100);
    const topPercentage = Math.floor(top * 100);
    return [leftPercentage,topPercentage]
  })
  return arrUpdated;
}

const getBackCoordinate = (arr, ref) => {
  const getSize = ref.current.getBoundingClientRect();
  const arrUpdated = arr.map(coordinate =>{
    const left = coordinate[0] * getSize.width / 100;
    const top = coordinate[1] * getSize.height / 100;
    return [left+5,top+5]
  })
  return arrUpdated;

}

//deal with the API 
const addToApi = async (id,data,path) =>{
  await DataService.create(data, `${id}/${path}`);
}

const updateApi = async (mapId,data,path,itemId,apiTitleName) =>{
  await DataService.update(`${mapId}/${path}/${itemId}`, {[apiTitleName]: data});
}

const deleteFromApi = async (mapId,path,itemId) =>{
  await DataService.remove(`${mapId}/${path}/${itemId}`);
}


export default {
  noteBackGround,
  getCoordinates,
  getPinCoordinates,
  toolsOptions,
  getRandom,
  getRandomColor,
  setAsPercentage,
  getBackCoordinate,
  addToApi,
  updateApi,
  deleteFromApi,
};
