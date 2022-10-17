import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
// import '../../Layout/components.css'
import useUser from '../../hooks/useUser';
import "./navigation.scss"
import logo from "../../images/Logoklein.png"
import defaultAvatar from '../../images/avatar-maskulin.png'
import defaultAvatar1 from '../../images/avatar-feminin.jpg'



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
        <div className="nav-container top-nav" style={{backgroundColor: 'whitesmoke'}} >

            <img src={logo} alt="logo" style={{width:'50px', borderRadius:'50%'}} title='App Logo'/>

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
                  <Link to= {'/user/'+user.data._id}>Account</Link>
                </button>}

              {user.data && 
                  <button className='nav-button' onClick={handleLogout}>
                    <Link to= {'/login'}>Log out</Link>
                  </button>
              }

              {user.data && 
                  <button className='user-avatar' >
                      <Link to= {'/user/'+user.data._id}>
                          <img src= {user.data.avatar ? user.data.avatar : (user.data.gender ==='Male'? defaultAvatar: defaultAvatar1)} alt="profilePhoto" style={{width:'40px',height:'40px' , borderRadius: '50%'}} />
                      </Link>
                  </button>
              }

          </ul>

      </div>
      <div className="components-body">
          {props.children}
      </div>

        <footer className="footer" style={{backgroundImage: ` linear-gradient(to top,  black 20%, ${'#'+newColor&&newColor} 50%, white 90%) `, color: 'black', border:'solid 2px black'}}>
          Here comes FOOTER
        </footer>
    </div>
  )
}