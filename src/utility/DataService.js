import http from "./Api";


const get = () => {
  return http.get();
};

const create = data => {
  return http.post("", data);
};

const update = (id, data) => {
  return http.put(`/${id}`, data);
};

const remove = id => {
  return http.delete(`/${id}`);
};


// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

export default {
  get,
  create,
  update,
  remove,
};