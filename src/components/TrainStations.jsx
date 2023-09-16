import propTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

function TrainStations({ stations }) {
  return (
    <div className="train-stations">
      {Object.keys(stations).map((stationName) => (
        <NavLink
          className={({ isActive }) =>
            `train-stations__link ${
              isActive ? 'train-stations__link--active' : ''
            }`
          }
          key={stationName}
          to={`${stations[stationName]}`}
        >
          <span>{stationName}</span>
        </NavLink>
      ))}
      <NavLink
        className={({ isActive }) =>
          `retour__link ${isActive ? 'retour__link--active' : ''}`
        }
        to="http://localhost:3000"
      >
        <span>Retour menu Pricipale</span>
      </NavLink>
    </div>
  )
}

TrainStations.propTypes = {
  stations: propTypes.string.isRequired,
}

export default TrainStations
