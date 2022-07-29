import axios from "axios";

const URL = "http://103.154.135.62:1337/api";

const loginUser = async (email, password) => {
  try {
    const user = await axios.get(URL + "/login", email, password);
    return user;
  } catch (error) {
    return error;
  }
};

export { loginUser };
