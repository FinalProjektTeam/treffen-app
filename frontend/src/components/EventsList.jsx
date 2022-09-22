import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';

export default function EventList() {
  const [events, setEvents] = useState([])
  const [ready, setReady] = useState(true)
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
       {user.data && <button className='btn btn-outline-danger m-4'><Link to={'/create-event'}>Create new Event</Link></button>}
       

        

        <h2 className='m-3 '>Discover our Events</h2>

        <div className="cards-list">
          {
            events.map(e => (
              <div className="card" key={e._id}>
                <div className='card-image'>
                  {/* <img src="" alt="Event-Image" /> */}
                </div>
                <h4>{e.title}</h4>
                <ul>
                  <li><b>Ort : </b> <span className='text-secondary'>{e.adresse}</span></li>
                  <li><b>Owner :</b> <span className='text-danger'>{e.user.firstname+' '+e.user.lastname}</span></li>
                  <li><b>Category :</b> <span className='text-success'>{e.category}</span></li>
                  <li><b>Date :</b> <span className='text-primary'>{e.datum}</span></li>
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
