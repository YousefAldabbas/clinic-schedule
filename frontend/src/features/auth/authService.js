import axios from "axios";

const API_URL = "/api/users/";

const register = async (data) => {

  const response = await axios.post(API_URL, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); //it will include token
  }
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(API_URL + "login", data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); //it will include token
  }
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
