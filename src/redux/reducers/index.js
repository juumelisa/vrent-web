import { combineReducers } from "redux";
import auth from "./auth";


const counterState = {
    num: 0
}
const vehicleState = {
    vehicles: [],
    page: {},
    isLoading: false,
    isError: false
}
const detailState = {
    vehicle: [],
    isLoading: false,
    isError: false

}
const rootReducer = combineReducers({
    auth,
    counter: (state=counterState, action) =>{
        switch(action.type){
            case 'INCREMENT':
                state.num = state.num + 1
                return state
            case 'DECREMENT':
                state.num = state.num-1
                return state
            case 'CHANGE_SUM': {
                state.num = action.payload
                return state
            }
            default:
                return {...state}
        }
    },
    vehicles: (state=vehicleState, action)=>{
        switch(action.type){
            case 'GET_VEHICLES_PENDING':
                state.isLoading = true
                return state
            case 'GET_VEHICLES_FULFILLED':{
                const {data} = action.payload
                console.log(data.result)
                state.vehicles = data.result
                state.page = data.pageInfo
                state.isLoading = false
                return state
            }
            case 'GET_VEHICLES_REJECTED':
                state.isLoading = false
                state.isError = true
                return state
            case 'GET_NEXTDATA_PENDING':
                state.isLoading = true
                return state
            case 'GET_NEXTDATA_FULFILLED':{
                const {data} = action.payload
                console.log(data)
                state.vehicles = [...data.result]
                state.page = data.pageInfo
                state.isLoading = false
                return state
            }
            case 'GET_NEXTDATA_REJECTED':
                state.isLoading = false
                state.isError = true
                return state
            default:
                return {...state}
        }
    },
    detail: (state=detailState, action)=>{
        switch (action.type){
            case 'GET_VEHICLES_DETAIL_PENDING': {
                state.isLoading = true
                state.isError = false
                return state
            }
            case 'GET_VEHICLES_DETAIL_FULFILLED': {
                const {data} = action.payload
                state.vehicle = data.result
                state.isLoading = false
                state.isError = false
                return state
            }
            case 'GET_VEHICLE_DETAIL_REJECTED': {
                state.isLoading = false
                state.isError = true
                return state
            }
            default: {
                return state
            }
        }
    }
})

export default rootReducer