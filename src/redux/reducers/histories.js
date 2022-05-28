const initialState = {
  data: {},
  detail: {},
  isLoading: false,
  isError: false,
  errorMsg: null,
  message: null,
}

const histories = (state=initialState, action)=>{
  switch(action.type){
    case 'GET_HISTORY_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'GET_HISTORY_FULFILLED': {
      const {data} = action.payload
      state.data = data.result
      window.localStorage.setItem('seranHistory', JSON.stringify(state.data))
      state.isLoading = false
      state.isError = false
      return {...state}
    }
    case 'GET_HISTORY_REJECTED': {
      const {data} = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errorMsg = data.message
      return {...state}
    }
    case 'GET_HISTORY_DETAIL_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'GET_HISTORY_DETAIL_FULFILLED': {
      const {data} = action.payload
      state.detail = data.result
      state.isLoading = false
      state.isError = false
      return {...state}
    }
    case 'GET_HISTORY_DETAIL_REJECTED': {
      const {data} = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errorMsg = data.message
      return {...state}
    }
    case 'DELETE_HISTORY_PENDING': {
      state.isLoading = true
      state.isError = false
      state.errorMsg = null
      state.message = null
      return {...state}
    }
    case 'DELETE_HISTORY_FULFILLED': {
      const {data} = action.payload
      state.message = data.message
      state.isError = false
      state.isError = false
      state.isLoading = false
      return {...state}
    }
    case 'DELETE_HISTORY_REJECTED': {
      const {data} = action.payload.response
      state.errorMsg = data.message
      state.isError = true
      state.isLoading = false
      return {...state}
    }
    case 'EDIT_HISTORY_PENDING': {
      state.isLoading = true
      state.isError = false
      state.errorMsg = null
      state.message = null
      return {...state}
    }
    case 'EDIT_HISTORY_FULFILLED': {
      const {data} = action.payload
      state.detail = data.result
      state.message = data.message
      state.isError = false
      state.isError = false
      state.isLoading = false
      return {...state}
    }
    case 'EDIT_HISTORY_REJECTED': {
      const {data} = action.payload.response
      state.errorMsg = data.message
      state.isError = true
      state.isLoading = false
      return {...state}
    }
    case 'CLEAR_HISTORY': {
      state.detail = {}
      state.isLoading = false
      state.isError = false
      state.errorMsg = null
      state.message = null
      return {...state}
    }
    default: {
      return {...state}
    }
  }
}

export default histories