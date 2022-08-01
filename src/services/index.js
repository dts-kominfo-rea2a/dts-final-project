import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const user = await axios.get(process.env.REACT_APP_API_URL + "/login", email, password);
    return user;
  } catch (error) {
    return error;
  }
};

export { loginUser };
