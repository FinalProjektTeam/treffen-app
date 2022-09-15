import '../Layout/components.css';
import React , {useState , useEffect , useContext} from "react";
import {Link} from 'react-router-dom'
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

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
        
        if(data._id){
          navigate('/user/'+data._id)
          console.log('submit klappt');
        }
      }

  return (
    <div className="regist-bg-img-div">
      <div className="login-form">
          <h2>Registration</h2>
              <form onSubmit={handleSubmit} className="container">

                <label htmlFor="email" className="m-2 form-label "><b>Email </b></label>
                <input type="email" placeholder="Your Email" className="m-2 form-control w-75"
                        value={email} onChange={(e)=> setEmail(e.target.value)} />

                <label htmlFor="password" className="m-2 form-label"><b>Password </b></label>
                <input type="password" placeholder="Password" className="m-2 form-control w-75"
                        value={password} onChange={(e)=> setPassword(e.target.value)} />

                <label htmlFor="firstname" className="m-2 form-label"><b>Vorname : </b></label>
                <input type="text" placeholder="Firstname" className="m-2 form-control w-75"
                        value={firstname} onChange={(e)=> setFirstname(e.target.value)} />

                <label htmlFor="lastname" className="m-2 form-label"><b>Nachname : </b></label>
                <input type="text" placeholder="lastname" className="m-2 form-control w-75"
                        value={lastname} onChange={(e)=> setLastname(e.target.value)} />


                <label htmlFor="gender" className="m-2 form-label"><b>Geschlicht : </b></label>
                <input className=" m-2 form-check-input" type="radio" name='gender'
                        value={gender} onClick={(e)=> setGender('Male')} />
                        <label className="form-check-label" htmlFor="gender">Male</label>

                <input className="m-2 form-check-input" type="radio" name='gender'
                        value={gender} onClick={(e)=> setGender('Female')} />
                        <label className="form-check-label" htmlFor="gender">Female</label><br/>


                <label htmlFor="age" className="m-2 form-label"><b>Alter : </b></label>
                <input type="number" placeholder="Age" className="m-2 form-control w-75"
                        onBlur={(e)=> setAge(e.target.value)} />

                <label htmlFor="avatar" className="m-2 form-label"><b>Profilebild : </b></label>
                <input type="file" className="m-2 form-control w-75"
                        value={avatar} onChange={(e)=> setAvatar(e.target.value)} />
            
                <input type="submit" className="m-2 btn btn-warning"/>
            </form>
            <p className="m-3">haben Sie shoch ein Account ? <br/>
            <button className='btn btn-outline-dark m-3'><Link to= {'/login'}>zum Login</Link></button></p>

            {user.error && <h3>{user.error}</h3>}
      </div>

    </div>
  )
}