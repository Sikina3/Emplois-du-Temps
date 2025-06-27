import axios from "axios";
import URL_API from "../config/api";
import { data } from "react-router-dom";

const apiService = {
  getAll: (resource) =>
    axios.get(`${URL_API}/${resource}`).then((res) => res.data),

  create: (resource, data) =>
    axios.post(`${URL_API}/${resource}`, data).then((res) => res.data),

  update: (resource, id, data) =>
    axios.put(`${URL_API}/${resource}/${id}`, data).then((res) => res.data),

  remove: (resource, id) =>
    axios.delete(`${URL_API}/${resource}/${id}`, data).then((res) => res.data),
};

export default apiService;
