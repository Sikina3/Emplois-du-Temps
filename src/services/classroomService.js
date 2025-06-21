import api from "../config/api";

export const getClassroom = async () => {
  try {
    const res = await api.get("/classroom");
    console.log(res.data);
  } catch (err) {
    console.error("Erreur : ", err);
  }
};
