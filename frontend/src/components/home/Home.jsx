import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Fire from '../loading/Fire'
import "./home.scss"

export default function Home() {

  const [ready, setReady] = useState(false)

  setTimeout(() => {
    setReady(true)
  }, 8000);

     if(!ready){
      return <Fire/>
    }
  return (
    <div className='Home'>
      <button className='home-btn'>
          <Link to= {'/events-list'}><h1>Explore Events</h1></Link>
      </button>
      
    </div>
  )
}

