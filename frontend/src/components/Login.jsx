import React , {useState , useEffect , useContext} from "react";
import ReactDOM from 'react-dom/client';
import '../Layout/components.css'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Ihre Daten wurden geschickt`)
      }

  return (
    <div className="login-bg-img-div">
        <div className="login-form">
          <h2>Login</h2>
            <form onSubmit={handleSubmit} className="container">

                <label htmlFor="email" className="m-2"><b>Email </b></label><br/>
                <input type="email" placeholder="Your Email" className="m-2"
                        value={email} onChange={(e)=> setEmail(e.target.value)} /><br/>

                <label htmlFor="password" className="m-2"><b>Password </b></label><br/>
                <input type="password" placeholder="Password" className="m-2"
                        value={password} onChange={(e)=> setPassword(e.target.value)} /><br/>
            
                <input type="submit" className="m-2"/>
            </form>

        </div>
    </div>
  )
}