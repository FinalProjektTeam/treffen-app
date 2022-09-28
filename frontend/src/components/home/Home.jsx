import React from 'react'
import {Link} from 'react-router-dom'
import "./home.scss"

export default function Home() {
  return (
    <div className='Home'>
      <button className='home-btn'>
          <Link to= {'/events-list'}><h1>Explore Events</h1></Link>
      </button>
      
    </div>
  )
}

