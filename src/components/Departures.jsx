import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { parseUTCDate, getFullMinutes, calculateDelay } from './Utils'
import Stops from './Stops'

function Departures() {
  const { codeStation } = useParams()

  const [nextDepartures, setNextDepartures] = useState([])

  useEffect(async () => {
    const response = await axios.get(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/${codeStation}/departures`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_API_KEY}`,
        },
      },
    )
    const nextDeparturesApi = response.data.departures.map((departure) => ({
      id: departure.links[1].id,
      operator: '',
      transportationMode: departure.display_informations.network,
      trainNumber: departure.display_informations.headsign,
      baseDepartureTime: parseUTCDate(
        departure.stop_date_time.base_departure_date_time,
      ),
      realDepartureTime: parseUTCDate(
        departure.stop_date_time.departure_date_time,
      ),
      destination: departure.display_informations.direction.split(' (')[0],
    }))

    setNextDepartures(nextDeparturesApi)
  }, [codeStation])

  const [isTimeDisplayed, setIsTimeDisplayed] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTimeDisplayed((prevIsTimeDisplayed) => !prevIsTimeDisplayed)
    }, 1500)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div className="departures">
      {nextDepartures.map((departure, index) => (
        <div
          key={departure.id}
          className={`departure ${index % 2 ? '' : 'departure--light'}`}
        >
          <p className="departure__operator">{departure.operator}</p>
          <p
            className={`departure__train-type ${
              isTimeDisplayed ? '' : 'departure__train-type--disappear'
            }`}
          >
            {departure.transportationMode}
          </p>
          <p
            className={`departure__train-number ${
              isTimeDisplayed ? '' : 'departure__train-number--disappear'
            }`}
          >
            {departure.trainNumber}
          </p>
          <p className="departure__time">
            {departure.baseDepartureTime.getHours()}h
            {getFullMinutes(departure.baseDepartureTime)}
          </p>
          <p
            className={`departure__train-number-deux ${
              isTimeDisplayed ? 'departure__train-number-deux--disappear' : ''
            } ${
              calculateDelay(
                departure.baseDepartureTime,
                departure.realDepartureTime,
              ).includes("à l'heure")
                ? ''
                : 'departure__train-number-deux--yellow'
            }`}
          >
            {calculateDelay(
              departure.baseDepartureTime,
              departure.realDepartureTime,
            )}
          </p>
          <p className="departure__destination">{departure.destination}</p>
          <Stops idDeparture={departure.id} />
        </div>
      ))}
    </div>
  )
}

export default Departures
