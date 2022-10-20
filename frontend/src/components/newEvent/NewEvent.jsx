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
        {/* <input type="file" accept='image/*' placeholder='Bild' onChange={(e)=> setEventBild(e.target.files[0])} /> */}
        <input type="file" accept='image/*' onChange={(e)=> setEventBild(e.target.files[0])} />
        <br />
        <input type="text" placeholder='write a description' onBlur={e=> setDescription(e.target.value)} />

        <br />


        <br />
{/* 
        <label for="birthdaytime">Birthday (date and time):</label>
        <input type="datetime-local" id="birthdaytime" name="birthdaytime"/> */}

        <button type="submit">Create Event</button>
    </form>


    <h1>{title+' '+adresse+' '+ datum} </h1>


    <h2>Category: {category}</h2>


        {error && <h1 style={{color: 'red'}} >{error}</h1>}
        {errors && <div style={{color: 'red'}} >{errors}</div>}

    </div>
  )
}
