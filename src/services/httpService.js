import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  "Content-type": "application/json; charset=UTF-8",
  Authorization: "Bearer " + token,
};

const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: token ? headers : "",
});

export default httpService;
