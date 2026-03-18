import React, { useContext, useEffect, useState } from 'react'
import PatientSidebar from './PatientSidebar'
import { MdMessage } from "react-icons/md";
import {socket} from '../socket/socket'
import { PatientContext } from '../context/UserContext';
import { DocidVal } from '../context/DocidContext';

const PatientMessage = () => {

   const{patient}=useContext(PatientContext)
   const{docid}=useContext(DocidVal)
   const [messages, setMessages] = useState([])
const [text, setText] = useState("")



const chatId = `${docid}_${patient?.id}`

useEffect(() => {

  socket.emit("join_chat", chatId)

}, [chatId])

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
    sender: "patient",
    message: text,
    time: new Date().toLocaleTimeString()
  }

  socket.emit("send_message", messageData)

 

  setText("")
}




  return (
    <div className=' min-vh-100'>
        <div className='row m-0'>
         <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <PatientSidebar/>
                </div>
            
          <div className='col-9'style={{backgroundColor:'rgb(31, 33, 33)'}}>
           {/* heading */}
           <div className='d-flex w-100 p-2 mt-3 flex-row justify-content-between'>
            <h2 className='text-light'>Message <MdMessage className='text-light' /> </h2>
            <button type="button" class="btn btn-info">New Message</button>
           </div>

           <div className='container border border-secondary p-0 d-flex flex-column'>
            <div className='w-100 m-0 border border-secondary d-flex p-3 flex-row align-items-center justify-content-between'style={{backgroundColor:'rgb(38 40 40)'}}>
               <div className='d-flex flex-row  gap-2'>
                 <div className='bg-info d-flex align-items-center justify-content-center fs-4 rounded-circle h-75 py-2 px-3 '>
                    EC
                 </div>
                 <div className='d-flex flex-column'>
                 <p className='mb-0 text-light fw-medium fs-4'>Dr.Emily Chen</p>
                 <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>Online now</p>
                 </div>
               </div>
               <button type="button" class="btn btn-light h-50">Video Call</button>
              
            </div>
           
            <div className='w-100 p-4'style={{backgroundColor:'rgb(38 40 40)'}}>


               {messages?.map((msg, index) => (

    <div key={index} className="mb-3">

      {msg?.sender === "patient" ? (

        <div className='w-100 d-flex align-items-end flex-column'>
          <p className='p-2 bg-info rounded text-dark w-75'>
            {msg?.message}
          </p>
        </div>

      ) : (

        <div className='w-100'>
          <p
            className='p-2 rounded text-light w-75'
            style={{backgroundColor:'rgb(180 83 9 / 15%)'}}
          >
            {msg?.message}
          </p>
        </div>

      )}

    </div>

  ))}
                {/* <div className='w-100 d-flex flex-column'>
                 <div className='w-75 d-flex flex-row justify-content-between'>
                    <p className='text-light'>Dr.Emily chen</p>
                    <p style={{color:'rgb(167 169 169 / 70%)'}}>Today 2:30 PM</p>
                 </div>
                 <p style={{backgroundColor:'rgb(180 83 9 / 15%)'}} className='p-2 rounded rounded-2 text-light w-75'>Hi Sarah, I wanted to follow up on our last session. How have you been feeling since we discussed the new coping strategies?</p>
                 <p style={{color:'rgb(167 169 169 / 70%)'}}><i>Your mood that day:</i>Calm</p>
                </div> */}


                 {/* <div className='w-100 d-flex align-items-end flex-column'>
                 <div className='w-75 d-flex flex-row justify-content-between'>
                    <p style={{color:'rgb(167 169 169 / 70%)'}}>Today 3:15 PM</p>
                    <p className='text-light'>Dr.Emily chen</p>
                     </div>
                 <p  className='p-2 bg-info rounded rounded-2 text-dark w-75'>Hi Sarah, I wanted to follow up on our last session. How have you been feeling since we discussed the new coping strategies?</p>
                 
                </div> */}
            </div>

            <div className='w-100 p-3 border'>
               <textarea value={text}
onChange={(e)=>setText(e.target.value)} class="form-control border border-secondary" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
               <button className='p-2 bg-info text-dark fw-bold rounded mt-2' onClick={sendMessage}>
                 Send Message
               </button>
            </div>
             
           </div>
          </div>
        </div>

    </div>
  )
}

export default PatientMessage