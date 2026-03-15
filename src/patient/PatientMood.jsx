import React, { useEffect, useState } from 'react'
import PatientSidebar from './PatientSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFaceSmileBeam, faHeart, faS } from '@fortawesome/free-solid-svg-icons'
import { BsEmojiFrownFill } from "react-icons/bs";
import { HiEmojiSad } from "react-icons/hi";
import { BsFillEmojiTearFill } from "react-icons/bs";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { getWellnessApi, handleMoodDetailsApi, hanldeRecentEntriesApi } from '../services/allApi';
import { ToastContainer,toast } from 'react-toastify'
import PatientGraph from '../components/PatientGraph';





const PatientMood = () => {

  const[moodData,setmoodData]=useState([])
  const[wellness,setWellness]=useState(null)
  const [emo,setEmo]=useState({
    emotion:"",
    influence:[],
    comments:""
  })

  const handleDetailedEmotion=async()=>{

  const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  

      if(emo?.emotion=="" || emo?.influence.length==0){
        toast.warning("Please fill the required details")
        return;
      }
      else{
        try{

        const result=await handleMoodDetailsApi(emo,reqHeader)
        if(result.status==200||result.status==201){
          setEmo({
            emotion:"",
    influence:[],
    comments:""
          })
          setActive([])
          setCircle(0)
          toast.success("Mood updated successfully")
          handleRecentEntries()
          getWellness()
        }

      }
      catch(err){
        toast.error(err)
        
      }
      }
      
  }
 

  const Moods = [
  { id: 1, label: "Sad", icon: <BsEmojiFrownFill className="fs-2 text-warning" /> },
  { id: 2, label: "Stressed", icon: <HiEmojiSad className="fs-2 text-warning" /> },
  { id: 3, label: "Anxious", icon: <BsFillEmojiTearFill className="fs-4 text-warning" /> },
  { id: 4, label: "Happy", icon: <FontAwesomeIcon className="fs-4 text-warning" icon={faFaceSmileBeam} /> },
  { id: 5, label: "Calm", icon: <BsFillEmojiSmileFill className="fs-4 text-warning" /> },
  { id: 6, label: "Neutral", icon: <MdEmojiEmotions className="fs-4 text-warning" /> },
];
const moodIconMap = Moods.reduce((acc, mood) => {
  acc[mood.label] = mood.icon
  return acc
}, {})


const handleRecentEntries=async()=>{
  const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }  

     const result = await hanldeRecentEntriesApi(reqHeader)
     setmoodData(result?.data)
     
     
     
      
}

const getWellness=async()=>{
  const tok=sessionStorage.getItem("Token")
   const reqHeader={
        "Authorization":`Bearer ${tok}`
      }
      const result=await getWellnessApi(reqHeader)
      console.log(result);
      
      setWellness(result?.data?.wellness)
    }



useEffect(()=>{
handleRecentEntries()
getWellness()
},[])

  const[circle,setCircle]=useState(0)
  
  const[mood,setMood]=useState(null)
  const[active,setActive]=useState([])
  const moods = ["Work", "Relationships", "Health", "Sleep", "Exercise", "Weather"];
const selectitem=(items)=>{
  if(active.includes(items)){
      setActive(active.filter(val=>val!=items))
      setEmo(prev => ({
      ...prev,
      influence: prev.influence.filter(val => val !== items)
    }));
  }
  else{
    setActive([...active,items])
    setEmo(prev => ({
      ...prev,
      influence: [...prev.influence, items]
    }));
  }
}
  return (
    <div className='w-100 overflow-hidden min-vh-100'>
   <div className='row m-0'>
     <div className='col-3 d-none d-md-flex align-items-center flex-column' style={{backgroundColor:'rgb(38, 40, 40)',minHeight:'729px'}}>
                   <PatientSidebar/>
                </div>
            
     <div className='col-md-9 pb-3 col-12' style={{backgroundColor:'rgb(31, 33, 33)'}}>
       <div className='mt-3 align-items-center d-flex justify-content-between'>
      <FontAwesomeIcon type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" className='text-light d-md-none d-inline me-3 fs-3 mt-2' icon={faBars} />
                <h2 className='text-light'>Mood Tracker <FontAwesomeIcon className='ms-2 text-primary' icon={faHeart} /></h2>
       <p style={{color:'rgb(167 169 169 / 70%)'}}>How are you feeling today?</p>
       </div>
       <div className="mt-3 gap-5 d-flex flex-row justify-content-center row w-100">
          
          {/* spin wheel */}
          <div className='col-md-6 mx-auto col-10 d-flex align-items-center flex-column' style={{backgroundColor:'rgb(38 40 40)'}}>
            <h4 className='text-light'>Check In</h4>


            <div
  className="mt-3 wheel d-flex justify-content-between flex-column"
  style={{
    background:
      "linear-gradient(135deg,rgb(29 78 216 / 15%),rgb(21 128 61 / 15%))",
    height: "340px",
    width: "340px",
    borderRadius: "50%",
  }}
>
  {/* TOP ROW */}
  <div className="w-100 d-flex px-3 py-3 justify-content-around">
    {Moods.slice(0, 2).map((item) => (
      <div
        key={item.id}
        onClick={() => {
          setMood(item.icon);
          setCircle(item.id);
          setEmo(prev=>({...prev,emotion:item.label}))
        }}
        className="moodcircle d-flex align-items-center flex-column"
        style={{
          cursor: "pointer",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          backgroundColor: circle === item.id ? "aqua" : "rgb(38 40 40)",
        }}
      >
        {item.icon}
        <p className={circle === item.id ? "text-dark" : "text-light"}>
          {item.label}
        </p>
      </div>
    ))}
  </div>

  {/* MIDDLE ROW */}
  <div className="w-100 d-flex justify-content-between align-items-center px-2">

  {/* LEFT MOOD */}
  {Moods.slice(2, 3).map((item) => (
    <div
      key={item.id}
      onClick={() => {
        setMood(item.icon);
        setCircle(item.id);
         setEmo(prev=>({...prev,emotion:item.label}))
      }}
      className="moodcircle d-flex align-items-center flex-column"
      style={{
        cursor: "pointer",
        height: "60px",
        width: "60px",
        borderRadius: "50%",
        backgroundColor: circle === item.id ? "aqua" : "rgb(38 40 40)",
      }}
    >
      {item.icon}
      <p className={circle === item.id ? "text-dark" : "text-light"}>
        {item.label}
      </p>
    </div>
  ))}

  {/* CENTER MOOD (ALWAYS CENTERED) */}
  <div
    className="border border-3 d-flex justify-content-center align-items-center border-info"
    style={{
      height: "70px",
      width: "70px",
      borderRadius: "50%",
      backgroundColor: "rgb(38 40 40)",
    }}
  >
    {mood}
  </div>

  {/* RIGHT MOOD */}
  {Moods.slice(3, 4).map((item) => (
    <div
      key={item.id}
      onClick={() => {
        setMood(item.icon);
        setCircle(item.id);
         setEmo(prev=>({...prev,emotion:item.label}))
      }}
      className="moodcircle d-flex align-items-center flex-column"
      style={{
        cursor: "pointer",
        height: "60px",
        width: "60px",
        borderRadius: "50%",
        backgroundColor: circle === item.id ? "aqua" : "rgb(38 40 40)",
      }}
    >
      {item.icon}
      <p className={circle === item.id ? "text-dark" : "text-light"}>
        {item.label}
      </p>
    </div>
  ))}

</div>


  {/* BOTTOM ROW */}
  <div className="w-100 px-3 py-3 d-flex justify-content-around">
    {Moods.slice(4).map((item) => (
      <div
        key={item.id}
        onClick={() => {
          setMood(item.icon);
          setCircle(item.id);
           setEmo(prev=>({...prev,emotion:item.label}))
        }}
        className="moodcircle d-flex align-items-center flex-column"
        style={{
          cursor: "pointer",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          backgroundColor: circle === item.id ? "aqua" : "rgb(38 40 40)",
        }}
      >
        {item.icon}
        <p className={circle === item.id ? "text-dark" : "text-light"}>
          {item.label}
        </p>
      </div>
    ))}
  </div>
</div>


                  {/* mood influencers */}
            <div className='d-flex  mt-4 w-100 flex-column justify-content-start'>
              <p className='text-light '>What's influencing your mood today?</p>
              <div className='w-100 flex-wrap d-flex flex-row gap-3'>
               {moods.map(items=>(
                 <div onClick={()=>{selectitem(items)}} key={items} className={active.includes(items)?"border rounded-4 rounded bg-info px-2 fw-medium text-dark":'border px-2 fw-medium depend rounded rounded-4  '}style={{cursor:'pointer'}}>
                  {items}
                </div>
               ))}
             
              </div>
              <p className='text-light mt-3'>Notes(optional)</p>
                <textarea value={emo.comments} onChange={(e)=>{setEmo(prev=>({...prev,comments:e.target.value})) }} class="form-control bg-transparent text-light " placeholder="How are you feeling today?"  id="floatingTextarea2" rows={3}></textarea>
                <button type="button" onClick={()=>handleDetailedEmotion()} class="btn btn-info mt-3 mb-3 fw-medium">Save Mood Entry<IoSparkles className='fs-4 text-warning ms-2' />
</button>
              </div>
           
          </div>

          <div className='col-md-5 mb-4 col-6 h-50 p-5' style={{backgroundColor:'rgb(38 40 40)'}}>
            <h2 className='text-center text-info'>Your progress</h2>
           <PatientGraph  score={wellness} />
          </div>
       </div>

       
   

   
       
     </div>
     
   </div>
  <div className="row">
  <div
    className="container d-flex flex-column"
    style={{ backgroundColor: "rgb(38 40 40)" }}
  >
    <h3 className="text-light text-center ms-3 mt-4 mb-4">
      Recent Entries
    </h3>

    {moodData?.map((mood, index) => (
      <div
        key={index}
        className="container mb-3 rounded-3 px-3 py-2"
        style={{ backgroundColor: "rgb(29 78 216 / 15%)" }}
      >
        <div className="d-flex align-items-center">

          {/* DATE / TIME */}
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: "120px" }}
          >
            <p className="text-light mb-0 fs-5">Today</p>
            <p
              className="mb-0"
              style={{ color: "rgb(167 169 169 / 70%)" }}
            >
              9:00 AM
            </p>
          </div>

          {/* EMOTION */}
          <div
            className="d-flex align-items-center"
            style={{ width: "140px" }}
          >
            <div className="fs-4 me-2 text-warning">
  {moodIconMap[mood.emotion] || <MdEmojiEmotions />}
</div>
            <p className="text-info mb-0">{mood.emotion}</p>
          </div>

         
          <div style={{ width: "20px" }} />

        
          <div
            className="d-flex flex-wrap gap-2"
            style={{ maxWidth: "360px" }}
          >
            {mood.influencers.map((inf, i) => (
              <div
                key={i}
                className="px-2 py-1 rounded-4 text-center"
                style={{
                  width: "110px", 
                  backgroundColor: "rgb(119 124 124 / 15%)",
                  color: "rgb(167 169 169 / 70%)",
                  fontSize: "0.9rem"
                }}
              >
                {inf}
              </div>
            ))}
          </div>

        </div>
      </div>
    ))}
  </div>
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

export default PatientMood