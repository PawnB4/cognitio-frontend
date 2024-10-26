import axios from "axios";

const baseURL = import.meta.env.BACKEND_URL;

const client = axios.create({
  baseURL,
});


export default client;