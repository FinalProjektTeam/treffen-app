import '../../Layout/components.css';
import React , {useState} from "react";
import {Link} from 'react-router-dom'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import "./register.scss"

export default function Register() {
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('Male');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState('');

    const user = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await user.register({
          email: email,
          password: password,
          firstname : firstname,
          lastname : lastname,
          gender : gender,
          age: age,
          avatar:avatar
        })
        
        if(data ){
          console.log('submit klappt');
          console.log('REGIST DATA: ',data);
          console.log('USER DATA: ',user);
          navigate('/user/'+data._id)
        } else{
        //   navigate('/user/login')
        console.log('data not found');
        }
      }

      setTimeout(() => {
        user.error = ''
        user.errors = []

      }, 3000);

  return (
    <div className="Register">
      <div className="register-form">
          <fieldset>
                <legend>Sign up</legend>

              <form onSubmit={handleSubmit} className="register-form">

                <div className="element">
                        <input type="email" placeholder="E-Mail" className="input"
                        value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div className="element">
                        <input type="password" placeholder="Password" className="input"
                        value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>

                <div className="element">                       
                        <input type="text" placeholder="First name" className="input"
                        value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
                </div>

                <div className="element">                        
                        <input type="text" placeholder="last name" className="input"
                        value={lastname} onChange={(e)=> setLastname(e.target.value)} />
                </div>
                <div className="element">                       
                        <input type="number" placeholder="Age" className="input"
                        onBlur={(e)=> setAge(e.target.value)} />
                </div>

                <div className="element">
                        <label htmlFor="gender" className="label">Gender :</label>
                        <div className="gender">
                                <input className="input" type="radio" name='gender' value={gender} onClick={(e)=> setGender('Male')} />
                                <label className="label" htmlFor="gender">Male</label>
                        </div>
                        <div className="gender">
                                <input className="input" type="radio" name='gender' value={gender} onClick={(e)=> setGender('Female')} />
                                <label className="label" htmlFor="gender">Female</label>
                        </div>
                </div>

                <div className="element">                        
                        <label htmlFor="avatar" className="label">Profile image :</label>
                        <input type="file" className="input"
                        accept='image/*' onChange={(e)=> setAvatar(e.target.files[0])} />
                </div>
                
                <button type="submit" className="submit">Sign up</button>
            </form>
        </fieldset>


            <div className="login-link">
                <p>You have an account?</p> 
                <button >
                        <Link to= {'/login'}>Sign in</Link>
                </button>
            </div>

            {user.error && <h3 style={{color:'red'}} >{user.error}</h3>}
            {user.errors && <h3 style={{color:'red'}}>{user.errors.map(e=> <h4 key={e.param}>{e.msg}</h4>)}</h3>}
      </div>

    </div>
  )
}