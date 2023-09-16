import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import stations from '../gares.json'
import TrainStations from '../components/TrainStations'

function City() {
  const { city } = useParams()

  return (
    <div className="cit">
      <h2 className="city__name">{city}</h2>
      <TrainStations stations={stations[city]} />
      <Outlet />
    </div>
  )
}

export default City
