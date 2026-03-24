import React, { useContext, useEffect, useState } from 'react'
import PatientSidebar from './PatientSidebar'
import { MdMessage } from "react-icons/md";
import {socket} from '../socket/socket'
import { PatientContext } from '../context/UserContext';
import { endSessionApi, getChatHistoryApi, getTimeSlotApi } from '../services/allApi';
import next_appo from '../assets/next_appointment.png'
import { FaRegClock } from "react-icons/fa";
import { ToastContainer,toast } from 'react-toastify'
import dayjs from "dayjs";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PatientMessage = () => {

   const{patient}=useContext(PatientContext)
const docid = sessionStorage.getItem("docid")
   const [messages, setMessages] = useState([])
   const[appointment,setAppointment]=useState({})
   const[chatapprove,setChatApprove]=useState(false)
   const [timeLeft, setTimeLeft] = useState("")
   const[loading,setLoading]=useState(true)
   const [isOnline, setIsOnline] = useState(false)
const [text, setText] = useState("")



const chatId = `${docid}_${patient?.id}`

useEffect(() => {

  socket.emit("join_chat", chatId)

}, [chatId])

useEffect(() => {
  if (patient?.id) {
    socket.emit("user_online", patient?.id)
  }
}, [patient])

useEffect(() => {
  const handler = ({ userId, status }) => {
    if (userId === docid) {
      setIsOnline(status === "online")
    }
  }

  socket.on("user_status", handler)

  return () => socket.off("user_status", handler)
}, [docid])

useEffect(() => {

  socket.on("receive_message", (data) => {
    setMessages(prev => [...prev, data])
  })

  return () => {
    socket.off("receive_message")
  }

}, [])

useEffect(() => {

  const fetchMessages = async () => {
    try {
      const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  
      const res = await getChatHistoryApi(chatId, reqHeader)
      setMessages(res?.data)
    } catch (err) {
      console.error(err)
    }
  }

  if (chatId) {
    fetchMessages()
  }

}, [chatId])

useEffect(() => {
  if (docid) {
    socket.emit("check_online", docid)
  }
}, [docid])

useEffect(() => {
  const handleSessionEnd = () => {
    
    setChatApprove(false)  
    setMessages([])         
    toast.info("Doctor has ended the session")
    fetchTime()
  }

  socket.on("session_ended", handleSessionEnd)

  return () => socket.off("session_ended", handleSessionEnd)
}, [])

const sendMessage = () => {

  if (!text.trim()) return

  const messageData = {
    chatId: chatId,
    senderID: patient?.id,
    receiversID: docid,
    text: text,
    
  }

  socket.emit("send_message", messageData)

 

  setText("")
}


const fetchTime=async()=>{  

  try {
     const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  

      const result=await getTimeSlotApi(reqHeader)
      setAppointment(result?.data)
     
      if(!result?.data){
        setChatApprove(false)
      }
  } catch (error) {
    
  }

      
}

// const handleEndSession = async () => {
//   try {

//     const tok=sessionStorage.getItem("Token")
//    const reqHeader={
//         "Authorization":`Bearer ${tok}`
//       }  
    
//     await endSessionApi(reqHeader)

//     setChatApprove(false)

    
//     socket.emit("leaveRoom", chatId)

    
//     fetchTime()
    

//   } catch (err) {
//     console.log(err)
//   }
// }

useEffect(() => {
  if (!appointment){
    setLoading(false)
    return
  } 

  const interval = setInterval(() => {
    const now = dayjs()

    const appointmentTime = dayjs(appointment?.date)
      .hour(Number(appointment?.hour))
      .minute(Number(appointment?.minute))

    const start = appointmentTime.subtract(5, "minute")
    const end = appointmentTime.add(30, "hour")

    const canChat = now.isBetween(start, end, null, "[)")
    setLoading(false)
    if (canChat) {
      setChatApprove(true)
      
      clearInterval(interval) 
    }
  }, 1000)

  return () => clearInterval(interval)
}, [appointment])



const start=dayjs(appointment?.date)
      .hour(Number(appointment?.hour))
      .minute(Number(appointment?.minute))
 
      const end = start.add(1, "hour")

  useEffect(() => {
  if (!appointment) return

  const interval = setInterval(() => {
    const now = dayjs()

    const diff = end.diff(now) 

    if (diff <= 0) {
      clearInterval(interval)
      setTimeLeft("00:00")
      handleEndSession()
      return
    }

    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    setTimeLeft(
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    )
  }, 1000)

  return () => clearInterval(interval)
}, [appointment])    

useEffect(() => {
  fetchTime()
},[isOnline])

  return (
    <div className=' min-vh-100'>
        <div className='row m-0'>
         <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <PatientSidebar/>
                </div>
            
          <div className='col-md-9 min-vh-100 col-12'style={{backgroundColor:'rgb(31, 33, 33)'}}>
           {/* heading */}
           <div className='d-flex w-100 p-2 mt-3 flex-row justify-content-between'>
            <FontAwesomeIcon type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" className='text-light d-md-none d-inline me-3 fs-3 mt-2' icon={faBars} />
               
            <h2 className='text-light'>Message <MdMessage className='text-light' /> </h2>
           
           </div>


           

         {loading ? (
          <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
            <div className='spinner-border text-info' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : chatapprove ? (  
          <div className='container border border-secondary border-rounded rounded-3 p-0 d-flex flex-column'>
            <div className='w-100 overflow-hidden m-0 border border-secondary border-rounded rounded-3 d-flex p-3 flex-row align-items-center justify-content-between'style={{backgroundColor:'rgb(38 40 40)'}}>
               <div className='d-flex  flex-row  gap-2'>
                 <div className='bg-info d-flex align-items-center justify-content-center fs-4 rounded-circle h-75 py-2 px-3 '>
                    {appointment?.doctorId?.name?.charAt(0)?.toUpperCase()}
                 </div>
                 <div className='d-flex flex-column'>
                 <p className='mb-0 text-light fw-medium fs-4'>Dr {appointment?.doctorId?.name}</p>
                 <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>{isOnline ? "Online now" : "Offline"}</p>
                 </div>
               </div>
                <div className='d-flex justify-content-center  flex-row gap-2'>
                  <FaRegClock className='text-warning fs-4' />
                  <p className='bg-light rounded-3 px-2 text-primary'>{timeLeft}</p>

                </div>

               {/* <button onClick={handleEndSession} type="button" class="btn btn-danger h-50">End Session</button> */}
              
            </div>
           
            <div className='w-100 p-4 hide-scrollbar'style={{backgroundColor:'rgb(38 40 40)',maxHeight:'380px',overflowY:'auto'}}>


               {messages?.map((msg, index) => (

    <div key={index} className="mb-3">

      {msg?.senderId?.toString() === patient.id ? (

        <div className='w-100 d-flex align-items-end flex-column'>
          <p className='p-2 bg-info rounded text-dark ' style={{ maxWidth: '70%',
    wordWrap: 'break-word'}}>
            {msg?.text}
          </p>
        </div>

      ) : (

        <div className='w-100 d-flex justify-content-start'>
          <p
            className='p-2 rounded text-light bg-secondary '
            style={{ maxWidth: '70%',
    wordWrap: 'break-word'}}
          >
            {msg?.text}
          </p>
        </div>

      )}

    </div>

  ))}
               
            </div>

            <div className='w-100 p-3 border-rounded rounded-3 border'>
               <textarea value={text}
onChange={(e)=>setText(e.target.value)} class="form-control border border-secondary" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
               <button className='p-2 bg-info text-dark border-0 fw-bold rounded mt-2' onClick={sendMessage}>
                 SEND MESSAGE
               </button>
            </div>
             
           </div>
          ):<div className='row flex-md-row my-auto  flex-column mt-5'>
            {appointment?<div className='col-md-5 mt-5 mt-md-0 col-12 fs-1 fw-semibold d-flex flex-column justify-content-center align-items-center text-light'>Your appointment at <span className='text-info'>{dayjs(appointment?.date)
      .hour(Number(appointment?.hour))
      .minute(Number(appointment?.minute)).format("dddd, D, h:mm A")}</span></div>:
                        <div className='col-5 fs-1 fw-semibold d-flex flex-column justify-content-center align-items-center text-light'>You have no upcoming appointments.</div>

}
            <div className='col-md-6 mt-4 mt-md-0 col-12 d-flex align-items-center justify-content-center'>
              <img src={next_appo} alt="Next Appointment" className='img-fluid h-100  object-cover w-100 ' />
            </div>
            </div>}
          </div>
        </div>
 <div class="offcanvas offcanvas-start"  style={{backgroundColor:'rgb(38, 40, 40)'}} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    
    <button type="button" class="btn-close " data-bs-dismiss="offcanvas"  aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
   <PatientSidebar/>
  </div>
</div>

<ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
  )
}

export default PatientMessage









