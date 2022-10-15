import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import "./messenger.scss"
import defaultAvatar from "../../images/avatar-maskulin.png"
import defaultAvatar1 from "../../images/avatar-feminin.jpg"


export default function Messenger() {
    const user = useUser()

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
            const result = await res.json()
          if(res.status === 200){
            setUsers(result)
            console.log('Users result is => ', result);
          } 
        })
      }, [] )

      // useEffect( ()=>{
      //   // setReady(false)
      //   fetch('http://localhost:4000/chat', {
      //     method: 'GET',
      //     credentials: 'include',
      //   })
      //   .then(async (res)=>{
      //       console.log("Friend ID",friend);
      //       const result = await res.json()
      //       console.log('EFFECT CHAT =>: ',result);
      //     //   if(res.status === 200){
      //     // } 
      //   })
      //   .catch( (err)=>{
      //       console.log(err);
      //   })
      // }, [friend] )

      const handleSetChat = async(e)=>{
        console.log('es KLAPPT');
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
        const result = await res.json()
        console.log('Chat result is => ', result);
        if(res.status === 200){
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

    const handleStartChat = async(e) =>{
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
      const result = await res.json()
      console.log('LAST Chat result is => ', result);
       if(res.status === 200){
         setChat(result)
       } 
       setMessage("")
    }

  return (
    <div className='Messenger'>
        <h1 className='h3'>
            Have Fun {user.data.gender === "Male"?'Mr. ':"Mrs. "}
            {user.data.firstname} {user.data.lastname}
        </h1>
        {friendName && <h1>Chatting with: {friendName}</h1>}

        { friendName && <div className="border">
        {/* <h3>Start a Chat</h3> */}
            <button onClick={handleSetChat}>Start a Chat</button>
        </div>}

        {/* { chat.friend &&  <h3>Chatting with: {chat.friend?.firstname} {chat.friend?.lastname}</h3>} */}

        <ul className='users-list'>
            {users.filter(e=>e._id !== user.data._id).map(e=> (
                <li key={e._id} >

                    <img src={e.avatar? e.avatar : (e.gender === "Male"?defaultAvatar: defaultAvatar1 )} alt="avatar-bild" width={'50'} />

                    <p>{e.email}</p>
                    <button id={e._id} onClick={(event)=>{
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

       { chat &&  <div className="chat" style={{margin:"2rem"}}>
                <h1>Chat exist</h1>
                    <ul className='chat-list'>
                        {chat.messages  && 
                            chat.messages.map(m=>
                                <li key={m._id} style={ {textAlign: (m.user.email === user.data.email?'left': 'right')} }>
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
            <button onClick={handleStartChat}>Send</button>
        </form>}
       {/* <h1>{friend.firstname}</h1> */}


    </div>
  )
}
