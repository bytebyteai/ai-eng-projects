import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // This line is crucial!
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)