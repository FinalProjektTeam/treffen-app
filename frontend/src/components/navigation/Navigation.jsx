import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
// import '../../Layout/components.css'
import useUser from '../../hooks/useUser';
import "./navigation.scss"
import logo from "../../images/first-logo.png"
import defaultAvatar from '../../images/avatar-maskulin.png'


export default function Navigation(props) {
  const user = useUser()
  console.log(user);

 
  const handleLogout = async()=>{
    await user.logout()
  }

  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  return (
    
      <div className='Navigation'>
        <div className="nav-container top-nav" style={{backgroundImage: ` linear-gradient(to bottom, ${'#'+randomColor}, white 50%, black 90%) `}} >

            <img src={logo} alt="logo" style={{width:'50px', borderRadius:'50%'}} onClick={()=> window.location.reload()} title='Change Color'/>

            <h2>Treffen App</h2>

            {/* <div className="hamburger"> */}
              <input id="menu-toggle" type="checkbox" />
              <label className='menu-button-container' htmlFor="menu-toggle">
                  <div className='menu-button'></div>
              </label>
            {/* </div> */}

            <ul className='nav-buttons'>

              <button className='nav-button'>
                <Link to= {'/'}> Home</Link>
              </button>
              {/* 🏠 */}

             {!user.data &&  <button className='nav-button'>
                <Link to= {'/login'}>Login</Link>
              </button>}

           
              <button className='nav-button'>
                <Link to= {'/events-list'}>Explore Events</Link>
              </button>

             {user.data && 
                <button className='nav-button'>
                  <Link to= {'/user/'+user.data._id}>User Account</Link>
                </button>}

              {user.data && 
                  <button className='nav-button' onClick={handleLogout}>
                    <Link to= {'/login'}>Log out</Link>
                  </button>
              }

              {/* {user.data && 
                  <div className='user-avatar' >
                      <Link to= {'/user/'+user.data._id}>
                          <img src= {user.data.avatar ? user.data.avatar : defaultAvatar} alt="profilePhoto" style={{width:'40px',height:'40px' , borderRadius: '50%'}} />
                      </Link>
                  </div>
              } */}

          </ul>

      </div>
      <div className="components-body">
          {props.children}
      </div>

        <footer className="footer" style={{backgroundImage: ` linear-gradient(to top,  black 20%, ${'#'+randomColor} 50%, white 90%) `, color: 'black', border:'solid 2px black'}}>
          Here comes FOOTER
        </footer>
    </div>
  )
}