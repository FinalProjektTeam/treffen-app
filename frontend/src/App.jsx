import './App.css';
<<<<<<< HEAD
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import UserAccount from './components/UserAccount'



function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navigation>
              <h1>Treffen App</h1>
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
 
            </Routes>
            </div>
          </Navigation>
        </header>
    </div>
    </Router>
    
=======
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
    
      <h1>Test</h1>

      <div className="components">
        <Home />
        <Login  />
      </div>
    </div>
>>>>>>> 7b62de3b824d990f1beaf3700566bb9cb8de4db7
  );
}

export default App;
