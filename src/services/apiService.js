import axios from "axios";
import URL_API from "../config/api";
import { data } from "react-router-dom";

const apiService = {
  getAll: (resource) =>
    axios.get(`${URL_API}/${resource}`).then((res) => res.data),

  get: (resource, params = {}) =>
    axios.get(`${URL_API}/${resource}`, { params }).then((res) => res.data),

  create: (resource, data) =>
    axios.post(`${URL_API}/${resource}`, data).then((res) => res.data),

  update: (resource, id, data) =>
    axios.put(`${URL_API}/${resource}/${id}`, data).then((res) => res.data),

  remove: (resource, id) =>
    axios.delete(`${URL_API}/${resource}/${id}`, data).then((res) => res.data),

  linkSubjectToTrack: (subjectId, trackId) =>
    axios
      .patch(`${URL_API}/subject/${subjectId}/link/academicTrack/${trackId}`)
      .then((res) => res.data),

  getTrack: (resource, param) =>
    axios
      .get(`${URL_API}/${resource}`, { params: param }) //teto adinoko nanao params de tsy nety nandeh le filtre
      .then((res) => res.data),
};

export default apiService;
