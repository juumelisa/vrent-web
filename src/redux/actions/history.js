import httpAuth from "../../helpers/httpAuth"

export const history = (token) =>{
    return({
        type: 'GET_HISTORY',
        action: httpAuth(token).get('/histories/user')
    })
}