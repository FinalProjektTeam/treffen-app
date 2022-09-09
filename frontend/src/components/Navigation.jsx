import React from 'react'
import {Link} from 'react-router-dom'
import '../Layout/components.css'

export default function Navigation(props) {
  return (
    
      <div className='nav-component'>
        <div className="nav">
            <img src="images/first-logo.png" alt="logo" style={{width:'70px',height:'65px', borderRadius:'50%'}} />
            <h2>Treffen App</h2>
            <div>
              <button className='btn nav-btn'>
                <Link to= {'/'}>🏠 Home</Link>
              </button>

              <button className='btn nav-btn'>
                <Link to= {'/login'}>login</Link>
              </button>
              <span>👨</span>
              {/* <img src="" alt="profilePhoto" style={{width:'25px',height:'25px'}} /> */}
          </div>
      </div>
    
        {props.children}
        
    </div>
  )
}