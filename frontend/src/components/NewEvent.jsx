import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewEvent() {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [adresse, setAdresse] = useState('')
    const [datum, setDatum] = useState('')
    const [description,setDescription] = useState('')
    const [category, setCategory] = useState('Allgemein')

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

        const res = await fetch('http://localhost:4000/events',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                adresse: adresse,
                datum: datum,
                category: category,
                description: description
            })
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
        <input type="text" placeholder='Datum' onBlur={e=>setDatum(e.target.value)} />
        <br />
        {/* <input type="file" placeholder='Bild' onClick={''} /> */}
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
        {errors && <h1 style={{color: 'red'}} >{errors}</h1>}

    </div>
  )
}
