import React, { useEffect, useState } from 'react'
import DoctorSidebar from './DoctorSidebar'
import { IoMdPeople } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { BsEmojiFrownFill, BsFillEmojiSmileFill, BsFillEmojiTearFill } from 'react-icons/bs'
import { totalPateintsApi } from '../services/allApi'
import dayjs from "dayjs"
import { HiEmojiSad } from 'react-icons/hi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MdEmojiEmotions } from 'react-icons/md'
import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons'
import img from'../assets/doctor_patients.png'

const DoctorPatients = () => {

   const moodEmojis = {
  Sad: <BsEmojiFrownFill className="fs-4 text-warning" />,
  Stressed: <HiEmojiSad className="fs-2 text-warning" />,
  Anxious: <BsFillEmojiTearFill className="fs-4 text-warning" />,
  Happy: <FontAwesomeIcon className="fs-4 text-warning" icon={faFaceSmileBeam} />,
  Calm: <BsFillEmojiSmileFill className="fs-4 text-warning" />,
  Neutral: <MdEmojiEmotions className="fs-4 text-warning" />
};
  const [pat,setPat]=useState([])
  const [filter, setFilter] = useState("All Patients")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    
      const handlePatientList=async()=>{
    const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      }  
      const result=await totalPateintsApi(reqHeader)
      setPat(result.data)
      setLoading(false)
    }
    
  handlePatientList();

}

,[])

const filteredPatients = pat?.filter((p) => {
  const riskMatch =
    filter === "All Patients" ||
    (filter === "High risk" && p.wellness <= 40) ||
    (filter === "Medium risk" && p.wellness > 40 && p.wellness <= 70) ||
    (filter === "Low risk" && p.wellness > 70)

  const searchMatch =
    searchTerm === "" ||
    p.patientId.name.toLowerCase().includes(searchTerm.toLowerCase())

  return riskMatch && searchMatch
})

const getRisk = (wellness) => {
  if (wellness <= 40) return { label: "High risk", color: "text-danger" }
  if (wellness <= 70) return { label: "Medium risk", color: "text-warning" }
  return { label: "Low risk", color: "text-success" }
}

  
  return (
    <div className='w-100 min-vh-100'>
     <div className='w-100 row'>
      <DoctorSidebar/>
      <div className="col-9"style={{backgroundColor:'rgb(31, 33, 33)'}}>
       <div className='w-100 d-flex flex-row p-2 justify-content-between'>
       <h3 className='text-light fw-medium'>Patient Management <IoMdPeople className='text-primary ms-1 fs-3' /></h3>
       <div className='d-flex gap-2 align-items-center flex-row'>
          <input type="email" class="form-control px-1 h-50 py-4" id="exampleFormControlInput1" onChange={(e) => setSearchTerm(e.target.value)} placeholder="search patients"/>
         <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle py-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {filter}
  </button>
  <ul class="dropdown-menu">
     <li><a class="dropdown-item" onClick={() => setFilter("All Patients")} href="#">All patients</a></li>
    <li><a class="dropdown-item" onClick={() => setFilter("High risk")} href="#">High risk</a></li>
    <li><a class="dropdown-item"onClick={() => setFilter("Medium risk")} href="#">Medium risk</a></li>
    <li><a class="dropdown-item" onClick={() => setFilter("Low risk")} href="#">Low risk</a></li>
  </ul>
</div>



       </div>
       </div>

       <div className='w-100 d-flex flex-row gap-3 p-2 '>
        <div className='py-3 px-4 border doctordash position-relative rounded rounded-2 d-flex flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
            <GoDotFill className='text-danger fs-2' />

     <p className='text-info fs-3 mb-0 w-100 text-center fw-medium'>{pat?.filter(items=>items?.wellness<=40)?.length}</p>
     <p style={{color:'rgb(167 169 169 / 70%)'}}>High risk</p>
        </div>

         <div className='py-3 px-4 border doctordash position-relative rounded rounded-2 d-flex flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
            <GoDotFill className=' fs-2'style={{color:'orange'}} />

     <p className='text-info fs-3 mb-0 w-100 text-center fw-medium'>{pat?.filter(items=>items?.wellness>40 && items?.wellness<=70)?.length}</p>
     <p style={{color:'rgb(167 169 169 / 70%)'}}>Medium risk</p>
        </div>

         <div className='py-3 px-4 border doctordash position-relative rounded rounded-2 d-flex flex-column'style={{backgroundColor:'rgb(38 40 40)'}}>
            <GoDotFill className='text-info fs-2' />

     <p className='text-info fs-3 mb-0 w-100 text-center fw-medium'>{pat?.filter(items=>items?.wellness>70)?.length}</p>
     <p style={{color:'rgb(167 169 169 / 70%)'}}>Low risk</p>
        </div>
       </div>
       <h2 className='text-info text-center fw-medium'>{filter}</h2>
      <div className='w-100 overflow-y-auto hide-scrollbar 'style={{height:'480px'}} >
         {loading?(
  <div className="d-flex justify-content-center align-items-center w-100 h-100" >
    <div className="spinner-border my-auto text-info" role="status" />
  </div>
                  ):
         
         filteredPatients?.length>0?(filteredPatients?.map(items=>{
          const risk = getRisk(items?.wellness)
        return ( <div key={items._id} className='container mt-2 border border-secondary' style={{backgroundColor:'rgb(38 40 40)'}}>
          <div className='w-100 d-flex flex-row justify-content-between p-2'>
           <div className='d-flex flex-column'>
             <h4 className='text-light fw-medium'>{items?.patientId?.name}</h4>
             <p style={{color:'rgb(167 169 169 / 70%)'}}>Age:28</p>
             </div>
          
          <div className='h-50 d-flex flex-column align-items-center justify-content-center p-1 rounded rounded-2' style={{backgroundColor:'rgb(50 184 198 / 10%)'}}>
          
             <p className={`${risk?.color} mb-0 fw-medium`}>
            {risk?.label}
          </p>
           
          </div>
          
          </div>
          <div className='row d-flex justify-content-evenly gap-4 mt-4 w-100'>
            <div className="col-5 rounded rounded-3 d-flex flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Wellness Score</p>
                 <p className='fs-3 text-center fw-medium text-info'>{items?.wellness}</p>
            </div>

            <div className="col-5 d-flex rounded rounded-3 flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Mood Streak</p>
                 <p className='fs-3 text-center fw-medium text-info'>{`${items?.moodstreak} Days`}</p>
            </div>

             <div className="col-5 d-flex rounded rounded-3 flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Last Mood</p>
                 <p className='fs-3 text-center fw-medium text-info'>{moodEmojis[items?.lastmood??""]} {items?.lastmood??"Not added"}</p>
            </div>

              <div className="col-5 d-flex rounded rounded-3 flex-column" style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 <p className='text-light w-100 text-center'>Appointment</p>
                 <p className='fs-3 text-center fw-medium text-info'>{items?.date &&
  dayjs(items?.date)
    .hour(items?.hour)
    .minute(items?.minute)
    .format("D dddd h:mm A")}</p>
            </div>
          </div>
          
         

          <div className='mt-3 mb-2'>
            <button type="button" class="btn btn-info me-2">Start Session</button>
            <button type="button" class="btn btn-light">View profile</button>
          </div>
       </div>)
})):<div className='w-100 h-70 d-flex justify-content-center align-items-center '>
  <img src={img} className='img-fluid object-fit-cover h-75' alt="" /></div>}
      </div>
      </div>
     </div>
    </div>
  )
}

export default DoctorPatients