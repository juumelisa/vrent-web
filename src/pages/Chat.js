import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Helmets from '../components/Helmets';
import {db} from '../helpers/fb-config';
import { collection, getDocs } from 'firebase/firestore';
// import defaultUser from '../assets/images/default-user.png'
import {FiSend} from 'react-icons/fi';
import { FaChevronLeft } from 'react-icons/fa';

export const  Chat = () => {
  const token = window.localStorage.getItem("seranToken");
  const userData = JSON.parse(window.localStorage.getItem('seranUserData'))
  const navigate = useNavigate();
  const userCollection = collection(db, "users");
  const chatCollection = collection(db, "messages");
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chattingFriend, setChattingFriend] = useState();
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    const getUser = async () => {
      const data = await getDocs(userCollection);
      setUser(data.docs?.map(doc => ({...doc.data(), id: doc.id})))
    }
    const getMessages = async () => {
      const data = await getDocs(chatCollection);
      setMessages(data.docs?.map(doc => ({...doc.data(), id: doc.id})))

    }
    console.log(user)
    getUser();
    getMessages()
  }, [])
  // const addUser = async() => {
  //   await addDoc(userCollection, {name: name, email: email});
  // }
  return (
    <div className='d-flex vw-100 vh-100 bg-light'>
      <Helmets title={"Chat"} />
      <div className={`${chattingFriend ? 'd-none' : 'd-block'} col-12 col-lg-4 d-md-block p-3 bg-white`}>
        <h3>Chat</h3>
        <div onClick={() => setChattingFriend(1)}>
          <p>User A</p>
        </div>
      </div>
      <div className={`d-none ${!chattingFriend ?'d-md-flex' : ''} col-12 col-lg-8 justify-content-center align-items-center`}>
        <p>Select the user to start the chat</p>
      </div>
      <div className={`${chattingFriend ? 'd-flex' : 'd-none'} col-12 col-lg-8 flex-column position-relative`}>
        <div className='col-12 p-3 d-flex flex-row align-items-center bg-white sticky-top'>
          <div onClick={() => setChattingFriend()} className='d-lg-none me-3'>
						<FaChevronLeft size={30}/>
					</div>
          <p className='fw-bold p-0 m-0'>{userData.name}</p>
        </div>
        <div className='bg-light p-3 chat'>
          {messages?.map(msg => {
            return(
              <div key={msg.id} className={msg.senderId === 1 ? 'text-end' : ''}>
                <p className={`${msg.senderId === 1 ? 'bubbleBlue' : 'bg-warning'} p-2 rounded-3 bubble`}>{msg.chat}</p>
              </div>
            )
          })}
        </div>
        <div className='col-12 d-flex flex-row align-items-center position-absolute bottom-0'>
          <form className='position-relative col-12'>
            <input type="text" className='inputChat rounded-3 p-3 pe-5 border-0' style={{width: '100%', height:'50px', outline: 'none', paddingRight: '80px'}}/>
            <button className='position-absolute top-0 end-0 border-0 bubbleBlue' style={{width: '50px', height: '50px'}}><FiSend size={24} color='white'/></button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
