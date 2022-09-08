
import React from 'react'
import {Link} from 'react-router-dom'


export default function Home() {
  return (
    <div>
      <div className='home-bg-img-div'>
          <div className='home-explore-events-div'>
          <Link to= {'/events-list'}><h1>Explore Events</h1></Link></div>
      </div>
      
    </div>
  )
}

