import React, { useState } from 'react'
import Departures from './Departures'
import Arrivals from './Arrivals'

function TrainStation() {
  const [departureMode, setDepartureMode] = useState(true)
  const [arrivalsMode, setArrivalsMode] = useState(false)
  return (
    <div className="train-station">
      <div className="directions">
        <button
          type="button"
          className={`directions__departures ${
            departureMode ? 'directions__departures--active' : ''
          }`}
          onClick={() => {
            setArrivalsMode(true)
          }}
        >
          Départs
        </button>
        <button
          type="button"
          className={`directions__arrivals ${
            arrivalsMode ? 'directions__arrivals--active' : ''
          }`}
          onClick={() => {
            setDepartureMode(false)
          }}
        >
          Arrivées
        </button>
      </div>

      {departureMode && <Departures />}
      {arrivalsMode && <Arrivals />}
    </div>
  )
}

export default TrainStation
