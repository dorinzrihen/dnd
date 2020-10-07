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

const toolsOptions = () => {
  return ["note", "dot", "select area"];
};

export default {
  noteBackGround,
  getCoordinates,
  toolsOptions,
};
