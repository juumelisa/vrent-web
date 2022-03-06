import {default as axios} from "axios"

const {REACT_APP_BACKEND_URL} = process.env

export const getVehicles = ()=>{
    return{
        type: 'GET_VEHICLES',
        payload: axios.get(`${REACT_APP_BACKEND_URL}popular?limit=16`)
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