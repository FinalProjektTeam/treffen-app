import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './new-event.scss'
import logo from '../../images/Logo.png'


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
    <div className='NewEvent'>
        <h1>Create new event</h1>

        <section>

            <form onSubmit={handleNewEvent}>
                <select
                    defaultValue='Allgemein'
                    onChange={handleCategory}
                    >    
                    <option value="Allgemein">Allgemein</option>
                    <option value="Erwachsene">Erwachsene</option>
                    <option value="Kinder">Kinder</option>
                </select>

                <input type="text" placeholder='Title' onBlur={e=>setTitle(e.target.value)} />
                <input type="text" placeholder='Adresse' onBlur={e=>setAdresse(e.target.value)} />
                <input type="date" placeholder='Datum' onBlur={e=>setDatum(e.target.value)} />
                {/* <input type="file" accept='image/*' placeholder='Bild' onChange={(e)=> setEventBild(e.target.files[0])} /> */}
                <input type="file" accept='image/*' onChange={(e)=> setEventBild(e.target.files[0])} />
                <input type="text" placeholder='write a description' onBlur={e=> setDescription(e.target.value)} />

                <button type="submit">Create</button>
            </form>

            <div className="event-info">
                <p className=''>Preview</p>

                {category ? <p className=''>🔹 Category : {category}</p> : <p className=''></p>}

                {title ? <p className=''>{title}</p> : <p className=''>🔸 Title of Event</p>}

                {adresse ? <p className=''>{adresse}</p> : <p className=''>🔹 Address of Event</p>}

                {datum ? <p className=''>{datum}</p> : <p className=''>🔸 Date of Event</p>}

                {description ? <div className=''>{description}</div> : <p className=''>🔹 Description</p> }

                <img src={logo} className='' alt="Event-Bg"></img>
            </div>

    </section>

        {error && <h1 style={{color: 'red'}} >{error}</h1>}
        {errors && <div style={{color: 'red'}} >{errors}</div>}


    </div>
  )
}
