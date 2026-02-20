import React from 'react'
import DoctorSidebar from './DoctorSidebar'
import { MdMessage } from "react-icons/md";
const DoctorMessage = () => {
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
                <div className='w-100 d-flex flex-column'>
                 <div className='w-75 d-flex flex-row justify-content-between'>
                    <p className='text-light'>Dr.Emily chen</p>
                    <p style={{color:'rgb(167 169 169 / 70%)'}}>Today 2:30 PM</p>
                 </div>
                 <p style={{backgroundColor:'rgb(180 83 9 / 15%)'}} className='p-2 rounded rounded-2 text-light w-75'>Hi Sarah, I wanted to follow up on our last session. How have you been feeling since we discussed the new coping strategies?</p>
                 <p style={{color:'rgb(167 169 169 / 70%)'}}><i>Your mood that day:</i>Calm</p>
                </div>


                 <div className='w-100 d-flex align-items-end flex-column'>
                 <div className='w-75 d-flex flex-row justify-content-between'>
                    <p style={{color:'rgb(167 169 169 / 70%)'}}>Today 3:15 PM</p>
                    <p className='text-light'>Dr.Emily chen</p>
                     </div>
                 <p  className='p-2 bg-info rounded rounded-2 text-dark w-75'>Hi Sarah, I wanted to follow up on our last session. How have you been feeling since we discussed the new coping strategies?</p>
                 
                </div>
            </div>

            <div className='w-100 p-3 border'>
               <textarea class="form-control border border-secondary" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
               <button className='p-2 bg-info text-dark fw-bold rounded mt-2'>Send Message</button>
            </div>
             
           </div>
          </div>
        </div>

    </div>
  )
}

export default DoctorMessage