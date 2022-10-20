import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import "./messenger.scss"
import defaultAvatar from "../../images/avatar-maskulin.png"
import defaultAvatar1 from "../../images/avatar-feminin.jpg"


export default function Messenger() {
    const user = useUser()
    const [userData, setUserData] = useState({})
    const [ users, setUsers] = useState([])
    const [ friend, setFriend] = useState('')
    const [message, setMessage] = useState('')

    const [chat, setChat] = useState({})
    const [chatID, setChatID] = useState("")

    const [ friendName, setFriendName] = useState('')
    const [ friendImage, setFriendImage] = useState('')

    const [hideChatForm, setHideChatForm] = useState(false)

    
    useEffect( ()=>{
        // setReady(false)
        fetch('http://localhost:4000/user/all', {
          method: 'GET',
          credentials: 'include'
        })
        .then(async res=>{
          if(res.status === 200){
            const result = await res.json()
            setUsers(result)
            console.log('Users result is => ', result);
            console.log('User DATA ===> ', user.data);
          } 
        })
      }, [] )

      useEffect( ()=>{
        // setReady(false)
        console.log('friendID',friend);
        fetch('http://localhost:4000/chat?chatID='+chatID, {
          method: 'GET',
          credentials: 'include',
        })
        .then(async (res)=>{
            console.log("Friend ID",friend);
            if(res.status === 200){
              const result = await res.json()
              console.log('EFFECT Read CHAT =>: ',result);
              setChat(result)
            } 
        })
        .catch( (err)=>{
            console.log(err);
        })
      }, [chatID] )


      const handleSetChat = async(e)=>{
        console.log('SetChat KLAPPT');
        const res = await fetch('http://localhost:4000/chat/set', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              friend: friend,
          })
        })
        if(res.status === 200){
          const result = await res.json()
          console.log('Set Chat result ==> ', result);
          setChat(result)
          setChatID(result._id)
          setHideChatForm(true)
        } 
      }

    const handleSendMessage = async(e) =>{
        e.preventDefault()
      
       const res = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatID: chatID,
            friend: friend,
            message: message
        })
       })
       if(res.status === 200){
         const result = await res.json()
         console.log('Send Message result  ==> ', result);
         setChat(result)
         setMessage("")

         fetch('http://localhost:4000/chat?chatID='+chatID, {
          method: 'GET',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(async(res)=>{
          const result = await res.json()
          if(res.status === 200){
              setChat(result)
              setChatID(result._id)
              setHideChatForm(true)
          }
       })

       } 
    }

    const handleNotification = async(e)=>{

      const res = await fetch('http://localhost:4000/user/notification', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
     
       })

       const result = await res.json()
       if(res.status === 200){

          console.log('NOTIFICATION',user);
          // window.location.reload()
          
            const url = "http://localhost:4000/user/"+user.data._id;
            const fetchData = async()=>{
                try{
                    const response = await fetch(url);
                    const json = await response.json();
                    console.log("userData Obj", json);
                    setUserData(json)
                } catch (error){
                    console.log("error", error);
                }
            }
            fetchData();
       }
    }

  return (
    <div className='Messenger'>
        <h1 className='h3'>
            {/* <img src={user.data.avatar} /> */}
            
            {user.data.firstname} {user.data.lastname} &nbsp; CHAT
        </h1>
       { friendImage && <img src={friendImage} alt="Friend image"/>}
        {friendName && 
          <div className="border">
            <button onClick={handleSetChat}>Start Chat with: {friendName}</button>
        </div>}

        <ul className='users-list'>
            {users.filter(e=>e._id !== user.data._id).map(e=> (
                <li key={e._id} id={e._id}
                onClick={(event)=>{
                  event.preventDefault()
                  setFriend(event.target.id)
                  setFriendName(e.firstname+' '+e.lastname)
                  setChat('')
                  setHideChatForm(false)
                  setFriendImage(e.avatar)
                } }
                >
                    <img src={e.avatar? e.avatar : (e.gender === "Male"?defaultAvatar: defaultAvatar1 )} alt="avatar-bild" id={e._id} onClick={(event)=>{
                        setFriend(event.target.id)
                     }} />
                    <p id={e._id} onClick={(event)=>{
                        setFriend(event.target.id)
                     }} >{e.firstname} {e.lastname}</p>
                   
                    {/* <div>{e.messenger?.messages.map((c)=> <h4 >{c.message}</h4>)}</div> */}
                </li>
            )
        )}
        </ul>

        {
          user.data.notification && 
            <h1 title='Remove Notification' onClick={handleNotification}>
              New Message from: {user.data.chatting?.firstname+' '+user.data.chatting?.lastname}
            </h1>
        }

       { chat.messages &&  <div className="chat" style={{margin:"2rem"}}>
                    <ul className='chat-list'>
                        {chat.messages  && 
                            chat.messages.map(m=>
                                <li key={m._id} style={ {textAlign:
                                               (m.user.email === user.data.email ? 'left': 'right') } }>
                                    <img src={m.user.avatar ? m.user.avatar : (m.user.gender === 'Male' ? defaultAvatar : defaultAvatar1 ) } />
                                    {m.message} <hr/>
                                </li>
                            )
                        }
                    </ul>
                    {hideChatForm && <form className='chat-form'  onClick={handleSendMessage} >
                         <label htmlFor="text">chatting</label>
             
                         <input type="text" value={message} onChange={(event)=>setMessage(event.target.value)} />
                         <br />
                         <button type='submit'>Send</button>
                     </form>}
            </div>
       }

    </div>
  )
}
