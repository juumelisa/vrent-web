import axios from "axios";

const {REACT_APP_BACKEND_URL} = process.env

const httpAuth = (token)=> {
  const headers = {}
  if(token){
    headers.Authorization = `Bearer ${token}`
  }
  console.log(headers)
  return axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    headers
  })
}

export default httpAuth