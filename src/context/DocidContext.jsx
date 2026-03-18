import React, { createContext, useEffect, useState } from 'react'


export const DocidVal = createContext(null)
const DocidContext = ({ children }) => {

    const [docid, setDocid] = useState(null)

     useEffect(() => {
        const storedDocid = sessionStorage.getItem("docid")
        if (storedDocid) {
            setDocid(storedDocid)
        }
     }, [])

  return (
    < DocidVal.Provider value={{ docid }} >
        {children}
    </DocidVal.Provider>
  )
}

export default DocidContext