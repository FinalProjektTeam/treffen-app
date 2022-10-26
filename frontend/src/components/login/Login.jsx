import '../../Layout/components.css'
import React , {useState} from "react";
import {Link} from 'react-router-dom'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import './login.scss'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [eingeloggt , setEingeloggt] = useState(Boolean);

    const user = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await user.login({
          email: email,
          password: password
        })
        if(data._id){
          console.log('you are angemeldet');
          console.log('data by Login.jsx:',data);
          setEingeloggt(true)
          navigate('/user/'+data._id)
        }
        else{
          setEingeloggt(false)
        }
      }

  return (
    <div className="Login">
        <div className="login-form">
        <fieldset>
          <legend>Sign in</legend>
          <form onSubmit={handleSubmit}>
                <input type="email" placeholder="E-Mail" value={email} 
                onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} 
                onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit">Log in</button>
          </form>
        </fieldset>

        {user.error && <h3 style={{color:'red'}} >{user.error}</h3>}
        { user.errors && <h3 style={{color:'red'}}>{user.errors.map(e=> <h4 key={e.param}>{e.msg}</h4>)}</h3>}

        <div className="register-link">
            <p >Don't have an account?</p>

            <button>
              <Link to= {'/register'}>Sign up</Link>
            </button>
        </div>

             

        </div>
    </div>
  )
}

