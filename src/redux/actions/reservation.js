export const reservationData = (data) =>{
    console.log(data)
    return{
        type: 'RESERVATION_DATA',
        payload: data
    }
}