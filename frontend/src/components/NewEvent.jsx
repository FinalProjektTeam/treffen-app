import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/Logo.png'

export default function NewEvent() {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [adresse, setAdresse] = useState('')
    const [datum, setDatum] = useState('')
    const [description,setDescription] = useState('')
    const [category, setCategory] = useState('Allgemein')
    const [eventBild , setEventBild] = useState('')

    const [event, setEvent] = useState(null)
    const [error, setError] = useState('')
    const [errors, setErrors] = useState([])

    
    function handleCategory(e) {
        e.preventDefault()
        setCategory(e.target.value);
        console.log(category)
    }

    const handleNewEvent = async(e)=>{
        e.preventDefault()
        setError('')
        const formData = new FormData()
        formData.append("title", title)
        formData.append("adresse", adresse)
        formData.append("category", category)
        formData.append("datum", datum)
        formData.append("description", description)
        formData.append("eventBild", eventBild)
       

        const res = await fetch('http://localhost:4000/events',{
            method: 'POST',
            credentials: 'include',
            
            body:formData 
        })
        const data = await res.json()
        console.log('DATA => ',data);
        if(res.ok){
            setEvent(data)
            navigate('/events-list/'+data._id)
        }
        else if(data.error){
            setError(data.error)
        }
        else if(data.errors){
            setErrors(data.errors.map(e=><h2>{e.msg}</h2>))
        }

    }
  

  return (
    <div >
         <p className='my-3 text-danger text-opacity-75 fs-2'>Create new Event</p>
        <section className='d-flex justify-content-evenly p-3'>
        <div className='bg-light border p-2 w-50 m-2'>
            <form className='m-auto' onSubmit={handleNewEvent}>
                <label className="m-2 form-label"><b>Category : </b></label>
                <select className='form-select my-2 m-auto w-75 text-primary fs-5'
                defaultValue='Allgemein' onChange={handleCategory}>    
                    <option value="Allgemein">Allgemein</option>
                    <option value="Erwachsene">Erwachsene</option>
                    <option value="Kinder">Kinder</option>
                </select>
                <br />

                <input type="text" className="my-2 m-auto form-control w-75 fs-5 text-danger" placeholder='Title' onBlur={e=>setTitle(e.target.value)} />
                <br />
                <input type="text" className="my-2 m-auto text-secondary form-control w-75 fs-5" placeholder='Adresse' onBlur={e=>setAdresse(e.target.value)} />
                <br />
                <input type="date" className="my-2 m-auto form-control w-75 fs-5 text-success" placeholder='Datum' onBlur={e=>setDatum(e.target.value)} />
                <br />
                <input type="text" className="my-2 m-auto text-secondary form-control w-75 fs-5" placeholder='write a description' onBlur={e=> setDescription(e.target.value)} />

                <label htmlFor="avatar" className="m-2 form-label"><b>Event Photo : </b></label>
                <input type="file" className="m-2 m-auto form-control w-75"
                                accept='image/*' onChange={(e)=> setEventBild(e.target.files[0])} />
                
                <button className='btn btn-outline-danger my-4' type="submit">Create Event</button>
            </form>


        
        </div>
        <div className='border p-3 w-50 m-2'>
            <p className='my-3 text-warning fs-2 border w-75 m-auto bg-light'>preview</p>

            {category ? <p className='my-3 text-primary text-opacity-75 fs-3'>🔹 Category : {category}</p> : <p className='my-3 text-secondary text-opacity-25 fs-3'></p>}

            {title ? <p className='my-3 text-danger text-opacity-75 fs-3'>{title}</p> : <p className='my-3 text-secondary text-opacity-25 fs-3'>🔸 Title of Event</p>}

            {adresse ? <p className='my-3 text-dark text-opacity-50 fs-3'>{adresse}</p> : <p className='my-3 text-secondary text-opacity-25 fs-3'>🔹 Address of Event</p>}

            {datum ? <p className='my-3 text-success text-opacity-75 fs-3'>{datum}</p> : <p className='my-3 text-secondary text-opacity-25 fs-3'>🔸 Date of Event</p>}

            {description ? <div className='border p-2 m-auto my-3 text-secondary w-75 bg-light'>{description}</div> : <p className='my-3 text-secondary text-opacity-25 fs-3'>🔹 Description</p> }

            
            <img src={logo} className='h-50 w-50' alt="Event-Bg"></img>

                     
            {error && <h1 style={{color: 'red'}} >{error}</h1>}
            {errors && <h1 style={{color: 'red'}} >{errors}</h1>}

        </div>
        </section>
    </div>
  )
}
