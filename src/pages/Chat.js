import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Helmets from '../components/Helmets';
import Layout from '../components/Layout';
import {db} from '../helpers/fb-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const  Chat = () => {
  const token = window.localStorage.getItem("seranToken");
  const navigate = useNavigate();
  const userCollection = collection(db, "users");
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    const getUser = async () => {
      const data = await getDocs(userCollection);
      setUser(data.docs?.map(doc => ({...doc.data(), id: doc.id})))
    }
    console.log(user)
    getUser();
  }, [])
  const addUser = async() => {
    await addDoc(userCollection, {name: name, email: email});
  }
  return (
    <Layout>
      <Helmets title={"Chat"} />
      <div className='container'>
        <h1>Chat</h1>
        {user?.map(usr => {
          return (
            <div key={usr.id}>
              <p>{usr.email}</p>
              <p>{usr.name}</p>
            </div>
          )
        })
        }
        <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
        <input type="text" placeholder='Name' onChange={e => setName(e.target.value)}/>
        <button onClick={addUser}>Submit</button>
      </div>
    </Layout>
  )
}

export default Chat
