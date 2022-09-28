import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import "./eventsList.scss"

export default function EventList() {
  const [events, setEvents] = useState([])
  const [ready, setReady] = useState(false)
  const user = useUser()

  useEffect( ()=>{
    // setReady(false)
    fetch('http://localhost:4000/events', {
      method: 'GET',
      credentials: 'include'
    })
    .then(async res=>{
      if(res.status === 200){
        const result = await res.json()
        setEvents(result)
        setTimeout(()=>{
          setReady(true)
        }, 2000 )
        console.log('Events result is => ', result);
      } 
    })
  }, [] )

  if(ready){
    return (
      <div className='Events-List'>

        {
          user.data && 
          <Link to={'/create-event'}>Create new Event</Link>
        }

        <h2>Events-list </h2>
        {/* <p>noch nicht fertig</p>
        <img src="images/eventsList.png" alt="Events-list" /> */}
  
        <h2>Events entdecken</h2>

        <div className="cards-list">

          
          {
            events.map(e => (
              <div className="card" key={e._id} >
                <div className='card-image'>
                 { e.bild && <img src={e.bild.replace("uploads/", "http://localhost:4000/")} alt="Event-Image" />}
                </div>
                <h4> Title: {e.title}</h4>
                <ul>
                  <li>Ort: {e.adresse}</li>
                  {/* <li>Owner: {e.user.firstname+' '+e.user.lastname}</li> */}
                  <li>Category: {e.category}</li>
                  <li>Datum: {e.datum}</li>
                </ul>
                <button>
                  <Link to={'/events-list/'+e._id} >go to single event </Link>
                </button>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <h1>Loading..</h1>
  )
}
