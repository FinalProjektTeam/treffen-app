import React, { useState } from 'react'
import { useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import './event.scss'

export default function Event() {
    const {eventID} = useParams() 

    const [event, setEvent] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [errors, setErrors] = useState([])

    // const [backendComment, setBackendComment] = useState('')

    const [userExist, setUserExist] = useState(false)
 
    useEffect(()=>{
       fetch('http://localhost:4000/events/'+ eventID)
        .then(async res=>{
            if(res.status === 200){
                const result = await res.json()
                setEvent(result)    
                console.log('EVENT is => ',result);
            }
        })
        .catch((err)=> console.log(err) )
    }, [eventID])

    const handleJoinEvent = async() =>{
        setError('')
        setErrors([])
       const res = await fetch('http://localhost:4000/events/join', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: event._id
        })
       })

       const result = await res.json()
       
       if(res.status === 200){
            console.log(result);
            // console.log('USER EXIST => ', result.exist);

            setUserExist(result.exist)
            if(!result.exist){
                alert('Danke! dass du teilgenommen hast')
            } else if(result.exist){
                setTimeout(()=>{
                    setUserExist(false)
                }, 3000)
            }
            // setBackendComment(result)
       }

       else if(result.error){
        console.log(result.error);
        setError(result.error)
       }
       else if(result.errors){
        setErrors(result.errors.map(e=> <h3 style={{color:'red'}}>{e.msg}</h3>));
       }
    }

    const handleAddComment = async(e)=>{
        e.preventDefault()
        setError('')
        setErrors('')

        const res = await fetch('http://localhost:4000/comments', {
            method:'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment,
                event: event._id
            })
        })
        const result = await res.json()

        if(res.status === 200){
            // setComment('')
            console.log('Comment is=> ',result);

            //  fetch('http:localhost:4000/events/'+eventID, {
            //     method: 'GET',
            //     credentials: 'include',
            //  })
            //  .then(async(res)=>{
            //     const result = await res.json()
            //     console.log(result);
            //     if(res.status === 200){
            //         setEvent(result)
            //     }
            //  })
        }

        else if(result.error){
            setError(result.error)
            console.log(result.error);
        }
        else if(result.errors){
            setErrors(result.errors.map(e=><h2>{e.msg}</h2>))
            console.log(result.errors);
        }

        setTimeout(()=>{
            window.location.reload()
        },1000)
    }

  return (
    <div className='Event'>
        <h1>{event.title}</h1>
        {error && <h3 style={{color:'red'}}>{error}</h3> }
        {errors && <h3 style={{color:'red'}}>{errors}</h3> }

        <div className="event-image">
            <img src="" alt="" />
            <button onClick={handleJoinEvent} >Join</button>
        </div>
            {userExist && <h1 style={{color:'orangered'}}>Du bist schon in Team!</h1>}
        <div className="description-map">
            <div className="info">
                <ul>
                    <li>Datum: {event.datum}</li>
                    {event.user && <li>Owner: {event.user.firstname+' '+event.user.lastname}</li>}

                    <li>Category: {event.category}</li>
                </ul>

                <div className="description">
                    <h4>Description</h4>
                    <p>{event.description}</p>
                </div>
            </div>

            <div className="map">
                <h4>Adresse: {event.adresse}</h4>
                <div className="google-map"  >
                map comes here
                </div>
            </div>
        </div>

        <div className="comments">
            <h3>Comments</h3>
            <ul>
                {
                event.comments?.map(comment=>(
                    <li key={comment._id}>{comment.comment} ==== {comment.user.lastname}</li> 
                ))
                }
            </ul>
            {error && <h3 style={{color:'red'}}>{error}</h3> }
            <input type="text" value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='Write a comment' />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    </div>
  )
}
