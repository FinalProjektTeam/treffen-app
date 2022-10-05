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

    const [showInput, setShowInput] = useState(true)

    const [firstName, setFirstName] = useState(userData.firstname)
    const [lastName, setLastName] = useState(userData.lastname)
    // const [updateAge, setUpdateAge] = useState('')
    // const [updateImage, setUpdateImage] = useState('')

   
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

      const answer = window.confirm('Bist sicher ?')

      if(!answer) return 

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
    }

    const handleEditUser = async(e)=>{
      e.preventDefault()

      // alert(firstName)
      // const formData = new FormData()
      //   formData.append("firstname", firstName)
        // formData.append("lastname", updateLast)
        // formData.append("age", updateAge)
        // formData.append("bild", updateImage)

      const res = await fetch('http://localhost:4000/user',{
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName
        })
      })

      const result = await res.json()
      console.log('RESULT : ',result);

        console.log('RES : ',res);
        // setUserData(result)

        const url = `http://localhost:4000/user/${id}`

        const fetchData = async ()=>{
          try{
            const response = await fetch(url)
            const json = await response.json();
            console.log("userData Obj", json);
            setUserData(json)
            setShowInput(!showInput)
          }
          catch(error) {
            console.log(error);
          }
        }
        fetchData()
        
    }
    
   
  return (

    <div className="User-Account">

      <Link to={'/messenger'} >Start a Chat</Link>

      <div className="avatar">
        {
          
          <img src={userData.avatar ? userData.avatar : defaultAvatar} alt="avatar" />
        }
       
        {/* {
          !userData.avatar && <img src={defaultAvatar} alt="avatar"/>
        }  */}

          <h1>{showInput?  'Welcome' : 'Change your name'}</h1>
        { showInput && 
           <h2 title="Change User name" >
              Hallo {userData.gender === 'Male'? 'Mr':'Ms'} {userData.lastname} 
              <button onClick={()=> setShowInput(!showInput)} >Edit</button>
          </h2> 
        }

        { !showInput &&  <>
            <input type="text" value={firstName} placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)}/>
            <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder='Last Name'/>

            <button onClick={handleEditUser} >OK</button>
          </>
        }

        {userData && 
            <div className="" style={{width:'50%', margin : 'auto', border:'2px solid'}}>
                <p className="">{userData.firstname}'s Infos</p>
                <div className="userInfos" style={{textAlign : 'start' , width:'50%' , margin : 'auto'}}>
                    <li><b>Fullname : </b> <span className=''>{userData.firstname+' '+userData.lastname}</span></li>
                    <li><b>Age : </b> <span className=''>{userData.age}</span></li>
                    <li><b>Gender : </b> <span className=''>{userData.gender}</span></li>
                    <li><b>Email : </b> <span className=''>{userData.email}</span></li>

                </div>
            </div>
        }
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
