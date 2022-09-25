import React from 'react'
import {Link} from 'react-router-dom'
// import '../../Layout/components.css'
import useUser from '../../hooks/useUser';
import "./navigation.scss"
import logo from "../../images/first-logo.png"


export default function Navigation(props) {
  const user = useUser()
  console.log(user);

  const handleLogout = async()=>{
    await user.logout()
  }

  return (
    
      <div className='Navigation'>
        <div className="nav-container">
            <img src={logo} alt="logo" style={{width:'70px',height:'65px', borderRadius:'50%'}} />

            <h2>Treffen App</h2>

            {user.data && <p>Hallo {user.data.firstname}</p>}


            <div className='nav-buttons'>
              <button className='nav-button'>
                <Link to= {'/'}>🏠 Home</Link>
              </button>

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
                  <button className='nav-buttonn' onClick={handleLogout}>
                    <Link to= {'/login'}>Log out</Link>
                  </button>
              }

              {user.data && 
                  <div className='user-avatar' >
                      <Link to= {'/user/'+user.data._id}>
                          <img src= {user.data.avatar} alt="profilePhoto" style={{width:'40px',height:'40px' , borderRadius: '50%'}} />
                      </Link>
                  </div>
              }

          </div>

      </div>
      <div className="components-body">
          {props.children}
      </div>

        <footer className="footer">
          Here comes FOOTER
        </footer>
    </div>
  )
}