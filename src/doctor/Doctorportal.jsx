import React from 'react'
import DoctorSidebar from './DoctorSidebar'
import { MdOutlineWavingHand } from 'react-icons/md'
import { PiSirenFill } from 'react-icons/pi'
import { LuNotepadText } from 'react-icons/lu'
import { ImArrowUpRight } from "react-icons/im";
import { IoMdPeople } from 'react-icons/io'
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { BsGraphUp } from 'react-icons/bs'
import { faSquareCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { DoctorContext } from '../context/DocContext'
import { useEffect } from 'react'
import { getRiskPatientsApi } from '../services/allApi'
import { useState } from 'react'
import img from '../assets/no_appointment.png'
import dayjs from "dayjs"
const Doctorportal = () => {

  const[patlist,setPatList]=useState([])

  const{doc}=useContext(DoctorContext)

  const handlePatientList=async()=>{
    const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      }  
      const result=await getRiskPatientsApi(reqHeader)
      setPatList(result?.data)
      console.log(result);
      
  }

  const todayAppointments = patlist?.filter(items =>
  dayjs(items?.date).isSame(dayjs(), "day")
)
  

  useEffect(()=>{
    handlePatientList()
  },[])
  return (
    <div className='w-100 min-vh-100'>
       <div className='row w-100'>
         <DoctorSidebar/>
         <div className='col-9 min-vh-100' style={{backgroundColor:'rgb(31, 33, 33)'}}>
           
            <div className='d-flex flex justify-content-between w-100 flex-row p-3'>
               <div className='d-flex  flex-column '>
                <h2 className='' style={{color:'rgb(50 184 198)'}}>{`Good Morning,${doc.name}`} <MdOutlineWavingHand />
</h2>
                <p className=''style={{color:'rgb(167 169 169 / 70%)'}}>Here's your practice overview for today</p>
               </div>

               <div className='d-flex flex-md-row flex-column align-items-center'>
                 
                 <button type="button"  class="btn ms-3 h-50 btn-danger"><PiSirenFill className='fs-4 text-warning me-1' />Crisis Alert </button>
               </div>
            </div>
           
           <div className='row w-100 d-flex justify-content-evenly'>
            <div className="col-2 d-flex flex-column rounded rounded-2 overflow-hidden p-2 doctordash position-relative" style={{backgroundColor:'rgb(38 40 40)'}}>
                <div className='d-flex flex-row justify-content-between'>
                    <LuNotepadText className='text-light fs-4' />
                    <p className='text-info fw-medium'><ImArrowUpRight className='text-primary fs-4' />+2</p>
                </div>
                <div className='mt-2'>
                  <p className='w-100 text-center fw-medium text-info fs-4'>6</p>
                  <p className='text-center mb-0'style={{color:'rgb(167 169 169 / 70%)'}}>Today's Appointments</p>
                  <p className='text-center mt-0'style={{color:'rgb(167 169 169 / 70%)'}}>Next: Sarah Johnson at 10:00 AM</p>

                </div>
            </div>


               <div className="col-2 d-flex flex-column p-2 doctordash rounded rounded-2 overflow-hidden position-relative" style={{backgroundColor:'rgb(38 40 40)'}}>
                <div className='d-flex flex-row justify-content-between'>
                    <IoMdPeople className='text-light fs-4' />
                    <p className='text-info fw-medium'><FaArrowAltCircleRight  className='text-primary fs-4' />+2</p>
                </div> 

                <div className='mt-2'>
                  <p className='w-100 text-center fw-medium text-info fs-4'>45</p>
                  <p className='text-center mb-0'style={{color:'rgb(167 169 169 / 70%)'}}>Total Patients</p>
                  <p className='text-center mt-0'style={{color:'rgb(167 169 169 / 70%)'}}>2 Needs Attention</p>

                </div>
            </div>

              <div className="col-2 d-flex flex-column p-2 doctordash rounded rounded-2 overflow-hidden position-relative" style={{backgroundColor:'rgb(38 40 40)'}}>
                <div className='d-flex flex-row justify-content-between'>
                 <p className='text-info fw-medium'><FaStar className='text-warning fs-4' /></p>
             <p className='text-info fw-medium'><ImArrowUpRight className='text-primary fs-4' />+0.1</p>

                </div>
                <div className='mt-2'>
                  <p className='w-100 text-center fw-medium text-info fs-4'>4.9</p>
                  <p className='text-center mb-0'style={{color:'rgb(167 169 169 / 70%)'}}>Patient Rating</p>
                  <p className='text-center mt-0'style={{color:'rgb(167 169 169 / 70%)'}}>96% Satisfaction</p>

                </div>
            </div>


           
              <div className="col-2 d-flex flex-column p-2 doctordash rounded rounded-2 overflow-hidden position-relative" style={{backgroundColor:'rgb(38 40 40)'}}>
                <div className='d-flex flex-row justify-content-between'>
                    <BsGraphUp className='fs-4 text-warning' />

                    <p className='text-info fw-medium'><ImArrowUpRight className='text-primary fs-4' />+8%</p>
                </div>
                <div className='mt-2'>
                  <p className='w-100 text-center fw-medium text-info fs-4'>78%</p>
                  <p className='text-center mb-0'style={{color:'rgb(167 169 169 / 70%)'}}>Avg Improvement</p>
                  <p className='text-center mt-0'style={{color:'rgb(167 169 169 / 70%)'}}>Last 30 days</p>

                </div>
            </div>
           
           </div>

           <div className='w-100 mt-4 d-flex justify-content-evenly row'>
               <div className='col-4 'style={{height:'300px',background:'linear-gradient(135deg,rgb(185 28 28 / 15%),rgb(8 145 178 / 15%))'}}>
                <h3 className='text-light fw-medium'>Priority Patients</h3>
                {patlist?.filter(items=>items.wellness<50)?.map(pat=>(
                    <div key={pat.patientId._id} className='d-flex mt-2 position-relative overflow-hidden risks gap-1 justify-content-around rounded rounded-2 container flex-row'style={{backgroundColor:'rgb(255 84 89 / 5%)'}}>
                  <div className='py-3 px-1 text-light border border-2 border-danger'>
                   MB
                  </div>
                  <div className='d-flex flex-column'>
                    <p className='text-light mb-0 fw-medium fs-4'>{pat.patientId.name}</p>
                    <p className='text-danger mt-1 mb-1'>High Risk</p>
                    <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>Last checked in 3d ago</p>
                  </div>
                  <div className='d-flex h-100  gap-2 flex-column'>
                    <button type="button" class="btn btn-danger mt-2">Contact Now</button>
                    <button type="button" class="btn btn-light">View Profile</button>
                  </div>
                </div>
                ))}
                

               
               </div>

               <div className='col-4' style={{height:'300px',background:'linear-gradient(135deg,rgb(29 78 216 / 15%),rgb(107 33 168 / 15%))'}}>
                <h3 className='text-light fw-medium'>Today's Schedule</h3>
                
                 {todayAppointments?.length > 0 ? (
  todayAppointments.map(val => (
    <div
      key={val.patientId._id}
      className='container justify-content-around rounded p-2 dashschedule overflow-hidden position-relative rounded-2 d-flex flex-column'
      style={{ backgroundColor: 'rgb(29 78 216 / 15%)' }}
    >
      <div className='w-100 d-flex align-items-center flex-row justify-content-between'>
        <p className='text-info fw-medium'>
          {dayjs(val?.date).hour(val?.hour).minute(val?.minute).format("h:mm A")}
        </p>

        <p className='text-light fs-4 fw-medium mb-1'>
          {val?.patientId?.name}
        </p>
      </div>

      <div className='d-flex justify-content-around flex-row'>
        <p
          className='py-1 px-2 text-light rounded mt-0 mb-1 rounded-2'
          style={{ backgroundColor: 'rgb(180 83 9 / 15%)' }}
        >
          Council <br />{val.session}
        </p>

        <p
          style={{ backgroundColor: 'rgb(21 128 61 / 15%)' }}
          className='py-1 mt-0 px-2 text-light'
        >
          <FontAwesomeIcon className='text-success' icon={faSquareCheck} />
          Prep <br />Complete
        </p>
      </div>
    </div>
  ))
) : (
  <div className='w-100 text-center'>
    <img src={img} className='img-fluid ' style={{height:'300px',scale:'1.2'}} alt="No appointments today"  />
    
  </div>
)}
                
                
                
                

                {/* <div className='container mt-2 justify-content-around rounded p-2 dashschedule overflow-hidden position-relative rounded-2 d-flex flex-row'style={{backgroundColor:'rgb(38 40 40)'}}>
                  <p className='text-info fw-medium'>2:00 PM</p>
                  <div className='d-flex flex-column'>
                   <p className='text-light fw-medium mb-1'>Michael  <br />Brown</p>
                   <p className='py-1 px-2 text-light rounded mt-0 mb-1 rounded-2' style={{backgroundColor:'rgb(180 83 9 / 15%)'}}>Anxiety<br />Management</p>
                   <p style={{backgroundColor:'rgb(21 128 61 / 15%)'}} className='py-1 mt-0 px-2 text-light'><FontAwesomeIcon icon={faTriangleExclamation} className='text-warning' />Review <br />Crisis notes</p>
                  </div>
                  <button type="button" class="btn h-50 btn-outline-secondary">Prepare</button>
                </div> */}
               </div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default Doctorportal