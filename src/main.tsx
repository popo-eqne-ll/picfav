import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.tsx'

const GA_TRACKING_ID = 'G-N6TF76CNDZ'
if (GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
