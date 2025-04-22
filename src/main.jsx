import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "../src/style/AuthStyle.css"
import './style/AuthStyle.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
  
  </StrictMode>,
)
