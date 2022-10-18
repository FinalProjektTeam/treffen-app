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
    // const handleChat = async(e)=>{
    //     e.preventDefault()
    //     setFriend(e.target.id)

    //     const setData = async () =>{
    //         try{
    //             const response = await fetch('http://localhost:4000/chat')
    //             const json = await response.json();
    //             console.log("Chat Obj", json);
    //             setChat(json)
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }
    //     setData()
    //   }

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
            Have Fun &nbsp;
            {user.data.firstname} {user.data.lastname}
        </h1>
        {friendName && <><h1>Chatting with: {friendName}</h1>

       <div className="border">
        {/* <h3>Start a Chat</h3> */}
            <button onClick={handleSetChat}>Set a Chat</button>
        </div></>}

        {/* { chat.friend &&  <h3>Chatting with: {chat.friend?.firstname} {chat.friend?.lastname}</h3>} */}

        <ul className='users-list'>
            {users.filter(e=>e._id !== user.data._id).map(e=> (
                <li key={e._id} >

                    <img src={e.avatar? e.avatar : (e.gender === "Male"?defaultAvatar: defaultAvatar1 )} alt="avatar-bild" width={'50'} />

                    <p>{e.email}</p>
                    <p>{e.name}</p>
                    <button id={e._id} onClick={(event)=>{
                      event.preventDefault()
                      setFriend(event.target.id)
                      setFriendName(e.firstname+' '+e.lastname)
                      setChat('')
                      setHideChatForm(false)
                    } }>
                        Chat
                    </button>

                    {/* <div>{e.messenger?.messages.map((c)=> <h4 >{c.message}</h4>)}</div> */}
                </li>
            )
        )}
        </ul>

        {
          user.data.notification && 
            <h1 onClick={handleNotification}>
              You have got a new Message| From: {user.data.chatting?.firstname}
            </h1>
        }
        {!user.data.notification && <h1>No Notification</h1>}

        {/* {user.data.notification && <h1>You have got a new Message from: {user.data.chatting.firstname+' '+user.data.chatting.lastname}</h1>} */}

       { chat &&  <div className="chat" style={{margin:"2rem"}}>
                <h1>Chat exist</h1>
                    <ul className='chat-list'>
                        {chat.messages  && 
                            chat.messages.map(m=>
                                <li key={m._id} style={ {textAlign: (m.user.email === user.data.email?'left': 'right')} }>
                                    <img src={m.user.avatar? m.user.avatar : (m.user.gender === 'Male' ? defaultAvatar : defaultAvatar1 ) } />
                                    {m.user?.firstname} said: <br/>
                                    {m.message} <hr/>
                                </li>
                            )
                        }
                    </ul>
            </div>
       }

       {hideChatForm && <form >
            <label htmlFor="text">chatting</label>

            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
            <br />
            <button onClick={handleSendMessage}>Send</button>
        </form>}
    </div>
  )
}
