import React, { useContext, useEffect, useState } from 'react'
import DoctorSidebar from './DoctorSidebar'
import { MdMessage } from "react-icons/md";
import next_appo from '../assets/next_appointment.png'
import {socket} from '../socket/socket'
import { DoctorContext } from '../context/DocContext';
import { getAllIdApi, getDocChatHistoryApi } from '../services/allApi';
import dayjs from "dayjs";
import { FaRegClock } from 'react-icons/fa';
const DoctorMessage = () => {
   
   const{doc}=useContext(DoctorContext)
      const [messages, setMessages] = useState([])
   const [text, setText] = useState("")
   const[queue,setQueue]=useState([])
   const[loading,setLoading]=useState(true)
   const[chatapprove,setChatApprove]=useState(false)
   const [timeLeft, setTimeLeft] = useState("")
   const patientid=queue[0]?.patientId._id

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
            setLoading(false)
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
     if (queue.length === 0) return
   
     const interval = setInterval(() => {
       const now = dayjs()
   
       const appointmentTime = dayjs(queue[0]?.date)
         .hour(Number(queue[0]?.hour))
         .minute(Number(queue[0]?.minute))
   
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
   
const start=dayjs(queue[0]?.date)
      .hour(Number(queue[0]?.hour))
      .minute(Number(queue[0]?.minute))
 
      const end = start.add(1, "hour")

  useEffect(() => {
  if (!queue[0]) return

  const interval = setInterval(() => {
    const now = dayjs()

    const diff = end.diff(now) // milliseconds

    if (diff <= 0) {
      clearInterval(interval)
      setTimeLeft("00:00")
      // handleEndSession()
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


  return (
    <div className='w-100 min-vh-100'>
        <div className='row w-100'>
          <DoctorSidebar/>
          <div className='col-9'style={{backgroundColor:'rgb(31, 33, 33)'}}>
           {/* heading */}
           <div className='d-flex w-100 p-2 mt-3 flex-row justify-content-between'>
            <h2 className='text-light'>Message <MdMessage className='text-light' /> </h2>
            <button type="button" class="btn btn-info">New Message</button>
           </div>

          {loading?(<div className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
            <div className='spinner-border text-info' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>) :chatapprove?( <div className='container border border-secondary p-0 d-flex flex-column'>
            <div className='w-100 m-0 border border-secondary d-flex p-3 flex-row align-items-center justify-content-between'style={{backgroundColor:'rgb(38 40 40)'}}>
               <div className='d-flex flex-row  gap-2'>
                 <div className='bg-info d-flex align-items-center justify-content-center fs-4 rounded-circle h-75 py-2 px-3 '>
                    {queue[0]?.patientId?.name?.charAt(0)?.toUpperCase()}
                 </div>
                 <div className='d-flex flex-column'>
                 <p className='mb-0 text-light fw-medium fs-4'>{queue[0]?.patientId?.name}</p>
                 <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>Online now</p>
                 </div>
                
                              </div>

 <div className='d-flex justify-content-center  flex-row gap-2'>
                                  <FaRegClock className='text-warning fs-4' />
                                  <p className='bg-light rounded-3 px-2 text-primary'>{timeLeft}</p>
                
                                </div>

               <button type="button" class="btn btn-light h-50">Video Call</button>
              
            </div>
           
            <div className='w-100 p-4'style={{backgroundColor:'rgb(38 40 40)'}}>
                  {messages?.map((msg, index) => (

    <div key={index} className="mb-3">

      {msg?.senderId?.toString() === doc?.id ? (

        <div className='w-100 d-flex align-items-end flex-column'>
          <p className='p-2 bg-info rounded text-dark w-75'>
            {msg?.text}
          </p>
        </div>

      ) : (

        <div className='w-100'>
          <p
            className='p-2 rounded text-light w-75'
            style={{backgroundColor:'rgb(180 83 9 / 15%)'}}
          >
            {msg?.text}
          </p>
        </div>

      )}

    </div>

  ))}

              
            </div>

            <div className='w-100 p-3 border'>
               <textarea value={text} onChange={(e) => setText(e.target.value)}  class="form-control border border-secondary" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
               <button onClick={sendMessage} className='p-2 bg-info text-dark fw-bold rounded mt-2'>Send Message</button>
            </div>
             
           </div>):<div className='row mt-5'>
                       {queue.length>0?<div className='col-5 fs-1 fw-semibold d-flex flex-column justify-content-center align-items-center text-light'>Next session at <span className='text-info'>{dayjs(queue[0]?.date)
                 .hour(Number(queue[0]?.hour))
                 .minute(Number(queue[0]?.minute)).format("dddd, D, h:mm A")}</span></div>:
                                   <div className='col-5 fs-1 fw-semibold d-flex flex-column justify-content-center align-items-center text-light'>You have no upcoming sessions.</div>
           
           }
                       <div className='col-6 d-flex align-items-center justify-content-center'>
                         <img src={next_appo} alt="Next Appointment" className='img-fluid h-100  object-cover w-100 ' />
                       </div>
                       </div>}
          </div>
        </div>

    </div>
  )
}

export default DoctorMessage