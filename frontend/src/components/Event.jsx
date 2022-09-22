
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Event() {
    const {eventID} = useParams() 

    const [event, setEvent] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [errors, setErrors] = useState([])

    //const [backendComment, setBackendComment] = useState('')

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
    }, [eventID])

    const handleJoinEvent = async() =>{

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
            //setBackendComment(result)
       }

       else if(result.error){
        console.log(result.error);
       }
       else if(result.errors){
        console.log(result.errors[0].msg);
       }
    }

    const handleAddComment = async(e)=>{
        e.preventDefault()
        setError('')

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
            console.log('Comment is=> ',result);
            
        }

        else if(result.error){
            setError(result.error)
            console.log(result.error);
        }
        else if(result.errors){
            setErrors(result.errors.map(e=><h2>{e.msg}</h2>))
            console.log(result.errors);
        }
        console.log('RES is: ',res);
        console.log('RESULT is: ',result);

        window.location.reload()
    }

  return (
    <div className='Event'>
        <h1>{event.title}</h1>
        {error && <h3 style={{color:'red'}}>{error}</h3> }
        {errors && <h3 style={{color:'red'}}>{error}</h3> }

        <div className="event-image">
            <img src={event.bild && event.bild.replace("uploads/","http://localhost:4000/")} alt="bild" width='25%' height='25%'/>
            <button onClick={handleJoinEvent} >Join</button>
        </div>
            {userExist && <h1 style={{color:'orangered'}}>You are already in this Team!</h1>}
            <div className="description-map">
            <div className="info">
                <ul>
                <li><b>Date :</b> <span className='text-primary'>{event.datum}</span></li>
                    {event.user && <li><b>Owner :</b> <span className='text-danger'>{event.user.firstname+' '+event.user.lastname}</span></li>}

                    <li><b>Category :</b> <span className='text-success'>{event.category}</span></li>
                </ul>

                <div className="description border p-3">
                    <h6>Description</h6>
                    <p className='text-secondary'>{event.description}</p>
                </div>
            </div>

            <div className="map">
                <h6>Adresse: {event.adresse}</h6>
                <div className="google-map"  >
                map comes here
                </div>
            </div>
        </div>

        <div className="comments">
            <h3>Comments</h3>
            <ul>
                {
                event.comments?.filter(comment=>comment.user).map(comment=>(
                    <li key={comment._id}>{comment.comment} ==== {comment.user.firstname}</li> 
                ))
                }
            </ul>
            {error && <h3 style={{color:'red'}}>{error}</h3> }

            <input type="text"  onBlur={(e)=> setComment(e.target.value)} placeholder='Write a comment' />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <div>
            <Link to={"/events-list"}><button type="button" class="btn btn-info btn-lg">Explore Events</button></Link>
        </div>
    </div>
  )
}
