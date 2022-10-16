
import React from 'react'
import {Link} from 'react-router-dom'
import bild1 from '../images/meet-up-1.jpg'
import bild2 from '../images/meet-up-2.jpg'
import bild3 from '../images/meet-up-3.jpg'
import bild4 from '../images/meet-up-4.jpg'


export default function Home() {
  return (
    <div>
      <div className='home-bg-img-div'>
          <div className='home-explore-events-div'>
          <Link to= {'/events-list'}><h1>Explore Events</h1></Link>
          </div>
      </div>

      <h2 className='my-5 text-danger text-opacity-75'>Vier gute Gründe, Bei uns Mitglied zu werden</h2>

      <section className='my-3 container d-flex justify-content-around'>

        <div className='card m-2'>
          <img src={bild1} className='card-img-top' alt="card-img" />
          <div className='card-body'>
            <h4 className='card-title text-primary text-opacity-75'>Gruppentreffen</h4>
            <p className='card-text'>Lerne neue Leute bei gemeinsamen Freizeitaktivitäten kennen.</p>
          </div>
        </div>

        <div className='card m-2'>
        <img src={bild2} className='card-img-top' alt="card-img" />
          <div className='card-body'>
            <h4 className='card-title text-primary text-opacity-75'>Kostenlos</h4>
            <p className='card-text'>Alles rund um die Gruppentreffen ist kostenlos.</p>
          </div>
        </div>

        <div className='card m-2'>
          <img src={bild3} className='card-img-top ' alt="card-img" />
          <div className='card-body'>
            <h4 className='card-title text-primary text-opacity-75'>Unkompliziert</h4>
            <p className='card-text'>Kein virtueller Smalltalk, sondern direkte Treffen mit Leuten aus der Umgebung: Entspannt, einfach und sicher.</p>
          </div>
        </div>

        <div className='card m-2'>
          <img src={bild4} className='card-img-top' alt="card-img" />
          <div className='card-body'>
            <h4 className='card-title text-primary text-opacity-75'>Vielfalt</h4>
            <p className='card-text'>Wandern, Essen gehen, Bowling, Museums-besuche und vieles mehr.</p>
          </div>
        </div>
      </section>
      <p className="m-3 fs-4 text-success">haben Sie noch kein Account ? <br/>
            <button className='btn btn-outline-info m-3'><Link to= {'/register'}>zum Registration</Link></button></p>

      <footer className='border bg-primary bg-opacity-25 p-3'>
        <p className='text-secondary'>Kontact uns :</p>
            <a className='m-2' href="https://facebook.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/4494/4494475.png' alt="logo" style={{width:'50px',height:'50px'}} /></a>
      
            <a className='m-2' href="https://twitter.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/4494/4494477.png' alt="logo" style={{width:'50px',height:'50px'}} /></a>
      
            <a className='m-2' href="https://instagram.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/2111/2111463.png' alt="logo" style={{width:'50px',height:'50px'}} /></a>
      
            <a className='m-2' href="https://linkedin.com" target="_blank">
            <img src='https://cdn-icons-png.flaticon.com/512/3536/3536505.png' alt="logo" style={{width:'50px',height:'50px'}} /></a>
      </footer>
      
    </div>
  )
}

