import '../../Layout/components.css'
import React , {useState} from "react";
import {Link} from 'react-router-dom'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [eingeloggt , setEingeloggt] = useState(false);

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
    <div className="login-bg-img-div ">
        <div className="login-form">
          <h2>Login</h2>

          {!eingeloggt && <h3>you have to registrate</h3>}

            <form onSubmit={handleSubmit} className="login-container">

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

               {user.error && <h3 style={{color:'red'}} >{user.error}</h3>}
               { user.errors && <h3 style={{color:'red'}}>{user.errors.map(e=> <h4 key={e.param}>*- {e.msg}</h4>)}</h3>}

        </div>
    </div>
  )
}

