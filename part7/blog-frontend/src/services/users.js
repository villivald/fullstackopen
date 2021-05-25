import axios from "axios";
const baseUrl = "/api/users";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = { headers: { Authorization: token } };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const exportedObject = {
  getAll,
  create,
  update,
  setToken,
  remove,
};

export default exportedObject;
