import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import { faCalendarCheck, faChartSimple, faHeart, faHouse, faMedal, faMessage, faPerson, faRightFromBracket, faS } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoMdPeople } from "react-icons/io";
import { useContext } from 'react';
import { DoctorContext } from '../context/DocContext';


const DoctorSidebar = () => {
    const [active, setActive] = useState(null);
    const{doc,setDoc}=useContext(DoctorContext)
     const navigate = useNavigate();
     const location=useLocation()
     
    const menuItems = [
    { id: 1, label: "Dashboard", icon: faHouse, iconClass: "text-primary ms-2 me-1",path:'/doctorportal' },
    { id: 2, label: "Patients", icon:faPerson , iconClass: "text-light ms-2 me-1",path:'/doctorpatient' },
    { id: 3, label: "Messages", icon:faChartSimple, iconClass: "text-warning ms-2 me-1",path:'/doctormessage' },
    { id: 4, label: "Schedule", icon:faCalendarCheck, iconClass: "text-primary ms-2 me-1",path:'/doctorschedule' },
    
    { id: 6, label: "Logout", icon: faRightFromBracket, iconClass: "text-danger ms-2 me-1",path:'/' },
  ];
useEffect(()=>{
  const option=menuItems.find(items=>items.path==location.pathname)
  if(option){
    setActive(option.id)
  }
},[location.pathname])


const handleLogout=()=>{
  setDoc(null)
  sessionStorage.removeItem("DOC")
  sessionStorage.removeItem("DOCTOK")
  navigate('/',{replace:true})
}


  return (
    <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
    <div className='w-100 d-flex flex-column align-items-center'>
         <div className='w-100 d-flex flex-row justify-content-center align-items-center'>
            <img src="public/images/brain.png" alt="" style={{width:'50px',height:'50px',objectFit:'contain'}} />
        <h4 className=' text-center'style={{color:'rgb(52,186,200)',fontFamily:"Work Sans , sans-serif;"}}>  Mindcare</h4>
         </div>
         <p className='mt-0' style={{color:'rgb(167 169 169 / 70%)'}}>Clinical Psychologist</p>
         <div className='w-75 p-3 rounded rounded-3 d-flex flex-row ' style={{backgroundColor:'rgb(29 78 216 / 15%)'}}>
        <div className='fw-medium rounded-circle d-flex justify-content-center align-items-center' style={{width:'50px',height:'50px',backgroundColor:'rgb(112, 183, 197)'}}>EC</div>
        <p className='text-light fs-5 ms-3 fw-medium'>{`Dr ${doc.name}`}</p>
         </div>
         <hr className='border w-75' />
    </div>
    
    <div  className='mt-3 w-100 d-flex align-items-start gap-3 flex-column'>
        {
            menuItems.map(items=>(
                <div key={items.id} className={items.label=="Logout"?'position-relative dash  rounded rounded-3 overflow-hidden  py-3 w-75 logout fw-medium ms-5  fs-5':'position-relative dash  rounded rounded-3 overflow-hidden  py-3 w-75  fw-medium ms-5  fs-5'} style={{cursor:'pointer',backgroundColor:items.id==active?"rgb(52,186,200)":"",color:items.id==active?"black":""}} onClick={()=>{setActive(items.id);if (items.path && items.label!="Logout") {
    navigate(items.path);
    
  };
 items.label=="Logout"?handleLogout():""}}><FontAwesomeIcon icon={items.icon} className={items.iconClass} />{items.label}</div >
            ))
        }
       

    </div>
    </div>
  )
}

export default DoctorSidebar