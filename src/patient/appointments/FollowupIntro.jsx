import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import vid from '../../assets/not_found.gif'
import React from 'react'
import { useEffect } from 'react'

const FollowupIntro = ({setSession,nextfunc,details,setDoctor}) => {

  useEffect(()=>{
setDoctor({name:details.doctorId.name,id:details.doctorId._id.toString()});
  },[])
  const flag=!details||details.status=="BOOKED"
  return (
    <div className='row my-auto  justify-content-around'>
      {flag?<div className='col-10  d-flex flex-column align-items-center'>
          <img src={vid} className='img-fluid w-75 h-75' alt="" />
        <p className='text-light fs-3 fw-bold'>You have no follow ups</p>
        <button onClick={()=>setSession("")} className='fs-4 bg-info text-dark p-2 fw-medium border-0 rounded-2'>Go Back</button>
      </div>:(<>
      <div className='col-5 justify-content-center border-end border-secondary align-items-center d-flex flex-column'>

  <FontAwesomeIcon className=' text-info' style={{fontSize:'6.5rem'}} icon={faUserDoctor} />
  <h2 className='text-light'>{`Dr.${details.doctorId.name}`}</h2>
  <p className='text-light fs-4'>{`${details.doctorId.exp} yrs experience`}</p>
    <p className='text-light fs-5'>{details.doctorId.speciality}</p>
</div>
<div className='col-5 d-flex flex-column align-items-center justify-content-around'>
 <div className='text-center'>
   <p className='text-light fs-6'>Continue with your current doctor?</p>
  <button onClick={()=>{nextfunc();}} className='fs-4 bg-info text-dark p-2 fw-medium border-0 rounded-2'>Yes,continue</button>
 </div>
 <div className='text-center'>
   <p className='text-light'>or go back choose a new session</p>
  <button onClick={()=>setSession("")} className='fs-4 bg-warning text-dark p-2 fw-medium border-0 rounded-2'>Go Back</button>
 </div>
</div></>)}

    </div>
  )
}

export default FollowupIntro