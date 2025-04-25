import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './japan-one.tsx'
// import App from './japan-two.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
