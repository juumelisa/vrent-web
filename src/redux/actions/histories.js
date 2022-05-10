import httpAuth from "../../helpers/httpAuth"

export const historyUser = (token) =>{
    return({
        type: 'GET_HISTORY',
        payload: httpAuth(token).get('/histories/user')
    })
}

export const historyAdmin = (token) =>{
  return({
      type: 'GET_HISTORY',
      payload: httpAuth(token).get('/histories')
  })
}