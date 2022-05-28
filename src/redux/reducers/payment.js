const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: null,
  errMessage: null,
};

const payment = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_PAYMENT_STATUS_PENDING': {
      state.isLoading = true;
      state.isError = false;
      state.errMessage = null;
      return {...state}
    }
    case 'GET_PAYMENT_STATUS_FULFILLED': {
      const {data} = action.payload;
      console.log(data)
      state.data = JSON.parse(data.result.response_midtrans);
      state.message = data.message;
      state.isLoading = false;
      state.isError = false;
      state.errMessage = null;
      return {...state};
    }
    case 'GET_PAYMENT_STATUS_REJECTED': {
      const {data} = action.payload.response;
      state.errMessage = data.message;
      state.isError = true;
      state.isLoading = false;
      return {...state}
    }case 'CREATE_PAYMENT_STATUS_PENDING': {
      state.isLoading = true;
      state.isError = false;
      state.errMessage = null;
      return {...state}
    }
    case 'CREATE_PAYMENT_STATUS_FULFILLED': {
      const {data} = action.payload;
      state.data = JSON.parse(data.result.response_midtrans);
      state.message = data.message;
      state.isLoading = false;
      state.isError = false;
      state.errMessage = null;
      return {...state};
    }
    case 'CREATE_PAYMENT_STATUS_REJECTED': {
      const {data} = action.payload.response;
      state.errMessage = data.message;
      state.isError = true;
      state.isLoading = false;
      return {...state}
    }
    case 'CLEAR_PAYMENT_STATE': {
      state.data = {}
      state.isLoading = false;
      state.isError = false;
      state.errMessage = null;
      state.message = null
      return {...state}
    }
    default:
      return {...state}
  }
}

export default payment;