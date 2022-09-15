import '../Layout/components.css'
import React , {useState , useEffect , useContext} from "react";
import {Link} from 'react-router-dom'
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const user = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await user.login({
          email: email,
          password: password
        })
        if(data){
          console.log('you are angemeldet');
          console.log('data by Login.jsx:',data);
          navigate('/user/'+data._id)
        }
      }

  return (
    <div className="login-bg-img-div ">
        <div className="login-form">
          <h2>Login</h2>
            <form onSubmit={handleSubmit} className="container">

                <label htmlFor="email" className="m-2 form-label "><b>Email </b></label><br/>
                <input type="email" placeholder="Your Email" className="m-2 form-control w-75"
                        value={email} onChange={(e)=> setEmail(e.target.value)} /><br/>

                <label htmlFor="password" className="m-2 form-label"><b>Password </b></label><br/>
                <input type="password" placeholder="Password" className="m-2 form-control w-75"
                        value={password} onChange={(e)=> setPassword(e.target.value)} /><br/>
            
                <input type="submit" className="m-2 btn btn-outline-warning"/>
            </form>
            <p className="m-3">haben Sie noch kein Account ? <br/>
            <button className='btn btn-outline-secondary m-3'><Link to= {'/register'}>zum Registration</Link></button></p>

            {user.error && <h3>{user.error}</h3>}
        </div>
    </div>
  )
}

