import React, { useContext, useEffect, useState } from 'react'
import DoctorSidebar from './DoctorSidebar'
import { MdMessage } from "react-icons/md";
import next_appo from '../assets/next_appointment.png'
import {socket} from '../socket/socket'
import { DoctorContext } from '../context/DocContext';
import { endSessionApi, getAllIdApi, getDocChatHistoryApi } from '../services/allApi';
import dayjs from "dayjs";
import { FaRegClock } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const DoctorMessage = () => {
   
   const{doc}=useContext(DoctorContext)
      const [messages, setMessages] = useState([])
   const [text, setText] = useState("")
   const[queue,setQueue]=useState([])
   const[loading,setLoading]=useState(true)
   const[chatapprove,setChatApprove]=useState(false)
   const [timeLeft, setTimeLeft] = useState("")
   const [isOnline, setIsOnline] = useState(false)
   const patientid=queue?.patientId?._id

   const chatId = `${doc?.id}_${patientid}`
   
   useEffect(() => {
   
     socket.emit("join_chat", chatId)
   
   }, [chatId])

   useEffect(() => {
      fetchId()
   },[])

   const fetchId=async()=>{
      try{

         const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      } 
         const result=await getAllIdApi(reqHeader)
         if(result.status==200){
            setQueue(result?.data)
            // setLoading(false)
         }

      }catch(err){

      }
   }
   
   useEffect(() => {
   
     socket.on("receive_message", (data) => {
       setMessages(prev => [...prev, data])
     })
   
     return () => {
       socket.off("receive_message")
     }
   
   }, [])

   const sendMessage = () => {
   
     if (!text.trim()) return
   
     const messageData = {
       chatId: chatId,
    senderID: doc?.id,
    receiversID: patientid,
    text: text,
     }
   
     socket.emit("send_message", messageData)
   
    
   
     setText("")
   }
   
   useEffect(() => {
     if (!queue){
        setLoading(false)
        return
     } 
   
     const interval = setInterval(() => {
       const now = dayjs()
   
       const appointmentTime = dayjs(queue?.date)
         .hour(Number(queue?.hour))
         .minute(Number(queue?.minute))
   
       const start = appointmentTime
       const end = appointmentTime.add(30, "hour")
   
       const canChat = now.isBetween(start, end, null, "[)")
       setLoading(false)
       if (canChat) {
         setChatApprove(true)
         setLoading(false)
         clearInterval(interval) 
       }
     }, 1000)
   
     return () => clearInterval(interval)
   }, [queue])
   
   useEffect(() => {
   
     const fetchMessages = async () => {
       try {
          const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      } 
         const res = await getDocChatHistoryApi(chatId, reqHeader)
         setMessages(res?.data)
       } catch (err) {
         console.error(err)
       }
     }
   
     if (chatId) {
       fetchMessages()
     }
   
   }, [chatId])
   
// const start=dayjs(queue?.date)
//       .hour(Number(queue?.hour))
//       .minute(Number(queue?.minute))
 
//       const end = start.add(1, "hour")

  useEffect(() => {
  if (!queue) return

  const start=dayjs(queue?.date)
      .hour(Number(queue?.hour))
      .minute(Number(queue?.minute))
 
      const end = start.add(1, "hour")
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
}, [queue])   

const getTimeLeftInSeconds = () => {
  if (!timeLeft) return 0
  const [min, sec] = timeLeft.split(":").map(Number)
  return min * 60 + sec
}


const handleEndSession = async () => {
  try {

          const secondsLeft = getTimeLeftInSeconds()
            console.log("inside end function");
            
    
    if (secondsLeft >= 300) {
      const result = await Swal.fire({
        title: "End session early?",
        text: "Are you sure?",
        icon: "warning",
        color: "white",
        background: "rgb(38, 40, 40)",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "rgb(52,186,200)",
        confirmButtonText: "Yes, end it"
      })
      if (!result.isConfirmed) {
        return
      }
    
      
    }
    

   
          const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`}
      
    
    await endSessionApi(patientid,reqHeader)

    setChatApprove(false)
    setMessages([])
    
    socket.emit("leaveRoom", patientid)

    
  
    fetchId()
    

  } catch (err) {
    console.log(err)
  }
}

useEffect(() => {
  if (doc?.id) {
    socket.emit("user_online", doc?.id)
  }
}, [doc])

useEffect(() => {
  if (patientid) {
    socket.emit("check_online", patientid)
  }
}, [patientid])




useEffect(() => {
  const handler = ({ userId, status }) => {
    if (userId === patientid) {
      setIsOnline(status === "online")
    }
  }

  socket.on("user_status", handler)

  return () => socket.off("user_status", handler)
}, [patientid])

  return (
    <div className='w-100 overflow-hidden min-vh-100'>
        <div className='row  min-vh-100'>
          <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <DoctorSidebar/>
                </div>
          <div className='col-md-9 col-12'style={{backgroundColor:'rgb(31, 33, 33)'}}>
           {/* heading */}
           <div className='d-flex w-100 p-2 mt-3 flex-row justify-content-between'>
            <div className='d-flex flex-row '>
              <FontAwesomeIcon type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" className='text-light d-md-none d-inline me-3 fs-3 mt-2' icon={faBars} />
              <h2 className='text-light mt-1'>Message <MdMessage className='text-light' /> </h2>
            </div>
            
            {/* <button type="button" class="btn btn-info">New Message</button> */}
           </div>

          {loading?(<div className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
            <div className='spinner-border text-info' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>) :chatapprove?( <div className='w-100 mt-5 border border-rounded rounded-3 border-secondary  d-flex flex-column'>
            <div className=' m-0 w-100 border border-secondary border-rounded rounded-3 d-flex p-3 flex-row align-items-center justify-content-between'style={{backgroundColor:'rgb(38 40 40)'}}>
               <div className='d-flex flex-row  gap-2'>
                 <div className='bg-info d-flex align-items-center justify-content-center fs-4 rounded-circle h-75 py-2 px-3 '>
                    {queue?.patientId?.name?.charAt(0)?.toUpperCase()}
                 </div>
                 <div className='d-flex flex-column'>
                 <p className='mb-0 text-light fw-medium fs-4'>{queue?.patientId?.name}</p>
                 <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>{isOnline ? "Online now" : "Offline"}</p>
                 </div>
                
                              </div>

 <div className='d-flex justify-content-center  flex-row gap-2'>
                                  <FaRegClock className='text-warning fs-4' />
                                  <p className='bg-light rounded-3 px-2 text-primary'>{timeLeft}</p>
                
                                </div>

               <button onClick={handleEndSession} type="button" class="btn btn-danger h-50">End Session</button>
              
            </div>
           
            <div className='w-100 p-4'style={{backgroundColor:'rgb(38 40 40)'}}>
                  {messages?.map((msg, index) => (  

    <div key={index} className="mb-3">

      {msg?.senderId?.toString() === doc?.id ? (

        <div className='w-100 d-flex align-items-end flex-column'>
          <p className='p-2 bg-info rounded text-dark 'style={{maxWidth: '70%',
    wordWrap: 'break-word'}} >
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

            <div className='w-100 p-3 border-rounded rounded-3 border-secondary border'>
               <textarea value={text} onChange={(e) => setText(e.target.value)}  class="form-control border-rounded rounded-3 border border-secondary" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
               <button onClick={sendMessage} className='p-2 bg-info text-dark fw-bold rounded mt-2'>Send Message</button>
            </div>
             
           </div>):<div className='row  align-items-center justify-content-center   mt-5'>
                       {queue?<div className='col-md-5 mt-5 col-12 fs-1 fw-semibold d-flex flex-column justify-content-center align-items-center text-light'>Next session at <span className='text-info'>{dayjs(queue?.date)
                 .hour(Number(queue?.hour))
                 .minute(Number(queue?.minute)).format("dddd, D, h:mm A")}</span></div>:
                                   <div className='col-md-5 col-12 fs-1 fw-semibold d-flex flex-column justify-content-center align-items-center text-light'>You have no upcoming sessions.</div>
           
           }
                       <div className='col-md-6 mt-3 col-10 d-flex align-items-center justify-content-center'>
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
   <DoctorSidebar/>
  </div>
</div>


    </div>
  )
}

export default DoctorMessage