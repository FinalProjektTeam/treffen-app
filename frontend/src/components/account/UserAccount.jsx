import React from "react";
import  {useState , useEffect } from 'react'
import useUser from '../../hooks/useUser';
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom'
import "./account.scss"

import defaultAvatar from "../../images/avatar-maskulin.png"

export default function UserAccount() {
    let {id} = useParams()
    const user = useUser()
    let [userData, setUserData] = useState({});

   
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

    <div className="User-Account">
      <div className="avatar">
        {
          userData.avatar && 
          <img src={userData.avatar} alt="avatar" style={{width:'230px',height:'260px', borderRadius:'50%'}} />
        }
       
       { !userData.avatar && <img src={defaultAvatar} alt="avatar" style={{width:'230px',height:'260px', borderRadius:'50%'}}/>} 

         
          <h2>Hallo <span >{userData.firstname}</span></h2>
      </div>
      <div className="events">
              <ul className="created-events">
                      { userData.events?.length > 0 ? 
                            <h3>Created Events</h3>
                            : 
                            <h3>You dont't have Events yet</h3>
                      }

                    { 
                      userData.events && 
                        userData.events.map((event)=>
                            <li key={event._id} >
                                  <Link to={"/events-list/"+event._id} >{event.title}</Link>
                                  <p>{event.datum}</p>
                            </li>
                        )
                    }

              </ul>

              <ul>
                  <h3>Joined Events</h3>
              { userData.eventslist &&                  
                    userData.eventslist.map(event=> 
                        <li key={event._id}>
                            <Link to={"/events-list/"+event._id} >{event.title}</Link>
                            <p>{event.datum}</p>
                        </li>
                    )
              }
              </ul>   
      </div>
      
      <div className="new-event">
        <Link to={"/create-event"}>
            <button>Create new Event</button>
        </Link>
      </div>
      <div>
        <Link to={"/events-list"}>
            <button>Explore Events</button>
        </Link>
      </div>
       
    </div>
  )
}
