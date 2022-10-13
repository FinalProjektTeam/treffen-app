import React, { useState } from 'react'
import { useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import './event.scss'
import defaultAvatar from "../../images/avatar-maskulin.png"
import defaultAvatar1 from "../../images/avatar-feminin.jpg"
import noImage from "../../images/no-image.png"


export default function Event() {
    const {eventID} = useParams() 
    const user = useUser()

    const [event, setEvent] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [errors, setErrors] = useState([])

    const [title, setTitle] = useState("")
    const [datum, setDatum] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [bild, setBild] = useState("")


    const [ commentError, setCommentError] = useState(false)

    const [userExist, setUserExist] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    const [showInput, setShowInput] = useState(false)

 
    useEffect(()=>{
       fetch('http://localhost:4000/events/'+ eventID)
        .then(async res=>{
            if(res.status === 200){
                const result = await res.json()
                setEvent(result)    
                setIsFetching(true)
                console.log('EVENT is => ',result);
            }
        })
        .catch((err)=> console.log(err) )
    }, [eventID])

    const handleJoinEvent = async(e) =>{
        e.preventDefault()
        setError('')
        setErrors([])
        setUserExist(user.data.exist)
        setIsFetching(false)

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
           setUserExist(result.exist)
            console.log(result);

            if(!result.exist){
                alert('Thanks for joining our Event')
            }
            else if(result.exist){
                alert('You have left the Event!')
            }
            
            fetch('http://localhost:4000/events/'+eventID, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
             })
             .then(async(res)=>{
                const result = await res.json()
                console.log(result);
                if(res.status === 200){
                    setEvent(result)
                }
             })
       }
       else if(result.error){
        setError(result.error)
       }
       else if(result.errors){
        setErrors(result.errors.map(e=> <h3 style={{color:'red'}}>{e.msg}</h3>));
       }
    }

    const handleAddComment = async(e)=>{
        e.preventDefault()
        setError('')
        setErrors([])

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
             fetch('http://localhost:4000/events/'+eventID, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
             })
             .then(async(res)=>{
                const result = await res.json()
                if(res.status === 200){
                    setEvent(result)
                    setComment('')
                }
             })
        }
        else if(result.error){
            setError(result.error)
        }
        else if(result.errors){
            setErrors(result.errors.map(e=><h2>{e.msg}</h2>))
        }
    }

    const handleDeleteComment = async(e)=>{
        e.preventDefault()
        setError('')
        setErrors([])

        const answer = window.confirm('𝘼𝙧𝙚 𝙮𝙤𝙪 𝙨𝙪𝙧𝙚 𝙩𝙤 𝙙𝙚𝙡𝙚𝙩𝙚 𝙮𝙤𝙪𝙧 𝙘𝙤𝙢𝙢𝙚𝙣𝙩 ❓')
        if(!answer)return

        const res = await fetch('http://localhost:4000/comments', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: e.target.id,
                event: eventID
            })
        })

        const result = await res.json()

        if(res.status === 200){
            setEvent(result)
            console.log("Comment deleted");
        }
        else if(res.status === 201){
            console.log('Comment ERROR=> ', result);
            setCommentError(true)
            setTimeout(() => {
                setCommentError(false)
            }, 3000);
        }
        else if( result.error){
            setError(result.error)
        }
        else if( result.errors){
            setErrors(result.errors)
        }
    }

    const handleUpdateEvent = async(e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("datum", datum)
        formData.append("category", category)
        formData.append("description", description)
        formData.append("bild", bild)

        const res = await fetch('http://localhost:4000/events/'+eventID,{
            method: "PATCH",
            credentials: "include",
            body: formData
        })

        const result = await res.json()
        if(res.status === 200){
            fetch('http://localhost:4000/events/'+eventID, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async(res)=>{
                const result = await res.json()
                if(res.status === 200){
                    setEvent(result)
                }
             })
             setShowInput(false)
        }
        console.log('Updating Event: ',result);
    }

  return (
    <div className='Event'>
        <h1>{event.title}</h1>
        { error && <h3 style={{color:'red'}}>{error}</h3> }
        { errors && <div style={{color:'red'}}>{errors}</div> }

        <div className="event-image">
          {event.bild ?
            <img src={event.bild.replace("uploads/", "http://localhost:4000/")} alt="bild" />
            :
            <img src={noImage} alt="Not found!"/>
          }
        { user.data && <button onClick={handleJoinEvent} >
            {
            !isFetching ?  (userExist ? "Join" : "Leave event") : 'Click to Join or to leave Event'
            }
            </button>
        }
   
        </div>
            <br />
            <hr />
            <h1 className='event-details'>Event Details</h1>
        <div className="description-map">
            <div className="info">
                {
                  user.data && event.user &&  (user.data._id === event.user._id) && 
                (  showInput ?
                  <button onClick={handleUpdateEvent} >Update</button>
                  :
                  <button onClick={()=>setShowInput(!showInput)} >  Edit</button> 
                )
                }
                <br /> <br />
               { showInput ?
                   <>
                    <label htmlFor="title">Title: </label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/> <br/>

                    <label htmlFor="date">Date: </label>
                     <input type="date" value={datum} onChange={(e)=>setDatum(e.target.value)} placeholder=''/> <br />
                     <label htmlFor="category">Category: </label>
                     <select
                        defaultValue='Allgemein'
                        onChange={(e)=>setCategory(e.target.value)}>    
                        <option value="Allgemein">Allgemein</option>
                        <option value="Erwachsene">Erwachsene</option>
                        <option value="Kinder">Kinder</option>
                    </select>
                    <br />
                     <label htmlFor="description">Description: </label>
                     <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>   
                     <br />
                     <label htmlFor="image">New Image: </label>
                     <input type="file" accept='image/*' onBlur={(e)=>setBild(e.target.files[0])} />
                   </>
                    :
                    <ul>
                        <li>Datum: {event.datum}</li>
                        {event.user && <li>Owner: {event.user.firstname+' '+event.user.lastname}</li>}
                        <li>Category: {event.category}</li>
                        <li>
                        { !showInput &&  
                        <details>
                            <summary>Description</summary>
                            <p>{event.description}</p>
                        </details>
                        }
                        </li>
                    </ul>
               }

             
            </div>

            <div className="map">
                    <div className='map-link'>
                        <span>Adresse: {event.adresse}</span><br/>
                        {/* <span>{event.adresse}</span><br/> */}
                        <a href={encodeURI("https://www.google.com/maps/place/"+event.adresse) } target='_blank' rel="noreferrer"> 👉 Get Location</a>
                    </div>

                    <div className="google-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5131481.678620352!2d14.928379913698086!3d51.09727310845369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a721ec2b1be6b%3A0x75e85d6b8e91e55b!2z2KPZhNmF2KfZhtmK2Kc!5e0!3m2!1sar!2sde!4v1663926445941!5m2!1sar!2sde"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
            </div>
                    {/* <iframe src="https://www.google.com/maps/place/hamburg%E2%80%AD/@53.5584902,10.0679021,11z/data=!3m1!4b1!4m5!3m4!1s0x47b161837e1813b9:0x4263df27bd63aa0!8m2!3d53.5510682!4d9.9936962" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
        </div>

        <hr />
        <div className='event-team'>
                <h3 >Who is coming ?</h3>
                <ul>
                     { event.team && event.team.length>0 ? 
                     event.team.map((member)=><li key={member._id}>{member.firstname+' '+member.lastname}</li>)
                     :
                      <p>Be the first who will join this event .</p>}
                </ul>
        </div>
        <hr />
        <div className="comments">
            <h3>Comments</h3>
            <ul>
                {
                event.comments?.map(comment=>(
                   comment && <>
                    <li key={comment._id}>
                        <div>
                            <img src={comment.user.avatar ?  comment.user.avatar :  (comment.user.gender === "Male" ? defaultAvatar: defaultAvatar1 ) } />
                            <p>{comment.user.gender === 'Male'? "Mr.":"Mrs."} {comment.user.lastname}</p>
                        </div>
                        <p>{comment.comment}</p>
                        <div>
                            <button id={comment._id} onClick={handleDeleteComment} >Delete</button> 
                        </div>
                        
                    </li> 
                    <hr />
                    </>
                ))
                }
            </ul>
            {error && <h3 style={{color:'red'}}>{error}</h3> }
            {errors && <div style={{color:'red'}}>{errors}</div> }

            {commentError && <h3 style={{color: 'red'}}>You can't delete others Comment!</h3>}
            <input type="text" value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='Write a comment'/>
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    </div>
  )
}
