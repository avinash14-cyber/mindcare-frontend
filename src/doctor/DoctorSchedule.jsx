import React, { useEffect, useState } from 'react'
import DoctorSidebar from './DoctorSidebar'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleDocDeleteTimeApi, handleDocScheduleApi, handleDoctorSlotsApi } from '../services/allApi'
import Swal from 'sweetalert2'

const DoctorSchedule = () => {



  const [selectedSlot, setSelectedSlot] = useState([]);
  const [remove,setRemove]=useState({})
  
  const [bookings,setBookings]=useState([])
const [scheduleData, setScheduleData] = useState({})
  const [availability,setAvailability]=useState({})
  const days=["MO","TU","WE","TH","FR","SA","SU"]
  const [selectedDays, setSelectedDays] = useState([])
  const[todayslot,setTodayslot]=useState([])
const toggleDay = (day) => {
  setSelectedDays(prev =>
    prev.includes(day)
      ? prev.filter(d => d !== day)
      : [...prev, day]
  )
}

const toggleTimeSlot = (slot) => {
  
  setSelectedSlot(prev => {
    const exists = prev.some(item => item.label === slot.label)

    if (exists) {
      
      return prev.filter(item => item.label !== slot.label)
    } else {
      
      return [...prev, slot]
    }
  })
  
}



const slots = [
  { label: "9:00 AM", hour: 9, minute: 0 },
  { label: "10:00 AM", hour: 10, minute: 0 },
  { label: "11:00 AM", hour: 11, minute: 0 },
  { label: "1:00 PM", hour: 13, minute: 0 },
  { label: "2:00 PM", hour: 14, minute: 0 },
  { label: "3:00 PM", hour: 15, minute: 0 },
  { label: "4:00 PM", hour: 16, minute: 0 },
  { label: "5:00 PM", hour: 17, minute: 0 },
  { label: "6:00 PM", hour: 18, minute: 0 },
  { label: "7:00 PM", hour: 19, minute: 0 },
  { label: "8:00 PM", hour: 20, minute: 0 },
  { label: "9:00 PM", hour: 21, minute: 0 },
  { label: "10:00 PM", hour: 22, minute: 0 }
]

const DAYS=[
  {label:"Monday",key:"MO"},
  {label:"Tuesday",key:"TU"},
  {label:"Wednesday",key:"WE"},
  {label:"Thursday",key:"TH"},
  {label:"Friday",key:"FR"},
  {label:"Saturday",key:"SA"},
  {label:"Sunday",key:"SU"},
]

  const dayMap = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA"
}


const todayKey = dayMap[new Date().getDay()]
const [daykey, setDayKey] = useState(todayKey)
const [daylabel,setDayLabel]=useState()
const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      }  

const handleAddTime=async()=>{
  const updatedAvailability = { ...availability }
if(selectedDays.length==0 || selectedSlot.length==0){
  alert("Select days and time")
}
 else{
  selectedDays.forEach(day => {
    if (!updatedAvailability[day]) {
      updatedAvailability[day] = []
    }

    selectedSlot.forEach(slot => {
      const exists = updatedAvailability[day].some(
        s => s.label === slot.label
      )

      if (!exists) {
        updatedAvailability[day].push(slot)
      }
    })
  })

  
  setAvailability(updatedAvailability)
  const result=await handleDoctorSlotsApi({updatedAvailability},reqHeader)
   setSelectedDays([])
  setSelectedSlot([])
  handleLoad()
 } 
}



  const handleRemove=async()=>{
  if(!remove){
    alert("please select a time")
  }
  
   const result= await  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  color:'white',
  icon: "warning",
  background:'rgb(38, 40, 40)',
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: 'rgb(52,186,200)',
  confirmButtonText: "Yes, delete it!"
})
  if (result.isConfirmed) {


    const result= await handleDocDeleteTimeApi(remove,reqHeader)
    console.log(result);
    console.log(todayslot);
    
   setScheduleData(prev=>({
    ...prev,
    [remove.Day]:prev[remove.Day].filter(item=>(
      item.label!=remove.label
    ))
   }))
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    setRemove({})
  }

  
}


const handleLoad=async()=>{
  const result=await handleDocScheduleApi(reqHeader)
  
  console.log(result.data);
  setScheduleData(result.data)
  
}

useEffect(()=>{
 setTodayslot(scheduleData[daykey] || [])
},[scheduleData,daykey])

useEffect(()=>{
  
  handleLoad()
},[])
  
  
  return (
    <div className='w-100 min-vh-100'>
        <div className='w-100 row'>
          <DoctorSidebar/>
          <div className='col-9 min-vh-100'style={{backgroundColor:'rgb(31, 33, 33)'}}>
             <div className='w-100 p-3 d-flex flex-row justify-content-between'>
               <h2 className='text-light'>Schedule Management<FontAwesomeIcon className='text-light ms-1' icon={faClipboard} /></h2>
                 <div className='d-flex gap-2 flex-row'>
                <button type="button" className="btn btn-secondary"onClick={()=>handleRemove()}>Remove Slot</button>
                <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Slot</button>
                 </div>
             </div>
             <div className='w-100 mt-3 p-3  d-flex flex-row align-items-center justify-content-between'>
               <div className='d-flex flex-row gap-3'>
                  <h4 className="text-light">
     {daykey==dayMap[new Date().getDay()]?`Today,${new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })}`:daylabel}
  </h4>

  <select className="form-select h-50 " style={{width:'100px'}} aria-label="Default select example"value={daykey}
  onChange={e => {setDayKey(e.target.value);
    setDayLabel(e.target.options[e.target.selectedIndex].text);
  }}>
  {DAYS.map((item,index)=>(
     <option key={index}  value={item.key}>{dayMap[new Date().getDay()]==item.key?"Today":item.label}</option>
  ))}
 
  
</select>
               </div>
                 <div className='d-flex flex-row gap-3'>
                  <div className='text-center'>
                    <p className='mb-0 text-info fs-3'>6</p>
                    <p className='mt-0 text-secondary'>Appointments</p>
                  </div>


                   <div className='text-center'>
                    <p className='mb-0 text-info fs-3'>5h</p>
                    <p className='mt-0 text-secondary'>Total time</p>
                  </div>
                 </div>
             </div>

             <div className='container overflow-hidden border rounded-3 border-secondary'>
             {todayslot.map(item=>(
              
              <div onClick={()=>setRemove({label:item.label,Day:daykey})} className={item.label==remove.label?' border-bottom border-secondary row  text-light bg-danger':' border-bottom border-secondary row'} key={item.label}>
               <div className={item.label==remove.label?'text-light  px-3 py-4 col-1':'text-info  px-3 py-4 col-1'} style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                {item.label}
               </div>
               <div className='col-11 d-flex align-items-center justify-content-center ' style={{backgroundColor:'rgb(50 184 198 / 5%)'}}>
                 <p className={item.label==remove.label?'text-light':'text-secondary'}>Available</p>
               </div>
             </div>
             ))}

          

             </div>
          </div>
        </div>
       
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content"style={{backgroundColor:'rgb(38, 40, 40)'}}>
      <div className="modal-header">
        <h1 className="modal-title text-light fs-5" id="exampleModalLabel">Add your time</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='d-flex px-2 py-2 flex-row w-100 justify-content-between'>
        {days.map(item=>(
          <button onClick={() => toggleDay(item)} key={item} className={`px-3 border-0 fs-6 rounded-pill
          ${selectedDays.includes(item)?"bg-info text-black":""}`}>
            {item}
          </button>
        )
          

        )}
      </div>
      <div className="modal-body px-2 gap-2 row justify-content-around align-items-center">
        {slots.map((item,index)=>(
          <div key={index} onClick={()=>toggleTimeSlot(item)} style={{cursor:"pointer"}} className={`col-3 rounded-2 border-secondary border-2 border py-4 text-center px-2 ${ selectedSlot.some(
      s => s.label === item.label
    )?"bg-info text-dark border-0":"bg-transparent text-light "}`}>
            {item.label}
          </div>
        ))}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleAddTime()}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default DoctorSchedule