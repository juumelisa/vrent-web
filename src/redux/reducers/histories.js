const initialState = {
  data: {},
  isLoading: true,
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
      state.isLoading = false
      state.isError = false
      return {...state}
    }
    case 'GET_HISTORY_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
      default: {
          return {...state}
      }
  }
}

export default histories