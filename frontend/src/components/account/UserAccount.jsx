import React from "react";
import  {useState , useEffect } from 'react'
import useUser from '../../hooks/useUser';
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom'

// import defaultAvatar from "../images/avatar-maskulin.png"

export default function UserAccount() {
    let {id} = useParams()
    const user = useUser()
    let [userData, setUserData] = useState('');

   
     useEffect(()=>{
        const url = "http://localhost:4000/user/"+id;
        const fetchData = async()=>{
            try{
              if(Boolean(user.loggedIn)){
                const response = await fetch(url);
                const json = await response.json();
                console.log("userData Obj", json);
                setUserData(json)
              } 
            } catch (error){
                console.log("error", error);
            }
        }
        fetchData();
    }, [id])
  
   
  return (

    <div className="container userAccount_div">
      <div className="m-3">
        {
          userData.avatar && 
          <img src={userData.avatar} alt="avatar" style={{width:'230px',height:'260px', borderRadius:'50%'}}  className="p-3" />
          
        }
       {/* { !userData.avatar && <img src={defaultAvatar} alt="avatar" style={{width:'230px',height:'260px', borderRadius:'50%'}}  className="p-3"/>} */}

         
          <h2>Hallo <span className="text-danger">{userData.firstname}</span></h2>
      </div>
        <p className="border p-2 ">Deine Events</p>
      <div className="border m-3 d-flex justify-content-around">
        <ul className="sub-nav-list">
                <h3>Created Events</h3>
              { 
                userData.events && 
                userData.events.map((event)=><li key={event._id} className="sub-item"><Link to={"/events-list/"+event._id} >{event.title}</Link></li>)
              }

        </ul>

        { userData.eventslist &&                  
              <ul>
                  <h3>Joined Events</h3>
                  {userData.eventslist.map(e=> <li key={e._id}><Link to={"/events-list/"+e._id} >{e.title}</Link></li>)}
              </ul>   
        }
      </div>
      <div>
      <Link to={"/create-event"}><button type="button" className="btn btn-warning btn-lg">Neues Event erstellen</button></Link>
      
      </div>
       
    </div>
  )
}
