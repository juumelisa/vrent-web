const initialState = {
    token: null,
    userData: {},
    isLoading: false,
    isError: false,
    errorMsg: ''
}

const auth = (state=initialState, action)=>{
    switch(action.type){
        case 'AUTH_LOGIN_PENDING': {
            console.log(action.payload)
            state.isLoading = true
            state.isError = false
            return {...state}
        }
        case 'AUTH_LOGIN_FULFILLED': {
            const {data} = action.payload
            console.log(action.payload)
            console.log(data)
            state.isLoading = false
            state.isError = false
            state.token = data.result.token
            window.localStorage.setItem('token', state.token)
            return {...state}
        }
        case 'AUTH_LOGIN_REJECTED': {
          const {message} = action.payload.response.data
          console.log(message)
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        case 'AUTH_USERDATA_PENDING': {
          state.isLoading = true
          return {...state}
        }
        case 'AUTH_USERDATA_FULFILLED': {
          const {data} = action.payload
          state.isLoading = false
          state.userData = data.result
          return {...state}
        }
        case 'AUTH_LOGOUT': {
          state.token = null
          state.userData = {}
          window.localStorage.removeItem('token')
          return state
        }
        case 'AUTH_REGISTER_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_REGISTER_FULFILLED': {
          const {data} = action.payload
          console.log(data.message)
          state.isLoading = false
          state.isError = false
          state.errorMsg = data.message
          return {...state}
        }
        case 'AUTH_REGISTER_REJECTED': {
          const {message} = action.payload.response.data
          console.log(message)
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        case 'AUTH_ACCOUNT_CONFIRMATION_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_ACCOUNT_CONFIRMATION_FULFILLED': {
          const {data} = action.payload
          console.log(data.message)
          state.isLoading = false
          state.isError = false
          state.errorMsg = data.message
          return {...state}
        }
        case 'AUTH_ACCOUNT_CONFIRMATION_REJECTED': {
          const {message} = action.payload.response.data
          console.log(message)
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        case 'AUTH_FORGOT_PASSWORD_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_FORGOT_PASSWORD_FULFILLED': {
          const {data} = action.payload
          console.log(data.message)
          state.isLoading = false
          state.isError = false
          state.errorMsg = data.message
          return {...state}
        }
        case 'AUTH_FORGOT_PASSWORD_REJECTED': {
          const {message} = action.payload.response.data
          console.log(message)
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        case 'AUTH_CHANGE_PASSWORD_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_CHANGE_PASSWORD_FULFILLED': {
          const {data} = action.payload
          console.log(data.message)
          state.isLoading = false
          state.isError = false
          state.errorMsg = data.message
          return {...state}
        }
        case 'AUTH_CHANGE_PASSWORD_REJECTED': {
          const {message} = action.payload.response.data
          console.log(message)
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        default: {
            return {...state}
        }
    }
}

export default auth