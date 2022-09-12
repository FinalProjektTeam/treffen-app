import './App.css';
import React from "react";
<<<<<<< HEAD
import  {useState , useEffect , useContext} from 'react'
=======
// import  {useState , useEffect , useContext} from 'react'
>>>>>>> 0449d763afc8b0c864dce940585f242d40691795
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { UserProvider } from './hooks/useUser';
import Home from './components/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import UserAccount from './components/UserAccount'
import EventsList from './components/EventsList';
import Event from './components/Event';




function App() {
   return (
    <UserProvider>
      <Router>
        <div className="App">
          <header>
            <Navigation/>
              <div>
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
              </Routes>
              </div>
              
          </header>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;