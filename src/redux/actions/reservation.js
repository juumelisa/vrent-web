import httpAuth from "../../helpers/httpAuth"

export const makeReservation = (data, token)=> {
  const param = new URLSearchParams()
  param.append('vehicle_id', data.vehicle_id)
  param.append('sum', data.sum)
  param.append('rent_date', data.rent_date)
  param.append('return_date', data.return_date)
  console.log(data)
  return({
    type: 'FINAL_RESERVATION',
    payload: httpAuth(token).post('/histories', param)
  })
}

export const reservationData = (data) =>{
    console.log(data)
    return{
        type: 'RESERVATION_DATA',
        payload: data
    }
}