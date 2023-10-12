import React, { useState } from 'react'
import CityCard from './CityCard'
import stations from '../gares.json'

function CityCards() {
  const cities = Object.keys(stations)
  const [searchText, setSearchText] = useState('')

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchText.toLowerCase()),
  )

  const handleSearch = (text) => {
    setSearchText(text)
  }

  return (
    <div className="city-cards">
      <div className="city-search-container">
        <input
          type="text"
          placeholder="Rechercher une ville"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="city-search-input"
          aria-autocomplete="list"
        />
        <input
          type="submit"
          className="vsc-universal-search__submit vsc-universal-search__submit--inside"
        />
      </div>
      {filteredCities.map((city) => (
        <CityCard key={city} city={city} />
      ))}
    </div>
  )
}

export default CityCards
