import axios from "axios";
import { loginUser } from ".";

const URL = "http://103.154.135.62:1337/api";

const token = loginUser().then((m) => m.access_token)

const httpService = axios.create({
  baseURL: URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": 'Bearer ' + token
  }
})

export default httpService;