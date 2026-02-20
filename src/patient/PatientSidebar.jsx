import { faCalendarCheck, faHeart, faHouse, faMedal, faMessage, faRightFromBracket, faS } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { PatientContext } from '../context/UserContext';

const PatientSidebar = () => {

      const {patient,setPatient}=useContext(PatientContext)
     const [active, setActive] = useState(null);
     const navigate = useNavigate();
     const location=useLocation()
     
    const menuItems = [
    { id: 1, label: "Dashboard", icon: faHouse, iconClass: "text-primary ms-2 me-1",path:'/patient' },
    { id: 2, label: "Mood Tracker", icon: faHeart, iconClass: "text-danger ms-2 me-1",path:'/patientmood' },
    { id: 3, label: "Achievements", icon: faMedal, iconClass: "text-warning ms-2 me-1",path:'/patientachievments' },
    { id: 4, label: "Appointments", icon: faCalendarCheck, iconClass: "text-light ms-2 me-1",path:'/patientappointments' },
    { id: 5, label: "Messages", icon: faMessage, iconClass: "text-info ms-2 me-1",path:'/patientmessage' },
    { id: 6, label: "Logout", icon: faRightFromBracket, iconClass: "text-danger ms-2 me-1",path:'/' },
  ];
useEffect(()=>{
  const option=menuItems.find(items=>items.path==location.pathname)
  if(option){
    setActive(option.id)
  }
},[location.pathname])

const handleLogout=()=>{
  
    setPatient(null)
    sessionStorage.removeItem("pat");
    sessionStorage.removeItem("Token")
     setTimeout(()=>{
      navigate("/",{replace:true})
     },0.2)
}
console.log(patient);

  return (

    <>
    <div className='w-100 d-flex flex-column align-items-center'>
         <div className='w-100 d-flex flex-row justify-content-center align-items-center'>
            <img src="public/images/brain.png" alt="" style={{width:'50px',height:'50px',objectFit:'contain'}} />
        <h4 className=' text-center'style={{color:'rgb(52,186,200)',fontFamily:"Work Sans , sans-serif;"}}>  Mindcare</h4>
         </div>
         <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>Patient Portal</p>
         <div className='w-75 p-3 rounded rounded-3 d-flex flex-row ' style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
        <div className=' rounded-circle d-flex justify-content-center align-items-center' style={{width:'50px',height:'50px',backgroundColor:'rgb(112, 183, 197)'}}><FontAwesomeIcon className='text-dark fs-6' icon={faS} /></div>
        <p className='text-light fs-5 ms-3 fw-medium'>{patient?.name}</p>
         </div>
         <hr className='border w-75' />
    </div>
    
    <div  className='mt-3 w-100 d-flex align-items-start gap-3 flex-column'>
        {
            menuItems.map(items=>(
                <div key={items.id} className={items.label=="Logout"?'position-relative dash  rounded rounded-3 overflow-hidden  py-3 w-75 logout fw-medium ms-5  fs-5':'position-relative dash  rounded rounded-3 overflow-hidden  py-3 w-75  fw-medium ms-5  fs-5'} style={{cursor:'pointer',backgroundColor:items.id==active?"rgb(52,186,200)":"",color:items.id==active?"black":""}} onClick={()=>{setActive(items.id);if (items.path && items.label!="Logout") {
    navigate(items.path);
      }
    items.label=="Logout"?handleLogout():""
    }}><FontAwesomeIcon icon={items.icon} className={items.iconClass} />{items.label}</div >
            ))
        }
       

    </div>
    </>
    
  )
}

export default PatientSidebar