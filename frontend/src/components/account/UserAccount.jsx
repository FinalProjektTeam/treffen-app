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
                const response = await fetch(url);
                const json = await response.json();
                console.log("userData Obj", json);
                setUserData(json)
              
            } catch (error){
                console.log("error", error);
            }
        }
        fetchData();
    }, [id])
  
    const handleDeleteEvent = async(e)=>{

      e.preventDefault()

      console.log(e.target.id)

      const res = await fetch('http://localhost:4000/events',{
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: e.target.id
        })
        })

        console.log('response: ',res);
        const result = await res.json()
        console.log('delete success');
        console.log(result);

        const url = "http://localhost:4000/user/"+id;
        const fetchData = async()=>{
            try{
                const response = await fetch(url);
                const json = await response.json();
                console.log("userData Obj", json);
                setUserData(json)
              
            } catch (error){
                console.log("error", error);
            }
        }
        fetchData();

        // if(res.status === 200){
        //   console.log('delete successful');
        //   fetch("http://localhost:4000/user/"+id, {
        //     method: "GET",
        //     credentials: 'include',
        //     headers: {
        //       "Content-Type": "application/json"
        //     }
        //   })
        //   .then(async(response) =>{
        //     const result = await response.json()
        //     console.log(result);
        //     setUserData(result)
        //   })
        //   .catch(err=>{
        //     console.log(err);
        //   })
        // }
        // else {
        //   console.log('delete hat nicht geklappt!');
        // }
      

    }
   
  return (

    <div className="User-Account">
      <div className="avatar">
        {
          userData.avatar && 
          <img src={userData.avatar} alt="avatar" />
        }
       
        {
          !userData.avatar && <img src={defaultAvatar} alt="avatar"/>
        } 

         
          <h2>Hallo {userData.firstname+' '+userData.lastname} </h2>
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
                          event &&
                            <li key={event._id} >
                                  <Link to={"/events-list/"+event._id} >{event.title}</Link>
                                  <p>{event.datum}</p>
                                  <button id={event._id} onClick={handleDeleteEvent}>Delete Event</button> 
                            </li>
                        )
                    }

              </ul>

              <ul className="joined-events">
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
