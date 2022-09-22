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
     
    // let src;
    // const getImgSrc = (userId) =>{
    //   //susan
    //   if (userId ==='632311aa5fbc9db4aa5f922e' ) {src = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80';}
    //   //mark
    //   else if(userId ==='63231c305fbc9db4aa5f9269' ){
    //     src = 'https://image.gala.de/21783148/t/wf/v5/w960/r0.6667/-/mark-forster.jpg';
    //   }
    //   //Laura
    //   else if(userId ==='632321395fbc9db4aa5f92ab' ){
    //     src = 'https://i.scdn.co/image/ab6761610000e5ebbb20f5f6072ee4dd8d8bf1db';
    //   }
    //   // Tom
    //   else if(userId ==='63281a20f45a24bf9864c36c' ){
    //     src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Tom_Hiddleston_%2836109110291%29_%28cropped%29.jpg/220px-Tom_Hiddleston_%2836109110291%29_%28cropped%29.jpg';
    //   }

    //   return src
    // } 

  return (

    <div className="container userAccount_div">
        <div className="m-3">
          {userData.avatar && 
            <img src={userData.avatar} alt="avatar" className="p-3 avatar_img" />
          } 
          <h2>Hallo <span className="text-danger">{userData.firstname}</span></h2>
        </div>
        <div className="border m-3">
        {userData.events && userData.events.length>0 ? <p className="border p-2 " key={Math.random()}>created Events</p>: <p>You dont't have Events yet</p>}
        
          <ul className="sub-nav-list">
              {userData.events && userData.events.map(event=><span><li key={event._id} className="sub-item"><Link to={"/events-list/"+event._id}>{event.title}</Link></li><li className="text-secondary">{event.datum}</li></span>)}  
          </ul>
        </div>
        <div className="border m-3">
        {userData.eventslist && userData.eventslist.length>0 ? <p className="border p-2 " key={Math.random()}>Joined Events</p>: <p>You didnt't join Events yet</p>}
        
          <ul className="sub-nav-list">
              {userData.eventslist && userData.eventslist.map(event=><span><li key={event._id} className="sub-item"><Link to={"/events-list/"+event._id}>{event.title}</Link></li><li className="text-secondary">{event.datum}</li></span>)}  
          </ul>
      </div>

      <div>
        <Link to={"/create-event"}><button type="button" class="btn btn-warning btn-lg">create new Event</button></Link>
      </div>
      <div>
        <Link to={"/events-list"}><button type="button" class="btn btn-info btn-lg">Explore Events</button></Link>
      </div>
       
    </div>
  )
}
