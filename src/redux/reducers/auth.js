const initialState = {
    token: null,
    userData: {},
    isLoading: false,
    isError: false,
    errorMsg: null,
    message: null,
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
            state.isLoading = false
            state.isError = false
            state.token = data.result.token
            window.localStorage.setItem('seranToken', state.token)
            return {...state}
        }
        case 'AUTH_LOGIN_REJECTED': {
          const {message} = action.payload.response.data
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
          window.localStorage.setItem('seranUserData', JSON.stringify(state.userData))
          return {...state}
        }
        case 'AUTH_LOGOUT': {
          state.token = null
          state.userData = {}
          state.message = null
          window.localStorage.removeItem('seranToken')
          window.localStorage.removeItem('seranUserData')
          window.localStorage.removeItem('seranHistory')

          return state
        }
        case 'AUTH_REGISTER_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_REGISTER_FULFILLED': {
          const {data} = action.payload
          state.isLoading = false
          state.isError = false
          state.message = data.message
          return {...state}
        }
        case 'AUTH_REGISTER_REJECTED': {
          const {message} = action.payload.response.data
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
          state.isLoading = false
          state.isError = false
          state.message = data.message
          return {...state}
        }
        case 'AUTH_ACCOUNT_CONFIRMATION_REJECTED': {
          const {message} = action.payload.response.data
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
          state.isLoading = false
          state.isError = false
          state.message = data.message
          return {...state}
        }
        case 'AUTH_FORGOT_PASSWORD_REJECTED': {
          const {message} = action.payload.response.data
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
          state.isLoading = false
          state.isError = false
          state.message = data.message
          return {...state}
        }
        case 'AUTH_CHANGE_PASSWORD_REJECTED': {
          const {message} = action.payload.response.data
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        
        case 'AUTH_EDIT_PASSWORD_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_EDIT_PASSWORD_FULFILLED': {
          const {data} = action.payload
          state.isLoading = false
          state.isError = false
          state.errorMsg = data.message
          return {...state}
        }
        case 'AUTH_EDIT_PASSWORD_REJECTED': {
          const {message} = action.payload.response.data
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        case 'AUTH_CHANGE_USERDATA_PENDING':{
          state.isLoading = true
          return state
        }
        case 'AUTH_CHANGE_USERDATA_FULFILLED': {
          const {data} = action.payload
          state.userData = data.result
          window.localStorage.setItem('seranUserData', JSON.stringify(state.userData))
          state.isLoading = false
          state.isError = false
          state.errorMsg = data.message
          return {...state}
        }
        case 'AUTH_CHANGE_USERDATA_REJECTED': {
          const {message} = action.payload.response.data
          state.isLoading = false
          state.isError = true
          state.errorMsg = message
          return {...state}
        }
        case 'AUTH_CLEAR' : {
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

export default auth