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

export const deleteHistoryUser = (token, id) => {
  return({
    type: 'DELETE_HISTORY',
    payload: httpAuth(token).patch(`histories/delete/user/${id}`)
  })
}

export const deleteHistoryAdmin = (token, id) => {
  return({
    type: 'DELETE_HISTORY',
    payload: httpAuth(token).patch(`histories/delete/${id}`)
  })
}