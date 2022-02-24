import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {default as axios} from 'axios'

export const Vehicles = () => {
    const [character, setCharacter] = useState([])
    const [page, setPage] = useState({})

    useEffect(()=>{
        getCharacter()
    },[])

    const getCharacter = async ()=> {
        const {data} = await axios.get('https://rickandmortyapi.com/api/character')
        setCharacter(data.results)
        setPage(data.info)
    }

    const getNextData = async (url) => {
        const {data} = await axios.get(url)
        setCharacter([
            ...character,
            ...data.results
        ])
        setPage(data.info)
    }
    return (
        <Layout>
            <main className='container'>
                <div className='row my-5'>
                    {character.map((data, idx)=>{
                        return(
                            <div className='col-md-3'>
                                <div className='position-relative mb-2'>
                                    <img className='img-fluid' src={data.image} alt={data.name} />
                                    <div className='position-absolute bottom-0 start-0 bg-white px-3 py-2'>{data.name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='row my-5'>
                    <div className='col-md-12 text-center'>
                        <button onClick={()=>getNextData(page.next)} className='btn btn-primary'>Load More</button>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Vehicles