import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { DoctorContext } from '../context/DocContext'

const DocProtected = ({ children }) => {
  const { doc, loading } = useContext(DoctorContext)

  if (loading) {
    return null 
  }

  if (!doc) {
    return <Navigate to="/" replace />
  }

  return children
}

export default DocProtected
