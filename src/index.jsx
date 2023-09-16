import React from 'react'
import createRoot from 'react-dom'
import App from './App'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'

createRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
