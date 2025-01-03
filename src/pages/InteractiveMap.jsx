import React from 'react'
import Map from '../components/Map';

export default function InteractiveMap() {
    const regionsData = [
        {
          name: "Delhi",
          coordinates: [28.6139, 77.209],
          description: "Capital region of India. High voter turnout expected.",
          votesToday: 12034,
        },
        {
          name: "Mumbai",
          coordinates: [19.076, 72.8777],
          description: "Financial hub with a diverse voter base.",
          votesToday: 10291,
        },
        {
          name: "Chennai",
          coordinates: [13.0827, 80.2707],
          description: "Southern metropolitan region with active voting.",
          votesToday: 8532,
        },
        {
          name: "Kolkata",
          coordinates: [22.5726, 88.3639],
          description: "Cultural capital of India, seeing moderate activity.",
          votesToday: 7653,
        },
    ];
  return (
    <div>
        <Map regions={regionsData}/>
    </div>
  )
}
