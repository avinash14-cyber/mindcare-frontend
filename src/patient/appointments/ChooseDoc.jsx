import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faStar } from '@fortawesome/free-solid-svg-icons'
import img from'../../assets/no_dcotors.png'
const ChooseDoc = ({doctor,setDoctor,availdoc}) => {
  return (
    <>
          <h3 className='text-light text-center w-100 mb-0'>Choose your doctor</h3>
          <div className='gap-3 row p-4 d-flex justify-content-evenly align-items-start h-100 overflow-y-auto ' style={{maxHeight:'465px'}}>
           
            {Array.isArray(availdoc)?(
              availdoc?.map(item=>(
               <div key={item._id} onClick={()=>setDoctor({name:item?.name,id:item?._id?.toString()})} className={doctor.id==item?._id?.toString()?"border border-2 border-info col-5 rounded-3":"col-5 rounded-3"} style={{backgroundColor:'rgb(31, 33, 33)'}}>
               <div className='w-100 d-flex flex-row'>
                 <div className='bg-info fw-medium fs-4 text-dark px-3 mt-2 mb-2 d-flex justify-content-center align-items-center  rounded-circle'>
                  EC
                  </div> 
                  <div className='d-flex flex-column ms-2'>
                     <p className='fs-5 mb-0 text-light'>{`Dr.${item?.name}`}</p>
                     <p className='mt-1' style={{color:' rgba(167, 169, 169, 0.7)'}}>{item?.speciality}</p>
                  </div>
               </div>
               <hr className='w-100 border border-2 mt-0 ' />
               <div className='d-flex  flex-row align-items-cente'>
                <FontAwesomeIcon className='text-warning fs-4' icon={faStar} />
                <p style={{color:' rgba(167, 169, 169, 0.7)'}}>4.9</p>
                <p className='ms-3' style={{color:' rgba(167, 169, 169, 0.7)'}}>{`${item?.exp} years`}</p>
               </div>
               <p className='w-100 text-center text-secondary'>Available</p>
            </div>
            ))
            ):<div className='w-100 text-center'>
              <img src={img} className='img-fluid' style={{height:'280px', scale:'1'}} alt="No doctor available" />
              <p className='text-light fs-5 fw-medium mt-2'>No doctors available for the selected date and time. Please choose a different slot.</p>
            </div>}
          


           
          </div>
         </>
  )
}

export default ChooseDoc