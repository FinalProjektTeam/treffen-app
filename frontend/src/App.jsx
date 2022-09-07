import './App.css';
import React , {useState , useEffect , useContext} from "react";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import UserAccount from './components/UserAccount'
import EventsList from './components/EventsList';



function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navigation>
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
                <Route path = 'events-list' 
                          element = {<EventsList/>}/>
 
            </Routes>
            </div>
          </Navigation>
        </header>
    </div>
    </Router>
    
  );
}

export default App;
