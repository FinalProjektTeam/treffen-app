import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import Loading from '../loading/Loading.jsx'
import RunningMan from '../loading/RunningMan.jsx'
import "./eventsList.scss"
import noImage from "../../images/no-image.png"


export default function EventList() {

  const user = useUser()

  const [filterEvent, setFilterEvent] = useState([])

  const [events, setEvents] = useState([])
  const [ready, setReady] = useState(true)

  useEffect( ()=>{
    setReady(false)
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
    const searchResult = events.filter(e=>e.title.toLowerCase().includes(value.toLowerCase()) || e.adresse.toLowerCase().includes(value.toLowerCase()))
    setFilterEvent(searchResult)
    console.log('searchResult',searchResult);
  }

  if(ready){
    return (
      <div className='Events-List'>

        {
          user.data && 
          <button className='new-event-btn'>
            <Link to={'/create-event'}>Create new Event</Link>
          </button>
        }
        <h2 className='m-3 '>Discover our Events</h2>

        <div className='search-container'>
          <div className="search-form">
              <span className="" id="input-group-left-example">🔎</span>
              <input type="text" className="" placeholder="Search Events"  aria-describedby="input-group-left" onChange={(e)=>searchFunction(e.target.value)}/>
          </div>
        
          <div className="search-buttons" role="group">

              <button type="button" className=""
                onClick={()=>setFilterEvent(events)}
              >All</button>

              <button type="button" className=""
                onClick={()=>filterFunction('Allgemein')}
              >Allgemein</button>

              <button type="button" className=""
              onClick={()=>filterFunction('Kinder')}
              >Kinder</button>

              <button type="button" className=""
              onClick={()=>filterFunction('Erwachsene')}
              >Erwachsene</button>

          </div>
        </div>  
        <hr />

        <div className="cards-list">          
          {
            filterEvent.map(e => (
              <div className="card" key={e._id} >
                <div className='card-image'>
                 { e.bild ? 
                    <img src={e.bild.replace("uploads/", "http://localhost:4000/")} alt="Event-Image" />
                    :
                    <img src={noImage} alt="Not found!" />
                 }
                </div>
                <h4> Title: {e.title}</h4>
                <ul>
                  <li>Ort: {e.adresse}</li>
                  <li>Owner: {e.user.firstname+' '+e.user.lastname}</li>
                  <li>Category: {e.category}</li>
                  <li>Datum: {e.datum}</li>
                </ul>
                <button>{ user.data ?
                  <Link to={'/events-list/'+e._id} title='' >See more.. </Link>
                :
                <Link to={'/login'} title='Go to LOGIN site'>Sign in to see more.. </Link>
                }
                </button>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <Loading/>
  )
}
