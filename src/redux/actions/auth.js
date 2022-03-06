import httpAuth from "../../helpers/httpAuth"


export const login = (username, password)=> {
  const param = new URLSearchParams() //query string-like body
  param.append('username', username)
  param.append('password', password)
  console.log(username, password)
  return({
    type: 'AUTH_LOGIN',
    payload: httpAuth().post('/auth/login', param)
  })
}

export const getDataUser = (token)=> {
  return({
    type: 'AUTH_USERDATA',
    payload: httpAuth(token).get('/profile')
  })
}