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
  return (

    <div className="container userAccount_div">
      <div className="m-3">
          <img src='https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80' alt="avatar" style={{width:'230px',height:'260px', borderRadius:'50%'}}  className="p-3" />
          <h2>Hallo <span className="text-danger">{userData.firstname}</span></h2>
      </div>
      <div className="border m-3">
        <p className="border p-2 ">Deine Events</p>
        <ul className="sub-nav-list">
              {userData.events && userData.events.map(event=><li className="sub-item"><Link to={"/events-list/"+event._id}>{event}</Link></li>)}
              <span><li>Event 1</li> <li className="text-secondary">Roll : Inhaber</li></span>
              <span><li>Event 2</li> <li className="text-secondary">Roll : Teilnehmer</li></span>
              <span><li>Event 3</li> <li className="text-secondary">Roll : Teilnehmer</li></span>
        </ul>
      </div>
      <div>
      <Link to={"/create-event"}><button type="button" class="btn btn-warning btn-lg">Neues Event erstellen</button></Link>
      
      </div>
       
    </div>
  )
}
