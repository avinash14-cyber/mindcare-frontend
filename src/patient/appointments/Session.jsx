import React from 'react'
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";

const Session = ({session,setSession}) => {
  return (
     <div>
               <h3 className='text-light text-center w-100 '>Session type</h3>
               <div className='d-flex flex-row w-100  mt-5   justify-content-around align-items-center '>
                <div onClick={()=>setSession("New Session")} className={`${session=="New Session"&&"bg-info"} d-flex flex-column justify-content-center border border-2 border-secondary py-3 px-5 rounded-3 align-items-center`} style={{cursor:'pointer'}}>
                  <h3 className={`${session=="New Session"?"text-dark":"text-light"} fw-medium`}>New Session</h3>
                  <GoPersonFill className={`${session=="New Session"&&"text-dark"} text-info`} style={{fontSize:'7.5rem'}} />
      
                </div>
    
    
                <div onClick={()=>setSession("Follow Up")} className={`d-flex ${session=="Follow Up"&&"bg-info"} flex-column justify-content-center border border-2 border-secondary py-3  rounded-3 align-items-center`} style={{cursor:'pointer',width:'250px'}}>
                  <h3 className={`${session=="Follow Up"?"text-dark":"text-light"} fw-medium`}>Follow Up</h3>
                  <FaMagnifyingGlassChart className={`${session=="Follow Up"&&"text-dark"} text-info`} style={{fontSize:'7.5rem'}}/>
    
      
                </div>
               </div>
            </div>
  )
}

export default Session



// onClick={()=>{setSession(1);setAppointment(prev=>({...prev,session:"New Session"}))}}

// onClick={()=>{setSession(2);setAppointment(prev=>({...prev,session:"Follow Up"}))}}