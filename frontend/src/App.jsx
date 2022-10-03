import './App.css';
import React from "react";

import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { UserProvider } from './hooks/useUser';
import Home from './components/home/Home'
import Navigation from './components/navigation/Navigation'
import Login from './components/login/Login'
import Register from './components/register/Register'
import UserAccount from './components/account/UserAccount'
import EventsList from './components/eventList/EventsList';
import Event from './components/event/Event';
import NewEvent from './components/newEvent/NewEvent';
import Loading from './components/loading/Loading';
import RunningMan from './components/loading/RunningMan';


function App() {
   return (
    <UserProvider>
      <Router>
        <div className="App"> 
            <Navigation>
           
              <Routes>
                  <Route path = '/' 
                            element = {<Home/>}/>
                  <Route path = '/login' 
                            element = {<Login/>}/>
                 <Route path = '/register' 
                            element = {<Register/>}/> 
                  <Route path = '/user/:id' 
                            element = {<UserAccount/>}/>
                            
                <Route path = '/events-list' 
                            element = {<EventsList/>}/>
                  <Route path = '/events-list/:eventID' 
                            element = {<Event/>}/>
                  <Route path = '/create-event' 
                            element = {<NewEvent/>}/>
                  <Route path = '/loading' 
                            element = {<Loading/>}/>
                  <Route path = '/run' 
                            element = {<RunningMan/>}/>
              </Routes>
             
            </Navigation>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;