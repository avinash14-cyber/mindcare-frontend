import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter } from 'react-router-dom'
import PatientContext  from './context/UserContext.jsx'
import DocContext from './context/DocContext.jsx'
import DocidContext from './context/DocidContext.jsx'


createRoot(document.getElementById('root')).render(
  
   <BrowserRouter>
  <DocidContext> <PatientContext> <DocContext><App /></DocContext></PatientContext></DocidContext>
    </BrowserRouter>
  
)
