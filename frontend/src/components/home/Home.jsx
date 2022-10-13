import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import RunningMan from '../loading/RunningMan'
import "./home.scss"

export default function Home() {

  const [ready, setReady] = useState(false)

  setTimeout(() => {
    setReady(true)
  }, 3000);

  if(!ready){
    return <RunningMan/>
  }
  return (
    <div className='Home'>
      <button className='home-btn'>
          <Link to= {'/events-list'}><h1>Explore Events</h1></Link>
      </button>
      
    </div>
  )
}

