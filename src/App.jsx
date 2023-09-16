import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './page/Home'
import City from './page/City'
import TrainStation from './components/TrainStation'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":city" element={<City />}>
          <Route path=":codeStation" element={<TrainStation />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
