import { combineReducers } from "redux";
import auth from "./auth";
import histories from "./histories"
import payment from "./payment"

const counterState = {
    num: 1
}
const vehicleState = {
    vehicles: [],
    page: {},
    vehicle: {},
    isLoading: true,
    isError: false,
    errMsg: null
}
const detailState = {
    vehicle: [],
    isLoading: false,
    isError: false,
    message: null,
    errorMsg: null

}
const reservationState = {
  data: {},
    id: null,
    vehicleId: 0,
    total: 0,
    rentDate: '',
    returnDate: '',
    isError: false,
    isLoading: false,
    message: null,
    errorMsg: null
}
const rootReducer = combineReducers({
    auth,
    histories,
    payment,
    counter: (state=counterState, action) =>{
        switch(action.type){
            case 'INCREMENT':
                state.num = state.num + 1
                return state
            case 'DECREMENT':
                state.num = state.num-1
                return state
            case 'CHANGE_SUM': {
                console.log(action.payload.sum)
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
                state.isError = false
                state.errMsg = null
                return state
            case 'GET_VEHICLES_FULFILLED':{
                const {data} = action.payload
                console.log(data.result)
                state.vehicles = data.result
                state.page = data.pageInfo
                state.isLoading = false
                state.isError = false
                state.errMsg = null
                return state
            }
            case 'GET_VEHICLES_REJECTED': {
                const {message} = action.payload.response.data
                state.isLoading = false
                state.isError = true
                state.errMsg = message
                return state
            }
            case 'GET_NEXTDATA_PENDING':
                state.isLoading = true
                state.isError = false
                return state
            case 'GET_NEXTDATA_FULFILLED':{
                const {data} = action.payload
                console.log(data)
                state.vehicles = state.vehicles.concat(data.result)
                state.page = data.pageInfo
                state.isLoading = false
                state.isError = false
            state.errMsg = null
                return state
            }
            case 'GET_NEXTDATA_REJECTED': {
              const {message} = action.payload.response.data
              state.isLoading = false
              state.isError = true
              state.errMsg = message
              return state
          }
            case 'SEARCH_VEHICLE_PENDING':
                state.isLoading = true
                state.isError = false
            state.errMsg = null
                return state
            case 'SEARCH_VEHICLE_FULFILLED':{
                const {data} = action.payload
                console.log(data)
                state.vehicles = data.result
                state.page = data.pageInfo
                state.isLoading = false
                state.isError = false
                state.errMsg = null
                return state
            }
            case 'SEARCH_VEHICLE_REJECTED':{
                const {message} = action.payload.response.data
                state.isLoading = false
                state.isError = true
                state.errMsg = message
                return state
            }
            case 'EDIT_VEHICLE_PENDING':
              state.isLoading = true;
              state.isError = false;
              state.errMsg = null
              return {...state}
            case 'EDIT_VEHICLE_FULFILLED':
              state.isError = false;
              state.isLoading = false;
              state.vehicle = action.payload;
              state.errMsg = null
              return {...state}
            case 'EDIT_VEHICLE_REJECTED':{
              const {message} = action.payload.response.data
              state.isLoading = false
              state.isError = true
              state.errMsg = message
              return state
          }
            case 'ADD_VEHICLE_PENDING':
              state.isLoading = true;
              state.isError = false;
            state.errMsg = null
              return {...state}
            case 'ADD_VEHICLE_FULFILLED':
              state.isError = false;
              state.isLoading = false;
              state.vehicle = action.payload;
            state.errMsg = null
              return {...state}
            case 'ADD_VEHICLE_REJECTED':{
              const {message} = action.payload.response.data
              state.isLoading = false
              state.isError = true
              state.errMsg = message
            state.errMsg = null

              return state
          }
          case 'CLEAR_VEHICLE': {
            state.errMsg = null
            return {...state}
          }
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
                state.message = data.message
                state.isLoading = false
                state.isError = false
                return state
            }
            case 'GET_VEHICLE_DETAIL_REJECTED': {
              const {data} = action.page.response
              state.errorMsg = data.message
                state.isLoading = false
                state.isError = true
                return state
            }
            default: {
                return state
            }
        }
    },
    reservation : (state=reservationState, action)=>{
        switch (action.type){
            case 'RESERVATION_DATA_PENDING': {
                state.isLoading = true
                state.isError = false
                return state
            }
            case 'RESERVATION_DATA_FULFILLED': {
                const data = action.payload
                state.vehicleId = data.vehicleId
                state.total = data.total
                state.rentDate = data.rent_date
                state.returnDate = data.return_date
                return {...state}
            }
            case 'RESERVATION_DATA_REJECTED': {
                const {message} = action.payload.response.data
                state.isLoading = false
                state.isError = true
                state.errorMsg = message
                return state
            }
            case 'FINAL_RESERVATION_PENDING':{
                state.isLoading = true
                state.isError = false
                return state
            }
            case 'FINAL_RESERVATION_FULFILLED':{
                const {data} = action.payload
                state.data = data.result
                state.isLoading = false
                state.isError = false
                state.message = data.message
                return state
            }
            case 'FINAL_RESERVATION_REJECTED':{
                const {message} = action.payload.response.data
                state.isLoading = false
                state.isError = true
                state.errorMsg = message
                return state
            }
            case 'RESERVATION_CLEAR': {
              state.data = {}
              state.message = null
              state.errorMsg = null
              state.isError = false
              state.isLoading = false
              return {...state}
            }
        default:
            return {...state}
        }
    }
})

export default rootReducer