import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../context/DocContext'
import { Navigate } from 'react-router-dom'

const DocLoginRoute = ({children}) => {

    const{doc,loading}=useContext(DoctorContext)
         
            if(loading){
                return null
            }
            if(doc){
                return <Navigate to="/doctorportal" replace />
            } 
          else{
            return children
          }
        
         

    
}

export default DocLoginRoute