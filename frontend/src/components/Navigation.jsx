import React from 'react'
import {Link} from 'react-router-dom'

export default function Navigation(props) {
  return (
    <div>
        <h2>Navigation Route</h2>
        <div>
          <button className='btn'>
            <Link to= {'/'}>🏠 Home</Link>
          </button>

          <button className='btn'>
            <Link to= {'/register'}>Registrieren</Link>
          </button>

          <button className='btn'>
            <Link to= {'/login'}>login</Link>
          </button>
        </div>
        {props.children}
        
    </div>
  )
}