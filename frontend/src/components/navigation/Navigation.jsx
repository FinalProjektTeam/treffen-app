import React from 'react'
import {Link} from 'react-router-dom'
// import '../../Layout/components.css'
import useUser from '../../hooks/useUser';


export default function Navigation(props) {
  const user = useUser()
  console.log(user);

  const handleLogout = async()=>{
    await user.logout()
  }

  return (
    
      <div className='Navigation'>
        <div className="nav">
            <img src="images/first-logo.png" alt="logo" style={{width:'70px',height:'65px', borderRadius:'50%'}} />
            <h2>Treffen App</h2>
            <div>
              <button className='nav-buttons'>
                <Link to= {'/'}>🏠 Home</Link>
              </button>

             {!user.data &&  <button className='nav-buttons'>
                <Link to= {'/login'}>login</Link>
              </button>}

           
              <button className='nav-buttons'>
                <Link to= {'/events-list'}>Explore Events</Link>
              </button>

             {user.data && <p className='nav-buttons'>
                <Link to= {'/user/'+user.data._id}>User Account</Link>
              </p>}

              {user.data && <button className='nav-buttons' onClick={handleLogout}>
                <Link to= {'/login'}>Log out</Link>
              </button>}
          </div>
      </div>
        {props.children}

        <footer className="footer">
          Here comes FOOTER
        </footer>
    </div>
  )
}