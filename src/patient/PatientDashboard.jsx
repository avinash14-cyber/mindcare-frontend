import React, { useContext, useEffect, useRef, useState } from 'react'
import PatientSidebar from './PatientSidebar'
import { MdOutlineWavingHand } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { AiFillFire } from "react-icons/ai";
import { GiMeditation } from "react-icons/gi";
import { faBars, faBed, faCircleXmark, faFaceSmileBeam, faS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer,toast } from 'react-toastify'
import { BsEmojiFrownFill } from "react-icons/bs";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { BsFillEmojiTearFill } from "react-icons/bs";
import { BsEmojiExpressionlessFill } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { PatientContext } from '../context/UserContext';
import {appointmentShowApi, breathingPointsApi, getLatestMoodApi, getWellnessApi, handleMoodApi} from '../services/allApi'
import { useNavigate } from 'react-router-dom';
import img from '../assets/no_appo.png'
import dayjs from "dayjs";
import { HiEmojiSad } from 'react-icons/hi';









const PatientDashboard = () => {
  
  
  const[quickcheck,setQuickcheck]=useState(false)
  const[guided,setGuided]=useState(false)
  const[wellness,setWellness]=useState(null)
  const[seconds,setSeconds]=useState(300)
  const[showappo,setShowAppo]=useState([])
  const[latestmood,setLatestMood]=useState(null)
  const[loader,setLoader]=useState(true)
  const timerRef = useRef(null);

 
  const navigate=useNavigate()   

  const {patient,setPatient}=useContext(PatientContext)

  const getWellness=async()=>{
    const tok=sessionStorage.getItem("Token")
     const reqHeader={
          "Authorization":`Bearer ${tok}`
        }
        const result=await getWellnessApi(reqHeader)
        console.log(result);
        
        setWellness(result?.data?.wellness)
      }
  
  const moodEmojis = {
    Sad: <BsEmojiFrownFill className="fs-4 text-warning" />,
    Stressed: <HiEmojiSad className="fs-2 text-warning" />,
    Anxious: <BsFillEmojiTearFill className="fs-4 text-warning" />,
    Happy: <FontAwesomeIcon className="fs-4 text-warning" icon={faFaceSmileBeam} />,
    Calm: <BsFillEmojiSmileFill className="fs-4 text-warning" />,
    Neutral: <MdEmojiEmotions className="fs-4 text-warning" />
  };
      
const getlatestMood=async()=>{
  const tok=sessionStorage.getItem("Token")
    const reqHeader={
        "Authorization":`Bearer ${tok}`}
      const result=await getLatestMoodApi(reqHeader)
      setLatestMood(result?.data)
}  
  
  useEffect(()=>{
  getlatestMood()
  getWellness()
  },[])

  const handleEmotion=async(label)=>{
   
     const tok=sessionStorage.getItem("Token")
      
      const payload={
        
        emotion:label
      }

      const reqHeader={
        "Authorization":`Bearer ${tok}`
      }

     try{
       const result=await handleMoodApi(payload,reqHeader)

      if(result){
        if(result.status==200 || result.status==201){
          console.log(result);
          toast.success("Mood updated successfully")
          
        }
        else if(result.status==500){
          toast.error("Something went wrong")
          
        }
      }
     }
     catch(err){
      toast.error(err)
      
     }
     
     
  }
  
  

  const emotionsList = [
  {
    id: 1,
    label: "Happy",
    icon: <FontAwesomeIcon className="fs-4 text-warning" icon={faFaceSmileBeam} />
  },
  {
    id: 2,
    label: "Calm",
    icon: <BsFillEmojiSmileFill className="fs-4 text-warning" />
  },
  {
    id: 3,
    label: "Neutral",
    icon: <MdEmojiEmotions className="fs-4 text-warning" />
  },
  {
    id: 4,
    label: "Anxious",
    icon: <BsFillEmojiTearFill className="fs-4 text-warning" />
  },
  {
    id: 5,
    label: "Sad",
    icon: <BsEmojiFrownFill className="fs-4 text-warning" />
  },
  {
    id: 6,
    label: "Stressed",
    icon: <BsEmojiExpressionlessFill className="fs-4 text-warning" />
  }
];


const handleBreathingComplete = async () => {
  try {
    const token = sessionStorage.getItem("Token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

  const result=await breathingPointsApi(reqHeader)    

    
  } catch (err) {
    console.log(err);
  }
};

    const startTimer = () => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => {
      setSeconds((prev) =>     {  if (prev <= 1) {
        clearInterval(timerRef.current);
        timerRef.current = null;

        handleBreathingComplete(); 
        return 0;
      }
     return prev - 1;}
); // countdown
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

   const resetTimer = () => {
    stopTimer();
    setSeconds(300); 
  };

  const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};



useEffect(()=>{
   const showAppointment=async()=>{
    const tok=sessionStorage.getItem("Token")
const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  
  const result=await appointmentShowApi(reqHeader)
  setShowAppo(result.data)
  setLoader(false)
  sessionStorage.setItem("docid",result?.data?.doctorId?._id.toString())
   }
   showAppointment()
},[])

const day = dayjs(showappo?.date).format("DD");     
const month = dayjs(showappo?.date).format("MMM");  
const weekday = dayjs(showappo?.date).format("dddd"); 
const formattedTime = dayjs()
  .hour(Number(showappo?.hour))
  .minute(Number(showappo?.minute))
  .format("hh:mm A");
 const appointmentDateTime = dayjs(showappo?.date)
  .hour(Number(showappo?.hour))
  .minute(Number(showappo?.minute))
  .second(0);

const now = dayjs();

let totalHours = appointmentDateTime.diff(now, "hour");

if (totalHours < 0) totalHours = 0;

const diffInDays = Math.floor(totalHours / 24);
const diffInHours = totalHours % 24;
  return (
    <div className='w-100 min-vh-100'>
        <div className='row m-0 '>
            
                <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <PatientSidebar/>
                </div>
            
            <div className='col-md-9 col-12  min-vh-100 d-flex align-items-center justify-content-center flex-column' style={{backgroundColor:'rgb(31, 33, 33)'}}>
            {/* headerr */}
            <div className='d-flex flex justify-content-between w-100 flex-row p-3'>
              <FontAwesomeIcon type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" className='text-light d-md-none d-inline me-3 fs-3 mt-2' icon={faBars} />
               <div className='d-flex  flex-column '>
                <h2 className='' style={{color:'rgb(50 184 198)'}}>Welcome back, {patient.name}! <MdOutlineWavingHand />
</h2>
                <p className=''style={{color:'rgb(167 169 169 / 70%)'}}>You're doing amazing! Here's your wellness overview</p>
               </div>

               <div className='d-flex flex-md-row flex-column align-items-center'>
                 <div className='rounded-circle d-flex flex-column justify-content-center align-items-center mb-md-0 mb-2' style={{height:'80px',width:'80px',backgroundColor:'rgb(50 184 198)'}}>
                   <p className='text-light fs-md-4 fs-5 mb-0 fw-medium'>{wellness}</p>
                   <p className='text-light mt-0  '>WELLNESS </p>
                 </div>
                 <button type="button" onClick={()=>setQuickcheck(true)} class="btn ms-3 h-50 btn-info">Quick Check-in <HiSparkles className='fs-md-4 fs-5 text-warning' /></button>
               </div>
            </div>

            {/* body */}

            <div className="row d-flex flex-md-row flex-column align-items-center  justify-content-center gap-5 w-100 m-0">
              <div className="position-relative topline overflow-hidden col-md-3 col-8 border rounded rounded-3 d-flex flex-column bg-info"style={{background:'linear-gradient(to bottom right,#1e2939,#203530,#242a30)',minHeight:'260px'}}>
                <div className='d-flex justify-content-between p-3 align-items-center w-100 flex-rpw'>
                  <h4 className='fw-medium text-light'>Wellness Streak</h4>
                  <AiFillFire className='fs-4' style={{color:'orange'}} />


                </div>
                <h2 className=' text-center'style={{color:'rgb(50 184 198)'}}>12</h2>
                <p className='mt-0 text-center' style={{color:'rgb(167 169 169 / 70%)'}}>Days</p>
                <div className='  container position-relative p-1 rounded rounded-2'style={{backgroundColor:'gray'}}>
                   <div className='h-100 w-25 z-1 rounded rounded-2 position-absolute top-0 start-0' style={{backgroundColor:'rgb(50 184 198)'}}>
                    

                   </div>
                  
                </div>
                 <p className='text-center mt-3 mb-5' style={{color:'rgb(167 169 169 / 70%)'}}>8 more days for next milestone</p>
              </div>
              <div className="col-md-3  col-8 position-relative topline overflow-hidden border d-flex rounded rounded-3 flex-column "style={{background: 'linear-gradient(135deg,rgb(180 83 9 / 15%), rgb(185 28 28 / 15%))',minHeight:'260px'}}>
              <h4 className='text-light mt-2'>Today's Mood</h4>
              <div className='w-100 d-flex align-items-center mt-2 flex-column'>
                <div id='moodesh' className='border d-flex justify-content-center align-items-center border-3 rounded-circle border-info 'style={{width:'60px',height:'60px',boxShadow:'0px 0px 5px 1px white' }}>
                {moodEmojis[latestmood] || "No mood"}

                </div>
                <p className='text-info fs-6 mt-2'>{latestmood || 'No mood recorded'}</p>
                <div className='w-100 text-center'>
                  <button onClick={()=>navigate('/patientmood')} type="button" class="btn btn-outline-secondary  ">Update Mood</button>
                </div>
              </div>
              </div>
              <div className="col-md-3 col-8 position-relative topline overflow-hidden rounded rounded-3 border   d-flex flex-column"style={{background:'linear-gradient(135deg,rgb(107 33 168 / 15%),rgb(190 24 93 / 15%))',minHeight:'260px'}}>
             {loader? <div className="d-flex justify-content-center my-auto align-items-center h-100 w-100" >
    <div className="spinner-border text-info" role="status" />
  </div>:showappo?<><h4 className='text-light mt-2'>Next Session</h4>
              <div className='d-flex flex-row'>
               <p className='text-info text-center'><span className=' fw-medium'>{diffInDays}</span> <br /><span style={{color:'rgb(167 169 169 / 70%)'}}> Days</span></p>
              <p className='text-info ms-4 text-center'><span className=' fw-medium'>{diffInHours}</span> <br /><span style={{color:'rgb(167 169 169 / 70%)'}}> Hours</span></p>

              </div>
              <div className='d-flex flex-column w-100'>
                <p className='text-light fs-5 fw-medium'>{`Dr.${showappo?.doctorId?.name}`}</p>
                <p style={{color:'rgb(167 169 169 / 70%)'}}>{showappo.session}</p>
              </div>

              <div className='container text-light text-center p-2  rounded rounded-2'style={{backgroundColor:'rgb(21 128 61 / 15%)'}}>
              {month} {day},{formattedTime}
              </div></>:<div className='w-100 d-flex flex-column align-items-center h-100'>
                <img src={img} className='img-fluid object-fit-contain' style={{height:'200px',width:'200px'}} alt="" />
               <p className='text-light fs-6 fw-semibold'>Ooops!No active appointments</p>
             </div>}
             
             
              

              </div>
                
            </div>

            {/* wellness insights */}
            <div className='mt-5 mx-auto px-3 position-relative topline overflow-hidden border rounded rounded-3  py-2 flex-column'style={{background:'linear-gradient(135deg,rgb(194 65 12 / 15%),rgb(8 145 178 / 15%))',width:'95%'}}>
              <h4 className='text-light'>Wellness Insights</h4>
                <div className='maindash overflow-hidden position-relative mt-3 container p-2 rounded rounded-3 justify-content-evenly d-flex flex-row' style={{backgroundColor:'rgb(38 40 40)'}}>
                  <GiMeditation className='text-warning mt-2 fs-4 ' />

                  <div>
                    <p className='text-light'>Morning meditation Recommended</p>
                    <p style={{color:'rgb(167 169 169 / 70%)'}}>Your mood patterns suggest 5-minute morning sessions could boost your daily wellness score by 15%</p>
                  </div>
                  <button type="button" onClick={()=>setGuided(true)} className="btn mt-2 btn-info h-50 px-2 fw-medium">Try Now</button>
                </div>

                 <div className='maindash position-relative container mt-3 mb-3 p-2 rounded rounded-3 overflow-hidden justify-content-evenly d-flex flex-row' style={{backgroundColor:'rgb(38 40 40)'}}>
                  <FontAwesomeIcon className='text-info fs-4 mt-2' icon={faBed} />

                  <div className='w-75 me-5'>
                    <p className='text-light'>Sleep Pattern Correlation</p>
                    <p style={{color:'rgb(167 169 169 / 70%)'}}>Better sleep quality on Tuesday-Thursday correlates with improved mood stability</p>
                  </div>
                  
                </div>
            </div>

            </div>
        </div>

             {/* quick checkin */}
        <div className='row  d-flex justify-content-center gap-5   w-100'style={{backgroundColor:"rgb(31, 33, 33)"}}>
          {quickcheck? 
          <>
  <div className="d-flex flex-row justify-content-end">
    <IoIosCloseCircle
      onClick={() => setQuickcheck(false)}
      className="text-danger mt-2 fs-1"
    />
  </div>

  <h2 className="text-light text-center mt-2">
    Quick Mood Check <GoHeartFill className="text-primary" />
  </h2>

  <div className="row gap-4 pb-5 mt-3 justify-content-center">
    {emotionsList.map((item) => (
      <div onClick={()=>handleEmotion(item.label)} key={item.id} className="col-3">
        <div className="emotions px-5 d-flex flex-column rounded rounded-3 border align-items-center justify-content-center py-4">
          {item.icon}
          <p className="emotioncolor fw-medium mt-2">
            {item.label}
          </p>
        </div>
      </div>
    ))}
  </div>
</>
:""}
         
         
         {/* guided meditation */}
         
         {guided?
          <div className='col-12 mt-4 d-flex flex-column align-items-center'>

           <div className='d-flex w-100 justify-content-end'>  <FontAwesomeIcon onClick={()=>{setGuided(false);resetTimer()}} className='fs-2 text-danger  ' icon={faCircleXmark} /></div>

                <h1 className='text-light text-center fw-bold '><GiMeditation className='me-2 text-warning' /> Guided Meditation</h1>
               
  
           <div className='border mb-2 mt-5 breathe border-3 border-info' style={{height:'90px',width:'90px',borderRadius:'100%'}}>

              </div>
              <p className='text-light fs-4 fw-medium mb-0 mt-3'> 5-Minute Mindfulness</p>
              <p className='text-light mt-0'>Focus on your breath and let your mind relax</p>
              <h1 className='text-light'>{ seconds==0?"Task Completed":formatTime(seconds)}</h1>
             <div className='d-flex gap-3 mt-2 flex-row justify-content-evenly '>
                <button onClick={startTimer} type="button" class="btn btn-success">Start</button>
                <button onClick={resetTimer} type="button" class="btn btn-warning">Reset</button>
                <button onClick={stopTimer} type="button" class="btn btn-danger">Pause</button>
               
             </div>
          </div>:""}
           
        </div>

        {/* offcanvas */}

        <div class="offcanvas offcanvas-start"  style={{backgroundColor:'rgb(38, 40, 40)'}} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    
    <button type="button" class="btn-close " data-bs-dismiss="offcanvas"  aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
   <PatientSidebar/>
  </div>
</div>

<ToastContainer theme='colored' position='top-right' autoClose={2000}/>
    </div>
  )
}

export default PatientDashboard