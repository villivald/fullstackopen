import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (noteObject) => {
  const request = axios.post(baseUrl, noteObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`);
  return request.then((response) => response.data);
};

const update = (id, noteObject) => {
  const request = axios.put(`http://localhost:3001/persons/${id}`, noteObject);
  return request.then((response) => response.data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, create, remove, update };
