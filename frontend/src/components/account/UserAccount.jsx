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

    const [firstname, setFirstName] = useState(userData.firstname)
    const [lastname, setLastName] = useState(userData.lastname)
    const [updateAge, setUpdateAge] = useState('')
    const [updateGender, setUpdateGender] = useState('Male')

    const [avatar, setAvatar] = useState('')
    const [showSuccess , setShowSuccess] = useState('false');


   
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
          firstname: firstname,
          lastname: lastname,
          age: updateAge,
          gender: updateGender,
          avatar: avatar
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
        setFirstName('')
        setLastName('')
        setUpdateAge('')
        setUpdateGender('')
        console.log('img: ', avatar);
    }
    
    // const handleUpdate = async e => {
    //   e.preventDefault()
    //   const status = await user.update({
    //     firstname,
    //     lastname,
    //     updateAge,
    //     updateImage
    //   })
  
    //   if(status === 200) {
    //     setShowSuccess(true)
    
    //     setTimeout(() => {
    //       setShowSuccess(false)
    //     }, 4000)
    //   }
    // }
       
   
  return (

    <div className="User-Account">

      <Link to={'/messenger'} >Start a Chat</Link>

      <div className="avatar">
        {
          
          <img src={userData.avatar ? userData.avatar : (userData.gender === 'Male'? defaultAvatar : defaultAvatar2)} alt="avatar" />
        }

          <h1>{showInput?  'Welcome' : 'Change Infos'}</h1>
        { showInput && 
           <h2 title="Change User name" >
              Hallo {userData.gender === 'Male'? 'Mr.':'Mrs.'} {userData.lastname} 
              <button onClick={()=> setShowInput(!showInput)} >Edit</button>
          </h2> 
        }
        {!showInput && <button onClick={handleEditUser} >OK</button>}

        {/* { !showInput &&  <>
            <input type="text" value={firstname} placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)}/>
            <input type="text" value={lastname} onChange={(e)=> setLastName(e.target.value)} placeholder='Last Name'/>

            </>
        } */}

        {userData && 
            <div className="" style={{width:'50%', margin : 'auto', border:'2px solid'}}>
                <p className="">{userData.firstname}'s Infos</p>
                <div className="userInfos" style={{textAlign : 'start' , width:'50%' , margin : 'auto'}}>
                    <li><b>Fullname : </b> 
                         { showInput ?  
                          <span className=''>{userData.firstname+' '+userData.lastname}</span>  :
                          <>
                           <input type="text" value={firstname} placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)}/>
                           <input type="text" value={lastname} onChange={(e)=> setLastName(e.target.value)} placeholder='Last Name'/>
                           </>}
                    </li>
                    <li><b>Age : </b> 
                        { showInput ? <span className=''>{userData.age}</span>: <input type={'text'} value={updateAge} onChange={(e)=> setUpdateAge(e.target.value)}/>}
                    </li>                       
                         <li><b>Gender : </b> <span className=''>{userData.gender}</span></li>
                    <li><b>Email : </b> <span className=''>{userData.email}</span></li>
                    <input type='file' accept='image/*' placeholder='Avatar...' onChange={e => setAvatar(e.target.files[0])}/>
                    {avatar && <img src={avatar}/>}

                </div>
            </div>
        }
      </div>
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
