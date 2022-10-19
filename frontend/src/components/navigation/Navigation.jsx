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

  const [newColor, setNewColor] = useState('')
  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  return (
    
      <div className='Navigation'>
        <div className="nav-container top-nav" >

            <img src={logo} alt="logo" style={{width:'60px'}} onClick={()=> window.open('/')/*location.reload()*/} /*title='Change Color'*//>
            
            <div>
            <h2>Treffen</h2>
            <h3>Spannende Neue Erfahrungen</h3>
            </div>

            {/* <div className="hamburger"> */}
              <input id="menu-toggle" type="checkbox" />
              <label className='menu-button-container' htmlFor="menu-toggle">
                  <div className='menu-button'></div>
              </label>
            {/* </div> */}

            <ul className='nav-buttons'>

             {/* <button className='nav-button'>
                <Link to= {'/'}> Home</Link>
              </button>*/}
              {/* 🏠 */}

             {!user.data &&  <button className='nav-button nav-button-one'>
                <Link to= {'/login'}>Login</Link>
              </button>}

           
              <button className='nav-button nav-button-two'>
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

        <footer className="footer" style={{backgroundImage: ` linear-gradient(to top,  black 20%, ${'#'+newColor&&newColor} 50%, white 90%) `, color: 'black', border:'solid 2px black'}}>
        <p className='text-secondary'>Folgen Sie uns auf Social Media</p>
            <a className='m-2' href="https://facebook.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/4494/4494475.png' alt="logo" style={{width:'30px',height:'30px', margin:'5px'}} /></a>
      
            <a className='m-2' href="https://twitter.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/4494/4494477.png' alt="logo" style={{width:'30px',height:'30px', margin:'5px'}} /></a>
      
            <a className='m-2' href="https://instagram.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/2111/2111463.png' alt="logo" style={{width:'30px',height:'30px', margin:'5px'}} /></a>
      
            <a className='m-2' href="https://linkedin.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/3536/3536505.png' alt="logo" style={{width:'30px',height:'30px', margin:'5px'}} /></a>
        </footer>
    </div>
  )
}