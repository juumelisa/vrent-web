import httpAuth from "../../helpers/httpAuth"


export const login = (username, password)=> {
  const param = new URLSearchParams()
  param.append('username', username)
  param.append('password', password)
  return({
    type: 'AUTH_LOGIN',
    payload: httpAuth().post('/auth/login', param)
  })
}

export const register = (data)=> {
  const param = new URLSearchParams() //query string-like body
  param.append('name', data.name)
  param.append('username', data.username)
  param.append('email', data.email)
  param.append('password', data.password)
  param.append('confirmPassword', data.confirmPassword)
  return({
    type: 'AUTH_REGISTER',
    payload: httpAuth().post('/users', param)
  })
}

export const confirmAccount = (email, code)=> {
  const param = new URLSearchParams() //query string-like body
  param.append('email', email)
  param.append('code', code)
  return({
    type: 'AUTH_ACCOUNT_CONFIRMATION',
    payload: httpAuth().post('/auth/account-confirmation', param)
  })
}

export const forgotPassword = (username)=> {
  const param = new URLSearchParams() //query string-like body
  param.append('username', username)
  return({
    type: 'AUTH_FORGOT_PASSWORD',
    payload: httpAuth().post('/auth/forgot-password', param)
  })
}

export const changePassword = (data)=> {
  const param = new URLSearchParams()
  param.append('username', data.username)
  param.append('confirmCode', data.confirmCode)
  param.append('password', data.password)
  param.append('confirmPassword', data.confirmPassword)
  return({
    type: 'AUTH_CHANGE_PASSWORD',
    payload: httpAuth().post('/auth/forgot-password', param)
  })
}
export const changeOldPassword = (data, token) => {
  const param = new URLSearchParams()
  for (let x in data) {
    param.append(x, data[x])
  }
  return({
    type: 'AUTH_EDIT_PASSWORD',
    payload: httpAuth(token).patch('auth/change-password', param)
  })
}

export const getDataUser = (token)=> {
  return({
    type: 'AUTH_USERDATA',
    payload: httpAuth(token).get('/profile')
  })
}

export const changeDataUser = (data, token)=> {
  const param = new FormData()
  for (let x in data) {
    param.append(x, data[x])
  }
  return({
    type: 'AUTH_CHANGE_USERDATA',
    payload: httpAuth(token, true).patch('/users', param)
  })
}