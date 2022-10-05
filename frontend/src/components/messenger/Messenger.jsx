import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'

export default function Messenger() {
    const user = useUser()

    const [ users, setUsers] = useState([])
    const [ friend, setFriend] = useState('')
    const [message, setMessage] = useState('')

    const [chat, setChat] = useState({})

    
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

      useEffect( ()=>{
        // setReady(false)
        fetch('http://localhost:4000/chat', {
          method: 'GET',
          credentials: 'include'
        })
        .then(async (res)=>{
            console.log(friend);
          if(res.status === 200){
            const result = await res.json()
            setChat(result)
            console.log('Chat result is => ', result);
          } 
        })
        .catch( (err)=>{
            console.log(err);
        })
      }, [friend] )

    //   const handleChate = async()=>{
    //     const res = await fetch('http://localhost:4000/chat', {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //   }
    // const handleChate = async(e)=>{
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
            friend: friend,
            message: message
        })
       })

       const result = await res.json()
    }

  return (
    <div>
        <h1>Start a Chat</h1>
        <h3>{user.data.firstname} {user.data.lastname}</h3>

        <ul>
            { users.map(e=> (
                <li style={{border: '2px solid', width: '200px'}} key={e._id} >
                    <img src={e.avatar} alt="avatar-bild" width={'50'} />
                    <p>{e.email}</p>
                    <button id={e._id} onClick={(e)=> setFriend(e.target.id)}>
                        Chat
                    </button>
                </li>
            )
        )}
        </ul>

       { chat &&  <div className="chat">
                <h1>chat exist</h1>
                    <ul>
                        {/* {chat.message.map(m=><li>{m}</li>)} */}
                    </ul>
            </div>
       }

        <form >
            <label htmlFor="text">chatting</label>

            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
            <br />
            <button onClick={handleSendMessage}>Send</button>
        </form>
       {/* <h1>{friend.firstname}</h1> */}


    </div>
  )
}
