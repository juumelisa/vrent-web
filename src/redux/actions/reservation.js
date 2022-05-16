import httpAuth from "../../helpers/httpAuth"

export const makeReservation = (data, token)=> {
  const param = new URLSearchParams()
  for (let x in data) {
    param.append(x, data[x])
  }
  return({
    type: 'FINAL_RESERVATION',
    payload: httpAuth(token).post('/histories', param)
  })
}

export const reservationData = (data) =>{
    return{
        type: 'RESERVATION_DATA',
        payload: data
    }
}