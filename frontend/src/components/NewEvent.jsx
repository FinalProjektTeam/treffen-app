import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>NewEvent

    <form onSubmit={handleNewEvent}>
        <select
            defaultValue='Allgemein'
            onChange={handleCategory}
        >    
            <option value="Allgemein">Allgemein</option>
            <option value="Erwachsene">Erwachsene</option>
            <option value="Kinder">Kinder</option>
        </select>
        <br />

        <input type="text" placeholder='Title' onBlur={e=>setTitle(e.target.value)} />
        <br />
        <input type="text" placeholder='Adresse' onBlur={e=>setAdresse(e.target.value)} />
        <br />
        <input type="date" placeholder='Datum' onBlur={e=>setDatum(e.target.value)} />
        <br />
        <label htmlFor="avatar" className="m-2 form-label"><b>Event Photo : </b></label>
        <input type="file" className="m-2 form-control w-50"
                        accept='image/*' onChange={(e)=> setEventBild(e.target.files[0])} />
        <br />
        <input type="text" placeholder='write a description' onBlur={e=> setDescription(e.target.value)} />

        <br />
        <br />

        <button className='btn btn-outline-danger' type="submit">Create Event</button>
    </form>


    <h2>{title+'\n'+adresse+'\n'+ datum} </h2>


    <h3>Category: {category}</h3>


        {error && <h1 style={{color: 'red'}} >{error}</h1>}
        {errors && <h1 style={{color: 'red'}} >{errors}</h1>}

    </div>
  )
}
