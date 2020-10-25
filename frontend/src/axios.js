import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:9000",
  //hange baseURL after developing !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});
export default instance;
