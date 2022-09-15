import React from 'react'
import {Link} from 'react-router-dom'
import '../Layout/components.css'
import useUser from '../hooks/useUser';
import {useParams} from "react-router-dom";
import profileBild from '../images/profileBild.png'


export default function Navigation(props) {
  const user = useUser()
  console.log(user);
  let {id} = useParams()
  

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
             
              {user.data && <span><Link to= {'/user/'+user.data._id}><img src= {profileBild} alt="profilePhoto" style={{width:'40px',height:'40px' , borderRadius: '50%'}} /></Link></span>}
              
          </div>
      </div>
    
        {props.children}
        
    </div>
  )
}