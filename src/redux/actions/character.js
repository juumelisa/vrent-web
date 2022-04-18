import {default as axios} from 'axios'

export const getCharacter = ()=>{
    return{
        type: 'GET_CHARACTER',
        payload: axios.get('https://rickandmortyapi.com/api/character')
    }
}
