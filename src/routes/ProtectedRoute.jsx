import React, { useContext } from 'react'
import { PatientContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const {patient,loading}=useContext(PatientContext)
  
    if (loading) return null; 
    return patient?children:<Navigate to='/patientauth' replace/> 
}

export default ProtectedRoute