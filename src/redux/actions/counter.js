export const change = (sum) =>{
    console.log(sum)
    return{
        type: 'CHANGE_SUM',
        payload: sum
    }
}