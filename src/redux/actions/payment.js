import httpAuth from "../../helpers/httpAuth"

export const createPayment = (data) => {
  return({
    type: 'CREATE_PAYMENT_STATUS',
    payload: httpAuth().post('/payment-status', data)
  })
}

export const getPaymentStatus = (id) => {
  return({
    type: 'GET_PAYMENT_STATUS',
    payload: httpAuth().get(`/payment-status/order/${id}`)
  })
}