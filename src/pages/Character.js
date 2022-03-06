import { useEffect } from "react"
import { connect } from "react-redux"
import Layout from "../components/Layout"
import { getCharacter } from "../redux/actions/character"

export const Character = ({getCharacter, character:char})=>{

    useEffect(()=>{
        console.log(char)
        getCharacter()
    }, [])
    return(
        <Layout>
        <main className='container'>
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <form id='search' className='input-group'>
                            <input name="search" type="text" placeholder='Search character' className='form-control' />
                            <select name='gender' className='form-control'>
                                <option value='' style={{display: 'none'}}>Select a Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="genderless">Gender-less</option>
                                <option value="unknown">Unknown</option>
                            </select>
                            <button type='submit' className='btn btn-primary'>Search</button>
                        </form>
                    </div>
                </div>
                <div className='row my-5'>
                    {char.character.map((data, idx)=>{
                        console.log(data)
                        return(
                            <div style={{cursor: 'pointer'}} key={data.id} className='col-md-3'>
                                <div className='position-relative mb-2'>
                                    <img className='img-fluid' src={data.image} alt={data.name} />
                                    <div className='position-absolute bottom-0 start-0 bg-white px-3 py-2'>{data.name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </main>
        </Layout>
    )
}

const mapStateToProps = state =>({character: state.character})

const mapDispatchToProps = {getCharacter}

export default connect(mapStateToProps, mapDispatchToProps)(Character)