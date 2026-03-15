import React, { useEffect, useState } from 'react'
import PatientSidebar from './PatientSidebar'
import { faBullseye, faCalendarCheck, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GiMeditation } from "react-icons/gi";
import { isExpired } from '../utils/isValidUtil';
import { appointmentShowApi, bookAppointmentApi, chooseDoctorApi, deleteAppointmentApi, followUpApi, followUpTimeApi } from '../services/allApi';
import Session from './appointments/Session';
import DateandTime from './appointments/DateandTime';
import ChooseDoc from './appointments/ChooseDoc';
import Confirmation from './appointments/Confirmation';
import FollowupIntro from './appointments/FollowupIntro';
import FollowupConfirm from './appointments/FollowupConfirm';
import FollowDate from './appointments/FollowDate';
import Swal from 'sweetalert2'
import dayjs from "dayjs";
import img from '../assets/no_appo.png'

const PatientAppointments = () => {



  const [stepper,setStepper]=useState(1)
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
  // { label: "10:00 PM", hour: 22, minute: 0 }
]

  
  const[availableDocs,setAvailableDocs]=useState([])
  const[followtime,setFollowTime]=useState([])
  const[showappo,setShowAppo]=useState([])
  const[appointment,setAppointment]=useState({
    date:"",
    time:"",
    doctor:"",
    session:""
  })
  const[refreshapo,setrefreshapo]=useState(false)
 const [loading, setLoading] = useState(true);
const [followup,setFollowUp]=useState([])
 
  

 



const renderContent = () => {
  if (appointment.session === "Follow Up") {
    switch (stepper) {
      case 1:
        return <FollowupIntro setDoctor={docid=>(setAppointment(prev=>({...prev,doctor:docid})))} details={followup} nextfunc={handleNext} setSession={(value)=>(setAppointment(prev=>({...prev,session:value})))}/>
      case 2:
        return <FollowDate followslot={followtime} date={appointment.date} time={appointment.time}  onDateChange={(date) =>
    setAppointment(prev => ({ ...prev, date }))
  }
  onTimeChange={(time) =>
    setAppointment(prev => ({ ...prev, time }))
  }/>  
      case 3:
        return <FollowupConfirm booked={appointment} bookingFunc={handleBooking}/>
      
      default:
        return null;
    }
  }

  
  switch (stepper) {
    case 1:
      return <Session session={appointment.session} setSession={(value)=>(setAppointment(prev=>({...prev,session:value})))}/>;
    case 2:
      return <DateandTime date={appointment.date} time={appointment.time}  onDateChange={(date) =>
    setAppointment(prev => ({ ...prev, date }))
  }
  onTimeChange={(time) =>
    setAppointment(prev => ({ ...prev, time }))
  } />
    case 3:
      return <ChooseDoc doctor={appointment.doctor} setDoctor={docid=>(setAppointment(prev=>({...prev,doctor:docid})))}
      availdoc={availableDocs} />
    case 4:
      return <Confirmation booked={appointment} bookFunc={handleBooking}/>
    default:
      return null;
  }
};


const isValid = () => {
  if (appointment.session === "Follow Up") {
    switch (stepper) {
      case 1:
        return appointment.doctor; 
      case 2:
        return appointment.date && appointment.time;
      case 3:
        return true;
      default:
        return false;
    }
  }

  
  switch (stepper) {
    case 1:
      return appointment.session
    case 2:
      return appointment.date && appointment.time;
    case 3:
      return appointment.doctor;
    case 4:
      return false;
    default:
      return false;
  }
};

const handleFollowUpTime=async()=>{
  try{

    const result=await followUpTimeApi({date:appointment.date,id:appointment.doctor.id})
    setFollowTime(result.data)
  }catch(err){
    alert(err)
  }
}


const handleNext=()=>{
  if(!isValid()){
    alert("Please choose an option")
    return
  }
  setStepper(stepper+1)
}

const handleClose=()=>{
  
  setStepper(1)
  setAppointment({
    date:"",
    time:"",
    doctor:"",
    session:""
  })
}


const handleBooking=async()=>{

  
  try{
      const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  
      const result=await bookAppointmentApi(appointment,reqHeader)
    if(result.status==200){
     Swal.fire({
  title: "Appointment Booked",
  icon: "success",
  background: "rgb(38, 40, 40)",
  color: "#ffffff",
  iconColor: "#0dcaf0", 
  confirmButtonColor: "#0dcaf0"
});
setrefreshapo(prev=>!prev)
// manageWellness();
  }
    else if(result.status==500){
      Swal.fire({
  title: "Booking failed",
  icon: "error",
  background: "rgb(38, 40, 40)",
  color: "#ffffff",
  iconColor: "#be1900", 
  confirmButtonColor: "#0dcaf0"
});
    }
    handleClose();
  }catch(err){
        Swal.fire({
  title: err,
  icon: "error",
  background: "rgb(38, 40, 40)",
  color: "#ffffff",
  iconColor: "#be1900", 
  confirmButtonColor: "#0dcaf0"
});
  }
}

const handleDoclist=async()=>{
  console.log(`inside func ${appointment.date}`);
  
  const result= await chooseDoctorApi({date:appointment?.date,time:appointment?.time})
  
  setAvailableDocs(result?.data)
 }
console.log(`available docs ${availableDocs}`);

 const isMoreThanOne=()=>{
  const appointmentTime = dayjs(showappo?.date) 
  .hour(Number(showappo?.hour))
  .minute(Number(showappo?.minute))
  .second(0);

const now = dayjs();

const diffInMinutes = appointmentTime.diff(now, 'minute');

return diffInMinutes > 60;
 }

 const handleDelete = async () => {
  if (!isMoreThanOne()) return;

  const swalResult = await Swal.fire({
    title: "Are you sure you want to cancel the appointment?",
    background: "rgb(38, 40, 40)",
    color: "#ffffff",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#0dcaf0"
  });

  if (swalResult) {
    try{
       const tok=sessionStorage.getItem("Token")
const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  
    const result=await deleteAppointmentApi({date:showappo?.date,hour:showappo?.hour,minute:showappo?.minute},reqHeader)
      if(result.status==200){
        await Swal.fire({
      title: "Appointment Cancelled",
      icon: "success",
      background: "rgb(38, 40, 40)",
      color: "#ffffff",
      iconColor: "#0dcaf0",
      confirmButtonColor: "#0dcaf0"
    });
    setrefreshapo(prev=>!prev)
      }
      
    }catch(err){
      
        Swal.fire({
  title: "Failed to delete",
  icon: "error",
  background: "rgb(38, 40, 40)",
  color: "#ffffff",
  iconColor: "#be1900", 
  confirmButtonColor: "#0dcaf0"
});
      
    }
    
  }
};

useEffect(() => {
  if (
    appointment.session !== "Follow Up" ||
    !appointment.date ||
    !appointment.doctor
  ) return;

  handleFollowUpTime();
}, [appointment.date, appointment.doctor]);

 useEffect(()=>{
  const fetchFollowup=async()=>{
    const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  
    const result=await followUpApi(reqHeader)
    setFollowUp(result.data)
  }
  fetchFollowup()
 },[])
 
 useEffect(()=>{
  if(appointment.date && appointment.time){
    handleDoclist()
  }
 },[appointment.date,appointment.time])





useEffect(() => {
  if (!appointment.date || !appointment.time) return;

  setAppointment(prev => ({ ...prev, time: "" }));
}, [appointment.date]);


useEffect(()=>{
   const showAppointment=async()=>{
    const tok=sessionStorage.getItem("Token")
const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  
  const result=await appointmentShowApi(reqHeader)
  setShowAppo(result.data)
  setLoading(false);
  
   }
   showAppointment()
},[refreshapo])

const day = dayjs(showappo?.date).format("DD");     
const month = dayjs(showappo?.date).format("MMM");  
const weekday = dayjs(showappo?.date).format("dddd"); 
const formattedTime = dayjs()
  .hour(Number(showappo?.hour))
  .minute(Number(showappo?.minute))
  .format("hh:mm A");



  return (
    <div className='min-vh-100 w-100'>
       <div className=' row m-0'>
         <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <PatientSidebar/>
                </div>
            
        <div className="col-9 d-flex flex-column align-items-center" style={{backgroundColor:'rgb(31, 33, 33)'}}>
          <div className='d-flex w-100 flex-row justify-content-between p-2'>
            <h2 className='text-light'>My Appointments <FontAwesomeIcon className='ms-2 text-success' icon={faCalendarCheck} /></h2>
            <button  className='bg-info text-dark p-1 fw-bold rounded rounded-2'data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Book New Session <FontAwesomeIcon className='ms-1 fs-4 fw-medium text-warning' icon={faPlus} /></button>
          </div>
          <h3 className='text-light w-100 start-0 mt-3'>Upcoming Sessions</h3>
          {loading ? (
  <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "300px" }}>
    <div className="spinner-border text-info" role="status" />
  </div>
):showappo?
           <div className='container d-flex flex-column '>
             <div className='w-100 d-flex flex-row justify-content-between p-2'style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
                 
                 <div className='d-flex flex-column ms-2 p-1 rounded rounded-2 border' style={{backgroundColor:'rgb(38 40 40)'}}>
                   <p className='text-info mb-0 fs-5 fw-medium'>{month} {day}</p>
                   <p className='mt-0 mb-0' style={{color:'rgb(167 169 169 / 70%)'}}>{weekday}</p>
                   <p className='text-light mt-0 mb-0'>{formattedTime}</p>
                 </div>
                 <div className='d-flex flex-row gap-2'>
                <div className='d-flex align-items-center justify-content-center text-light h-25 p-2 rounded rounded-3' style={{backgroundColor:'rgb(167 169 169 / 70%)'}}>
                    Confirmed
                </div>
                
                 </div>
             </div>
             <div className='d-flex align-items-center flex-row justify-content-between p-2 w-100' style={{backgroundColor:'rgb(38 40 40)'}}>
              <div className='d-flex align-items-center flex-row gap-3'>
                <div className='bg-info d-flex align-items-center justify-content-center text-dark px-3 fs-2 rounded-circle  fw-medium'sty>
                    {showappo?.doctorId?.name?.split('')[0]}
                </div>
                <div className='d-flex flex-column'>
               <h4 className='text-light mb-1'>{`Dr.${showappo?.doctorId?.name}`}</h4>
               <p className='mb-1 mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>{showappo?.doctorId?.speciality}</p>
               <p className='p-1 mt-0 rounded rounded-2' style={{backgroundColor:'rgb(180 83 9 / 15%)',color:'rgb(167 169 169 / 70%)'}}>Council Session #9</p>
                </div>
              </div>
              <div className='d-flex flex-row h-25 gap-2 align-items-center'>
                <button type="button" class="btn btn-info">Join video Call</button>
                <button type="button" class="btn btn-outline-secondary">Message</button>
                <button onClick={()=>handleDelete()} type="button" class="btn btn-outline-danger">Cancel</button>

              </div>
             </div>

             <div className='d-flex p-2 flex-column' style={{backgroundColor:'rgb(21 128 61 / 15%)'}}>
              <p style={{color:'rgb(167 169 169 / 70%)'}}> <FontAwesomeIcon className='me-1 text-danger' icon={faBullseye} />Bring your practise session results</p>
            <p style={{color:'rgb(167 169 169 / 70%)'}}> <GiMeditation className='me-1 test-light' /> Ease your mind before the session </p>
             
             </div>
          </div>:
          <div className='d-flex flex-column align-items-center'>
            <img src={img} className='img-fluid ' style={{width:'350px',height:'350px'}} alt="" />
            <p className='text-light fs-1 fw-semibold'>Ooops!No active appointments</p>
            </div>}
         
          <h3 className='text-light w-100 start-0 mt-3'> Session History</h3>
          <div className='container d-flex flex-coulmn'>
            <div className='w-100 d-flex flex-column border rounded rounded-2'  style={{backgroundColor:'rgb(38 40 40)'}}>
               <div className='d-flex flex-row align-items-center p-2 justify-content-between'>
                  <h3 className='text-light'>Council Session#8</h3>
                  <p style={{color:'rgb(167 169 169 / 70%)'}}>Sep 8,2025</p>
               </div>
              <p className='ms-2' style={{color:'rgb(167 169 169 / 70%)'}}>Discussed anxiety triggers and practiced grounding techniques</p>
              <p className='ms-2 ' style={{color:'rgb(167 169 169 / 70%)'}}>Session rating:
              <FontAwesomeIcon className='text-warning ms-1' icon={faStar} />
              <FontAwesomeIcon className='text-warning' icon={faStar} />
              <FontAwesomeIcon className='text-warning' icon={faStar} />
              <FontAwesomeIcon className='text-warning' icon={faStar} />
              <FontAwesomeIcon className='text-warning' icon={faStar} /></p>
            </div>
          </div>
        </div>
       </div>


       {/* Modal */}
     <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg custom-modal " >
    <div class="modal-content " style={{backgroundColor:'rgb(38, 40, 40)'}}>
      <div class="modal-header " style={{borderBottom:'none'}}>
        <h1 class="modal-title fs-3 text-center text-light w-100" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div className='w-100 d-flex flex-row justify-content-evenly align-items-center'>
         
            <div className={stepper>0?'p-1 border border-3 border-info rounded-circle ':''}>
               <div className='text-light bg-info px-2 py-0 rounded-circle'>
                 1
               </div>
            </div>
           
         
           <hr className={stepper>1?'border-2 border w-25 border-info':'border-2 border w-25 border-light'} />
          <div className={stepper>1?'p-1 border border-3 border-info rounded-circle':''}>
             <div className='text-light  bg-info px-2 py-0 rounded-circle'>
               2
             </div>
          </div>
           <hr className={stepper>2?'border-2 border w-25 border-info':'border-2 border w-25 border-light'}/>
           <div className={stepper>2?'p-1 border border-3 border-info rounded-circle':''}>
             <div className='text-light  bg-info px-2 py-0 rounded-circle'>
               3
             </div>
           </div>
           <hr className={stepper>3?'border-2 border w-25 border-info':'border-2 border w-25 border-light'}/>
           <div className={stepper==4?'p-1 border border-3 border-info rounded-circle':''}>
             <div className='text-light  bg-info px-2 py-0 rounded-circle'>
               4
             </div>
           </div>
           
         </div>
         <div className='w-100 d-flex justify-content-between flex-row'>
         <p className='text-light '>Session type</p>
         <p className='text-light'>Date and time</p>
         <p className='text-light'>Doctors</p>
          <p className='text-light'>Confirmation</p>
         </div>
        
        <div className='w-100 mt-4 d-flex justify-content-between flex-column ' style={{height:'450px'}}>

         {renderContent()}
         
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" onClick={()=>handleClose()} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       {stepper==1?'': <button type="button" class="btn btn-primary" onClick={()=>setStepper(stepper-1)}>Prev</button>}
       
       <button disabled={!isValid()} type="button" class="btn btn-primary" onClick={()=>handleNext()}>Next</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default PatientAppointments