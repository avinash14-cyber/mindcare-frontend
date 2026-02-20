import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'


export const DoctorContext=createContext(null)
const DocContext = ({children}) => {

    const[doc,setDoc]=useState(null)
    const[loading,setLoading]=useState(true)

    useEffect(()=>{

        const storedDoc=sessionStorage.getItem("DOC")
        if(storedDoc){
            setDoc(JSON.parse(storedDoc))
        }
setLoading(false)
    },[])
  return (
    <DoctorContext.Provider value={{doc,setDoc,loading}}>
        {children}
    </DoctorContext.Provider>
  )
}

export default DocContext