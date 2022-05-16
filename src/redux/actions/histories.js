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

export const getHistoryDetail = (token, id) => {
  return({
    type: 'GET_HISTORY_DETAIL',
    payload: httpAuth(token).get(`histories/${id}`)
  })
}

export const editHistoryStatus = (token, data) => {
  const param = new URLSearchParams()
  for (let x in data) {
    param.append(x, data[x])
  }
  return({
    type: 'EDIT_HISTORY',
    payload: httpAuth(token).patch(`histories/${data.id}`, param)
  })
}