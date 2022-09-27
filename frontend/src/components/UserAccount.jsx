import React from "react";
import  {useState , useEffect} from 'react'
import useUser from '../hooks/useUser';
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom'


export default function UserAccount() {
    let {id} = useParams()
    const user = useUser()
    let [userData, setUserData] = useState('');
   
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
     
    
  return (

    <div className="container userAccount_div">
        <section className="p-4 d-flex justify-content-around align-items-center" style={{width:'70%', margin : 'auto'}}>
          <div className="m-3">
          {userData.avatar && 
            <img src={userData.avatar} alt="avatar" className="p-3 avatar_img" />
          } 
          <h2>Hallo <span className="text-danger">{userData.firstname}</span></h2>
          </div>

          {userData && <div className="border p-3 bg-light" style={{width:'50%', margin : 'auto'}}>
            <p className="text-primary">{userData.firstname}'s Infos</p>
            <div className="userInfos" style={{textAlign : 'start' , width:'50%' , margin : 'auto'}}>
            <li><b>Fullname : </b> <span className='text-secondary'>{userData.firstname+' '+userData.lastname}</span></li>
            <li><b>Age : </b> <span className='text-secondary'>{userData.age}</span></li>
            <li><b>Gender : </b> <span className='text-secondary'>{userData.gender}</span></li>
            <li><b>Email : </b> <span className='text-secondary'>{userData.email}</span></li>

            </div>
          </div>}

        </section>

        <div className="border m-3">
        {userData.events && userData.events.length>0 ? <p className="border p-2 createdEv-div" key={Math.random()}>Created Events</p>: <p>You dont't have Events yet</p>}
        
          <ul className="sub-nav-list">
              {userData.events && userData.events.map(event=><span><li key={event._id} className="sub-item"><Link to={"/events-list/"+event._id}>{event.title}</Link></li><li className="text-secondary">{event.datum}</li></span>)}  
          </ul>
        </div>
        <div className="border m-3">
        {userData.eventslist && userData.eventslist.length>0 ? <p className="border p-2 joinedEv-div" key={Math.random()}>Joined Events</p>: <p>You didnt't join Events yet</p>}
        
          <ul className="sub-nav-list">
              {userData.eventslist && userData.eventslist.map(event=><span><li key={event._id} className="sub-item"><Link to={"/events-list/"+event._id}>{event.title}</Link></li><li className="text-secondary">{event.datum}</li></span>)}  
          </ul>
      </div>

      <div>
        <Link to={"/create-event"}><button type="button" class="btn btn-outline-warning btn-lg">create new Event</button></Link>
      </div>
      <div>
        <Link to={"/events-list"}><button type="button" class="btn btn-outline-info btn-lg my-3">Explore Events</button></Link>
      </div>
       
    </div>
  )
}
