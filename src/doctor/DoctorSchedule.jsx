import React, { useEffect, useMemo, useState } from 'react'
import DoctorSidebar from './DoctorSidebar'
import { faBars, faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDocAppointmentApi, handleDocDeleteTimeApi, handleDocScheduleApi, handleDoctorSlotsApi } from '../services/allApi'
import Swal from 'sweetalert2'
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
dayjs.extend(isSameOrAfter);

const DoctorSchedule = () => {

  const navigate=useNavigate()
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [remove,setRemove]=useState({})
  const[loading,setLoading]=useState(true)
  
const [scheduleData, setScheduleData] = useState({})
  const [availability,setAvailability]=useState({})
  const days=["MO","TU","WE","TH","FR","SA","SU"]
  const [selectedDays, setSelectedDays] = useState([])
  const[appointment,setAppointment]=useState([])
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
const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      }  

const handlePatients=async()=>{
const token=sessionStorage.getItem('DOCTOK')

 const reqHeader={
        "Authorization":`Bearer ${token}`
      }  
  const result=await getDocAppointmentApi(reqHeader)
  setAppointment(result.data)
}

useEffect(()=>{
handlePatients();
},[])

const todayKey = dayMap[new Date().getDay()]
const [daykey, setDayKey] = useState(todayKey)
const [daylabel,setDayLabel]=useState()

const appointmentMap = useMemo(() => {
  const map = {};

  appointment.forEach(app => {
    const dayKey = dayMap[new Date(app?.date).getDay()];

    if (!map[dayKey]) map[dayKey] = [];

    map[dayKey].push({
      hour: app?.hour,
      minute: app?.minute,
      session:app?.session,
      patientName: app?.patientId?.name
    });
  });
 
  return map;
}, [appointment]);



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
  if(!remove?.label || !remove?.Day){
    toast.warning("Please select a slot ")
    return
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


    const response= await handleDocDeleteTimeApi(remove,reqHeader)
    
    
   setScheduleData(prev=>({
    ...prev,
    [remove.Day]:prev[remove.Day].filter(item=>(
      item.label!=remove.label
    ))
   }))
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      background:'rgb(38, 40, 40)',
      color:'white',
      icon: "success"
    });
    setRemove({})
  }else if(result.isDismissed){
    setRemove({})
  }

  
}


const handleLoad=async()=>{
  const result=await handleDocScheduleApi(reqHeader)
  
  
  setScheduleData(result.data)
  
  
  setLoading(false)
}
console.log(scheduleData);
useEffect(()=>{
 setTodayslot(
  [...(scheduleData[daykey] || [])].sort((a, b) => a.hour - b.hour)
);
},[scheduleData,daykey])

useEffect(()=>{
  
  handleLoad()
},[])
  


  return (
    <div className='w-100 overflow-hidden min-vh-100'>
        <div className='  row'>
            <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <DoctorSidebar/>
                </div>
          <div className='col-md-9 col-12 min-vh-100'style={{backgroundColor:'rgb(31, 33, 33)'}}>
             <div className='w-100 p-3 d-flex flex-row justify-content-between'>
              <FontAwesomeIcon type="button" data-bs-toggle="offcanvas" data-bs-target="#barspop" aria-controls="staticBackdrop" className='text-light d-md-none d-inline me-3 fs-3 mt-2' icon={faBars} />
               <h2 className='text-light'>Schedule Management<FontAwesomeIcon className='text-light ms-1' icon={faClipboard} /></h2>
                 <div className='d-flex gap-2 flex-row'>
                <button type="button" className="btn btn-secondary"onClick={()=>handleRemove()}>Remove Slot</button>
                <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Slot</button>
                 </div>
             </div>
             <div className='w-100 mt-3 p-3  d-flex flex-row align-items-center justify-content-between'>
               <div className='d-flex flex-md-row flex-column gap-3'>
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
                    <p className='mb-0 text-info fs-3'>{appointmentMap[daykey]?.length??0}</p>
                    <p className='mt-0 text-secondary'>Appointments</p>
                  </div>


                   <div className='text-center'>
                    <p className='mb-0 text-info fs-3'>{`${appointmentMap[daykey]?.length??0} hr`}</p>
                    <p className='mt-0 text-secondary'>Total time</p>
                  </div>
                 </div>
             </div>

             <div style={{maxHeight:'500px'}} className='container hide-scrollbar  overflow-y-auto border rounded-3 border-secondary'>
             {loading?(
  <div className="d-flex justify-content-center mt-5 align-items-center w-100 h-100" >
    <div className="spinner-border my-auto text-info" role="status" />
  </div>
                  ):
             
             todayslot.map(item=>{
               

              const isBooked = appointmentMap?.[daykey]?.find(
                app =>
                  app.hour === item.hour &&
                  app.minute === item.minute
              );
                        

  let canStart = false;

if (isBooked?.date) {
  const now = dayjs();

  const sessionTime = dayjs(isBooked.date)
    .local()
    .hour(Number(isBooked.hour))
    .minute(Number(isBooked.minute))
    .second(0);

  const isToday = now.isSame(sessionTime, "day");

  canStart = isToday && now.isSameOrAfter(sessionTime);
}
             return(
               <div onClick={() => {
  if (!isBooked) {
    setRemove({ label: item.label, Day: daykey });
  }
}} className={item.label==remove.label?' border-bottom border-secondary row  text-light bg-danger':' border-bottom border-secondary row '}  key={item.label}>
               <div className={item.label==remove.label?'text-light col-2 col-md-1 px-3 py-4':'text-info  px-3 col-2 py-4 col-md-1'} style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                {item.label}
               </div>
               <div className='col-md-11 col-10 p-1 d-flex align-items-center justify-content-center ' style={{backgroundColor:'rgb(50 184 198 / 5%)'}}>
                 {isBooked?<div className='d-flex p-2 flex-column w-75 border border-2 border-primary'>
                  <div className='w-100 justify-content-between p-2 d-flex flex-row' style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                  <p className='text-light fs-4 fw-semibold'>{isBooked?.patientName}</p>
                  <div className='bg-secondary text-light px-2 rounded-3 h-25'>Booked</div>
                  </div>
                  <p className='text-light p-2 mt-1 fs-6 fw-semibold'style={{backgroundColor:'rgb(180 83 9 / 15%)'}}>{isBooked?.session}</p>
                  <div className='d-flex gap-2 flex-row'>
                    <p className='p-1 rounded-2 text-info'style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>Confirmed</p>                                       
                  <p className='p-1 rounded-2 text-info'style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>Ready</p>  
                  </div>

                  <button onClick={()=>navigate('/doctormessage')} disabled={!canStart} className='fs-4 mx-auto p-2 fw-medium rounded-2 border-0 bg-info text'>Start Now</button>
                 </div>:<p className={item.label==remove.label?'text-light':'text-secondary'}>Available</p>}
               </div>
             </div>
             )
})}

          

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

<div class="offcanvas offcanvas-start"  style={{backgroundColor:'rgb(38, 40, 40)'}} data-bs-backdrop="static" tabindex="-1" id="barspop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    
    <button type="button" class="btn-close " data-bs-dismiss="offcanvas"  aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
   <DoctorSidebar/>
  </div>
</div>

<ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
  )
}

export default DoctorSchedule