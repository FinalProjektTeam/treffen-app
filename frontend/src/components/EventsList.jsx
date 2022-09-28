import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser';

export default function EventList() {
  const [events, setEvents] = useState([])
  const [ready, setReady] = useState(true)
  const [filterEvent , setFilterEvent] = useState([])
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
        setFilterEvent(result)
        setTimeout(()=>{
        setReady(true)
        }, 2000 )
        console.log('Events result is => ', result);
      } 
    })

  }, [] )

    const filterFunction = (cat)=>{
      const filterResult = events.filter(e=>e.category === cat);
      setFilterEvent(filterResult);
    }

    const searchFunction = (value)=>{
      const searchResult = events.filter(e=>e.title.toLowerCase().includes(value.toLowerCase())|| e.adresse.toLowerCase().includes(value.toLowerCase()))
      setFilterEvent(searchResult)
      console.log('searchResult',searchResult);
    }

  if(ready){
    return (
      <div className='Events-List container'>
       {user.data && <button className='btn btn-outline-danger m-4'><Link to={'/create-event'}>Create new Event</Link></button>}
       
        <h2 className='m-3 '>Discover our Events</h2>

         <div className='d-flex justify-content-around mb-5'>
            <div className="input-group w-50 my-3">
                <span className="input-group-text" id="input-group-left-example">🔎</span>
                <input type="text" className="form-control" placeholder="Search Events"  aria-describedby="input-group-left" onBlur={(e)=>searchFunction(e.target.value)}/>
            </div>
          
            <div className="btn-group" role="group">

                <button type="button" className="btn btn-outline-warning my-2 px-3"
                 onClick={()=>setFilterEvent(events)}
                >All</button>

                <button type="button" className="btn btn-outline-primary my-2 px-3"
                 onClick={()=>filterFunction('Allgemein')}
                >Allgemein</button>

                <button type="button" className="btn btn-outline-success my-2 px-3"
                onClick={()=>filterFunction('Kinder')}
                >Kinder</button>

                <button type="button" className="btn btn-outline-danger my-2 px-3"
                onClick={()=>filterFunction('Erwachsene')}
                >Erwachsene</button>

            </div>
         </div>

        <div className="cards-list ">
          {
            filterEvent.map(e => (
              <div className="card bg-primary bg-opacity-10 m-2" key={e._id}>
                <h4 className='my-3 text-danger text-opacity-75'>{e.title}</h4>
                  <img src={e.bild && e.bild.replace("uploads/","http://localhost:4000/")} alt="bild" />
                <ul>
                  <li><b>Ort : </b> <span className='text-secondary'>{e.adresse}</span></li>
                  <li><b>Owner :</b> <span className='text-danger'>{e.user.firstname+' '+e.user.lastname}</span></li>
                  <li><b>Category :</b> <span className='text-success'>{e.category}</span></li>
                  <li><b>Date :</b> <span className='text-primary'>{e.datum}</span></li>
                </ul>
                <button className='btn btn-outline-info my-2'>
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
    <>
    <h1>Loading..</h1>
    <div className="spinner-grow text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    </>
  )
}
