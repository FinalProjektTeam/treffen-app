import React from 'react'
import fire from '../../videos/fire-double.mp4'
export default function Fire() {
  return (
    <div>Fire
        <section>
            <video src={fire} autoPlay muted style={{width:'100vw'}} ></video>
        </section>
    </div>
  )
}
