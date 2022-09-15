import React from "react";
import  {useState , useEffect , useContext} from 'react'
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

    let src;
    const getImgSrc = (userId) =>{
      //mark
      if (userId ==='632311aa5fbc9db4aa5f922e' ) {src = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80';}
      //susan
      else if(userId ==='63231c305fbc9db4aa5f9269' ){
        src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
      }
      //Laura
      else if(userId ==='632321395fbc9db4aa5f92ab' ){
        src = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
      }

      return src
    } 
  return (

    <div className="container userAccount_div">
      <div className="m-3">
          <img src={getImgSrc(userData._id)} alt="avatar" className="p-3 avatar_img" />
          <h2>Hallo <span className="text-danger">{userData.firstname}</span></h2>
      </div>
      <div className="border m-3">
        {userData.events && userData.events.length>0 ? <p className="border p-2 ">Deine Events</p>: <p>Du hast keine Events</p>}
        
        <ul className="sub-nav-list">
              {userData.events && userData.events.map(event=><span><li key={event._id} className="sub-item"><Link to={"/events-list/"+event._id}>{event.title}</Link></li><li className="text-secondary">{event._id}</li></span>)}
              
        </ul>
      </div>
      <div>
      <Link to={"/create-event"}><button type="button" class="btn btn-warning btn-lg">Neues Event erstellen</button></Link>
      
      </div>
       
    </div>
  )
}
