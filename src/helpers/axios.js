import axios from "axios";

import { baseURL } from "../urlConfig";

const axiosIntance = axios.create({
  baseURL: baseURL,
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
});

export default axiosIntance;
