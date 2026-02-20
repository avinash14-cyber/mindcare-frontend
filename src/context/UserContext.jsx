import React, { createContext, useEffect, useState } from 'react'


export const PatientContext=createContext(null)

const UserContext = ({children}) => {

  const [patient,setPatient]=useState(null)
  const [loading, setLoading] = useState(true);
 

  useEffect(()=>{
     const StoredPatient=sessionStorage.getItem("pat")
    if(StoredPatient){
      setPatient(JSON.parse(StoredPatient))
    }
    setLoading(false)
  },[])
  return (
    <PatientContext.Provider value={{patient,setPatient,loading}}>
      {children}
    </PatientContext.Provider>
  )
}

export default UserContext