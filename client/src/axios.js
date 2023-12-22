import axios from "axios"


export const httpRequest = axios.create({
  baseURL: "http://localhost:2280/api/",
  withCredentials: true
})