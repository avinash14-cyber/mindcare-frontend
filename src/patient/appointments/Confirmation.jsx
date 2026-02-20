import React from 'react'
import { SiTicktick } from "react-icons/si";
import dayjs from "dayjs";



const Confirmation = ({booked,bookFunc}) => {
  const formattedDate = dayjs(booked.date).format(
  "dddd, MMMM D, YYYY"
);
  return (
    <>
         <div className='d-flex flex-column justify-content-center align-items-center'>
         


          <div className='d-flex flex-column py-4 px-2 rounded-3 mt-4 justify-content-center align-items-center border border-2 border-info' style={{width:'430px'}}>
             <SiTicktick className='text-info fs-1' />  
          <p className='text-light fs-4 fw-medium'>Jon,we've set your appointment <br />click confirm appointment below</p>

          <div className='d-flex flex-row'>
              <p className='text-info fs-2 fw-medium px-2 border-end border-2'>{booked.time.label}</p>
              <p className='text-info fs-2 fw-medium px-2'>{`Dr.${booked.doctor.name}`}</p>
          </div>
          <p className='text-light fs-4 fw-normal'>{formattedDate}</p>

          <button onClick={bookFunc} className='p-1 rounded fw-semibold rounded-3 bg-info text-dark border-0 fs-4'>BOOK APPOINTMENT</button>
          </div>
          
         </div>
         </>
  )
}

export default Confirmation