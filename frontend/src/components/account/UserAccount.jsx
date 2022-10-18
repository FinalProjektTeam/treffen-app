import React from "react";
import  {useState , useEffect } from 'react'
import useUser from '../../hooks/useUser';
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom'
import "./account.scss"

import defaultAvatar from "../../images/avatar-maskulin.png"
import defaultAvatar2 from "../../images/avatar-feminin.jpg"


export default function UserAccount() {
    let {id} = useParams()
    const user = useUser()
    let [userData, setUserData] = useState({});

    const [showInput, setShowInput] = useState(true)

    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [updateAge, setUpdateAge] = useState('')
    const [updateGender, setUpdateGender] = useState('Male')

    const [avatar, setAvatar] = useState('')
    const [showSuccess , setShowSuccess] = useState(false);


   
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

      const answer = window.confirm('Bist du sicher ?')

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

        const result = await res.json()
        console.log('Delete Success');
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

      const formData = new FormData()
        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("age", updateAge)        
        formData.append("gender", updateGender)
        formData.append("avatar", avatar)

      const res = await fetch('http://localhost:4000/user',{
        method: 'PATCH',
        credentials: 'include',
  
        body: formData
      })

      const result = await res.json()

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

      <div className="user">

        <div className="avatar">
          {
            <img src={userData.avatar ? userData.avatar : (userData.gender === 'Male'? defaultAvatar : defaultAvatar2)} alt="avatar" />
          }
          <h2>
            Hallo {userData.gender === 'Male'? 'Mr.':'Mrs.'} {userData.lastname} 
          </h2>
        </div>

        {userData && 
            <div className="infos">
              { showInput ?
                  <button title="Change User name" onClick={()=> setShowInput(false)} >Edit</button>
                  :
                  <button onClick={handleEditUser} >Update</button>
              }
              <p className="">{userData.firstname}'s Info</p>
              <ul className="user-infos">
                  <li><b>Fullname : </b> 
                      { showInput ?  
                          <span className=''>{userData.firstname+' '+userData.lastname}</span>  :
                          <div className="input-name">
                           <input type="text" value={firstname} placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)}/>
                           <input type="text" value={lastname} onChange={(e)=> setLastName(e.target.value)} placeholder='Last Name'/>
                          </div>
                      }
                    </li>
                    <li><b>Age : </b> 
                        { showInput ? <span className=''>{userData.age}</span>: <input type={'number'} value={updateAge} onChange={(e)=> setUpdateAge(e.target.value)}/>}
                    </li>                       
                    
                    <li><b>Gender : </b> {showInput ? <span className=''> {userData.gender}</span>: <><label>Male</label> <input type="checkbox" onClick={(e)=>setUpdateGender('Male')} /> <label>Female</label> <input type="checkbox" onClick={(e)=>setUpdateGender('Female')} /></>} </li>

                    <li><b>Email : </b> <span className=''>{userData.email}</span></li>

                    { !showInput &&
                        <input type='file' accept='image/*' placeholder='Avatar...' 
                          onChange={e => setAvatar(e.target.files[0])}/>
                    }

                </ul>
            </div>
        }
      </div>

      {userData.notification && <h1>You got new Message</h1>}
      
      <div className="events">
        {/* <img src="" alt="" /> */}
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
                                  <p>{event.adresse}</p>
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
                            <p>{event.adresse}</p>
                            <Link to={"/events-list/"+event._id} >See more..</Link>

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
      <div className="explore-events">
        <Link to={"/events-list"}>
            <button>Explore Events</button>
        </Link>
      </div>
       
    </div>
  )
}