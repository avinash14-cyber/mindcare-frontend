import React, { useContext } from 'react'
import { PatientContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const LoginRoute = ({children}) => {
  
    const {patient,loading}=useContext(PatientContext)
    if(loading) return null

    return patient?<Navigate to={'/patient'} replace></Navigate>:children
}

export default LoginRoute