import {default as axios} from "axios"
import httpAuth from "../../helpers/httpAuth"

// eslint-disable-next-line no-undef
const {REACT_APP_BACKEND_URL} = process.env

export const getVehicles = (limit, category, sortBy)=>{
    let url = `${REACT_APP_BACKEND_URL}popular?limit=${limit}`
    if(category){
        url = `${url}&category=${category}`
    }
    if(sortBy){
        url = `${url}&sortBy=${sortBy}`
    }
    return{
        type: 'GET_VEHICLES',
        payload: axios.get(url)
    }
}

export const getNextData = (url)=>{
    console.log(url)
    return{
        type: 'GET_NEXTDATA',
        payload: axios.get(url)
    }
}

export const getVehicleDetail = (id)=>{
    return{
        type: 'GET_VEHICLES_DETAIL',
        payload: axios.get(`${REACT_APP_BACKEND_URL}vehicles/${id}`)
    }
}

export const searchVehicle = (data)=>{
    let url = `${REACT_APP_BACKEND_URL}popular?limit=16`
    const dataName = ['name', 'location', 'category', 'cost_min', 'cost_max', 'type', 'sortBy']
    dataName.forEach(x=>{
        url = `${url}&${x}=${data[x]}`
    })
    console.log(url)
    return({
        type: 'SEARCH_VEHICLE',
        payload: axios.get(url)
    })
}

export const editVehicle = (token, data, id) => {
  const inputData = new FormData()
  for (const key in data) {
    inputData.append(key, data[key]);
  }
  return {
    type: 'EDIT_VEHICLE',
    payload: httpAuth(token, true).patch(`vehicles/${id}`, inputData)
  }
}