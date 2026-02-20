import React from 'react'
import DoctorSidebar from './DoctorSidebar'
import { IoMdPeople } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { BsEmojiSmileFill } from 'react-icons/bs'

const DoctorPatients = () => {
  return (
    <div className='w-100 min-vh-100'>
     <div className='w-100 row'>
      <DoctorSidebar/>
      <div className="col-9"style={{backgroundColor:'rgb(31, 33, 33)'}}>
       <div className='w-100 d-flex flex-row p-2 justify-content-between'>
       <h3 className='text-light fw-medium'>Patient Management <IoMdPeople className='text-primary ms-1 fs-3' /></h3>
       <div className='d-flex gap-2 align-items-center flex-row'>
          <input type="email" class="form-control px-1 h-50 py-4" id="exampleFormControlInput1" placeholder="search patients"/>
         <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle py-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    All Patients
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">High risk</a></li>
    <li><a class="dropdown-item" href="#">Medium risk</a></li>
    <li><a class="dropdown-item" href="#">Low risk</a></li>
  </ul>
</div>

<button type="button" class="btn h btn-info">Add Patient</button>

       </div>
       </div>

       <div className='w-100 d-flex flex-row gap-3 p-2 '>
        <div className='py-3 px-4 border doctordash position-relative rounded rounded-2 d-flex flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
            <GoDotFill className='text-danger fs-2' />

     <p className='text-info fs-3 mb-0 w-100 text-center fw-medium'>2</p>
     <p style={{color:'rgb(167 169 169 / 70%)'}}>High risk</p>
        </div>

         <div className='py-3 px-4 border doctordash position-relative rounded rounded-2 d-flex flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
            <GoDotFill className=' fs-2'style={{color:'orange'}} />

     <p className='text-info fs-3 mb-0 w-100 text-center fw-medium'>5</p>
     <p style={{color:'rgb(167 169 169 / 70%)'}}>Medium risk</p>
        </div>

         <div className='py-3 px-4 border doctordash position-relative rounded rounded-2 d-flex flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
            <GoDotFill className='text-info fs-2' />

     <p className='text-info fs-3 mb-0 w-100 text-center fw-medium'>38</p>
     <p style={{color:'rgb(167 169 169 / 70%)'}}>Low risk</p>
        </div>
       </div>
       <div className='container border border-secondary' style={{backgroundColor:'rgb(38 40 40)'}}>
          <div className='w-100 d-flex flex-row justify-content-between p-2'>
           <div className='d-flex flex-column'>
             <h4 className='text-light fw-medium'>Sarah Johnson</h4>
             <p style={{color:'rgb(167 169 169 / 70%)'}}>Age:28</p>
             </div>
          
          <div className='h-50 d-flex flex-column align-items-center justify-content-center p-1 rounded rounded-2' style={{backgroundColor:'rgb(50 184 198 / 10%)'}}>
            <p  className='text-info mb-0'>Low risk</p>
            <p style={{color:'rgb(167 169 169 / 70%)'}}>15%</p>
          </div>
          
          </div>
          <div className='row d-flex justify-content-evenly gap-4 mt-4 w-100'>
            <div className="col-5 rounded rounded-3 d-flex flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Wellness Score</p>
                 <p className='fs-3 text-center fw-medium text-info'>85</p>
            </div>

            <div className="col-5 d-flex rounded rounded-3 flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Mood Streak</p>
                 <p className='fs-3 text-center fw-medium text-info'>12 Days</p>
            </div>

             <div className="col-5 d-flex rounded rounded-3 flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Last Mood</p>
                 <p className='fs-3 text-center fw-medium text-info'><BsEmojiSmileFill className='text-warning me-1' />Calm</p>
            </div>

              <div className="col-5 d-flex rounded rounded-3 flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Engagement</p>
                 <p className='fs-3 text-center fw-medium text-info'><BsEmojiSmileFill className='text-warning me-1' />92%</p>
            </div>
          </div>
          
          <div className='container-fluid mt-4 p-4 rounded-3' style={{backgroundColor:'rgb(180 83 9 / 15%)'}}>
             <div className='container p-2 rounded-3' style={{backgroundColor:'rgb(38 40 40)'}}>
               <p className='mb-0' style={{color:'rgb(167 169 169 / 70%)'}}>2 hours ago</p>
               <p className='text-light mt-0'>Mood check-in:calm</p>
             </div>

              <div className='container p-2 mt-3 rounded-3' style={{backgroundColor:'rgb(38 40 40)'}}>
               <p className='mb-0' style={{color:'rgb(167 169 169 / 70%)'}}>Yesterday</p>
               <p className='text-light mt-0'>Completed Session</p>
             </div>
          </div>

          <div className='mt-3 mb-2'>
            <button type="button" class="btn btn-info me-2">Start Session</button>
            <button type="button" class="btn btn-light">View profile</button>
          </div>
       </div>
      </div>
     </div>
    </div>
  )
}

export default DoctorPatients