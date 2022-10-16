import React from 'react'
import {Link} from 'react-router-dom'
import '../Layout/components.css'
import useUser from '../hooks/useUser';
import logo from '../images/logoklein.png'



export default function Navigation(props) {
  const user = useUser()
  console.log(user);
  
  

  return (
    
      <div className='nav-component'>
        <div className="nav">
            <img src={logo} alt="logo" style={{width:'70px',height:'65px', borderRadius:'50%'}} />
            <h4>𝕋𝕣𝕖𝕗𝕗𝕖𝕟 𝔸𝕡𝕡​​​​​</h4>

            {user.data && <p className='fs-5'>Hallo <span style={{color: 'purple'}}>{user.data.firstname}</span></p>}
          
            <div>
              <button className='btn nav-btn'>
                <Link to= {'/'}>🏠 Home</Link>
              </button>

              {!user.data &&<button className='btn nav-btn'>
                <Link to= {'/login'}>login</Link>
              </button>}

              {user.data &&<button className='btn nav-btn' 
              onClick={async () => {await user.logout()}}><Link to= {'/login'}>logout</Link>
              </button>}
             
              {user.data && <span><Link to= {'/user/'+user.data._id}><img src= {user.data.avatar} alt="profilePhoto" style={{width:'40px',height:'40px' , borderRadius: '50%'}} /></Link></span>}
              
          </div>
      </div>
    
        {props.children}
        
        
    </div>
  )
}