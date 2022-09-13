
import '../Layout/components.css'
import React , {useState , useEffect , useContext} from "react";
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const user = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await user.login({
          email: email,
          password: password
        })
        if(status === 200){
          // navigate('/user/'+user.data._id)
          console.log(user.data);
        }
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

            {user.error && <h1>{user.error}</h1>}

        </div>
    </div>
  )
}

