import React from 'react'
import PatientSidebar from './PatientSidebar'
import { faFire, faMedal, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PatientAchievments = () => {
  return (
    <div className='w-100 min-vh-100'>
     <div className='row m-0'>
  <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <PatientSidebar/>
                </div>
            
  <div className='col-9'style={{backgroundColor:'rgb(31, 33, 33)'}}>
    <div className='w-100 d-flex flex-row align-items-center justify-content-between p-3'>
     <h2 className='text-light fw-medium'>Achievments and Rewards <FontAwesomeIcon className='text-warning' icon={faTrophy} /></h2>
     <p className='text-secondary fs-5'>Celebrate your mental wellness milestones</p>
    </div>
    <div className='row d-flex justify-content-evenly mt-4'>
      <div className='col-3 topline d-flex py-3 border border-secondary rounded overflow-hidden position-relative align-items-center justify-content-center flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
        <FontAwesomeIcon className='text-warning' icon={faMedal} />
        <p className='text-info fs-4 fw-medium text-center'>8</p>
        <p className='text-secondary'>Badges Earned</p>
      </div>


      <div className='col-3 topline d-flex py-3 border border-secondary rounded overflow-hidden position-relative align-items-center justify-content-center flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
         <FontAwesomeIcon className='text-warning' icon={faFire} />
        <p className='text-info fs-4 fw-medium text-center'>12</p>
        <p className='text-secondary'>Day Streak</p>
      </div>


       <div className='col-3 topline d-flex py-3 border border-secondary rounded overflow-hidden position-relative align-items-center justify-content-center flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
        <FontAwesomeIcon className='text-warning' icon={faStar} />
        <p className='text-info fs-4 fw-medium text-center'>3</p>
        <p className='text-secondary'>Level</p>
      </div>
    </div>
  </div>
     </div>
    </div>
  )
}

export default PatientAchievments