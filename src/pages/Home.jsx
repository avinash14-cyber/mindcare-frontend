import React from 'react'
import Header from '../components/Header'
import { faCamera, faChartSimple, faE, faFaceSmile, faGamepad, faLock, faM, faMedal, faRocket, faS, faStar, faTrophy, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PiSirenBold } from "react-icons/pi";
import { MdOutlineSos } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { faFacebookF, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';





const Home = () => {
  return (
    <>
    
    <div className='w-100 min-vh-100 position-relative overflow-hidden' style={{background:'linear-gradient(to bottom right,#1e2939,#203530,#242a30)'}}>
        <Header/>

        <div className='row w-100 mt-5 '>
          <div className="col-md-6  col-12 d-flex flex-column align-items-center justify-content-center">
            <div className='h-100 d-flex flex-column align-items-center justify-content-center w-75'>
                <h1 className='text-white  fw-bold ' style={{fontSize:'3rem'}}>Transform Your Mental <br /> Health <span style={{color:'rgb(50 184 198)'}}>Journey</span></h1>
                <p className='mt-4 px-3 text-light'>Join thousands who've discovered personalized mental healthcare with gamified progress tracking, AI insights, and 24/7 professional support.</p>
            
            <div className='w-100 d-flex px-3 mt-3 justify-content-start flex-row'>
<Link to={'/patientauth'}>
                  <button id='rocket' type="button" class="btn py-2 position-relative overflow-hidden px-4 fw-medium me-2"  style={{backgroundColor:'rgb(50 184 198)'}}>Start Your Journey <FontAwesomeIcon className='text-danger' icon={faRocket} /></button>
  
</Link>                
<Link to={'/doctorauth'}>
  <button id='doc' type="button" class="btn overflow-hidden position-relative ms-2 py-2 px-4 text-white border" style={{backgroundColor:'rgb(255 255 255 / 10%)'}}>Healthcare Provider <FontAwesomeIcon className='text-primary' icon={faUserDoctor} /></button>
  
</Link>            </div>
            <div className='w-75 d-flex justify-content-between mt-4'>
               <div className='w-25'>
              <p className='fs-4 fw-bold'style={{color:'rgb(50 184 198)'}}>10K+</p>
              <p style={{color:'rgb(167 169 169 / 70%)'}}>Happy Patients</p>
               </div> 

               <div className='w-25'>
                 <p className='fs-4 fw-bold' style={{color:'rgb(50 184 198)'}}>500+</p>
              <p style={{color:'rgb(167 169 169 / 70%)'}}>Licensed Therapists</p>
               </div>

               <div className='w-25'>
                 
                  <p className='fs-4 fw-bold'style={{color:'rgb(50 184 198)'}}>95%</p>
              <p style={{color:'rgb(167 169 169 / 70%)'}}>Success Rate</p>
               </div>
            </div>
            </div>
          </div>
          <div className="col-md-6  d-flex justify-content-center   col-12">
            <div className='w-75 h-100   position-relative'>
                <div id='feeling' className='d-flex py-md-3 py-1 px-md-4 px-1 rounded rounded-2 justify-content-center align-items-center position-absolute bg-light'style={{marginTop:'10%'}}>
                   <div  className=' fw-medium p-1 rounded'style={{backgroundColor:"rgb(29 78 216 / 15%)",color:'rgb(50 184 198)'}}><FontAwesomeIcon className='text-warning' icon={faFaceSmile} /> Feeling Better</div>
                </div>
                <div id='outer' className='border d-flex align-items-center justify-content-center border-3 border-warning rounded-circle position-absolute' style={{height:'150px',width:'150px',marginTop:'12%',marginLeft:'10%'}}>
                   <div id='inner' className='border border-4 border-warning rounded-circle position-absolute'style={{height:'100px',width:'100px'}}>

                   </div>
                </div>
                <div id='ripple' className='h-50 w-50  border position-absolute border-3 border-warning rounded rounded-circle' style={{left:'20%',top:'22%'}}>

                </div>
                <img src="/images/brain2.png" className=' img-fluid'style={{scale:'0.4'}} alt="" />
                <div id='day' className='d-flex bottom-0 py-md-3 py-1 px-md-3 px-1 rounded position-absolute align-items-center justify-content-center bg-light'style={{marginBottom:'20%',marginLeft:'15%'}}>
                    <div className='fw-medium 'style={{color:'rgb(50 184 198)'}}><FontAwesomeIcon className='text-warning' icon={faTrophy} />7-Day Streak</div>
                </div>
                <div id='well' className='d-flex bg-light position-absolute end-0 bottom-0 rounded flex-column align-items-center justify-content-center py-0 px-md-3 px-1' style={{marginBottom:'25%',marginRight:'21%'}}>
                    <p style={{color:'rgb(50 184 198)'}} className='fs-4 fw-medium mb-0'>78%</p>
                    <p style={{color:'gray'}}>Wellness</p>
                </div>
            </div>
          </div>
        </div>
    </div>


    {/* featuress */}
    <div className='w-100 m-0 min-vh-100 d-flex flex-column justify-content-center ' style={{backgroundColor:'rgb(38 40 40)'}}>
 <h2 className='text-white mx-auto mt-4 '>Why Choose Mindcare?</h2>
 <p className='text-center' style={{color:'rgb(167 169 169 / 70%) '}}>Experience the future of mental healthcare with experts insights and gamified wellness tracking</p>
 <div className='row mt-3 w-100 d-flex justify-content-center align-items-center mx-auto  gap-5'>
    <div  className="col-md-3 col-10 overflow-hidden triangle position-relative d-flex flex-column justify-content-evenly align-items-center rounded rounded-4" style={{height:'300px',backgroundColor:'rgb(255 255 255 / 10%)'}}>
    <FontAwesomeIcon className='fs-2 text-danger game'  icon={faGamepad} />
    <h3 className='text-white'>Gamified Wellness</h3>
    <p className='text-center' style={{color:'rgb(167 169 169 / 70%)'}}>Turn your mental health journey into an engaging experience with achievements, streaks, and progress tracking</p>

    <div className='container text-center p-1 rounded rounded-2' style={{backgroundColor:'rgb(29 78 216 / 15%)',color:'rgb(50 184 198)'}}><FontAwesomeIcon  className='text-warning me-1' icon={faMedal} />Achievement Unlocked</div>
    </div>
    <div className="col-md-3 col-10 overflow-hidden triangle position-relative d-flex flex-column justify-content-evenly align-items-center rounded rounded-4 " style={{height:'300px',backgroundColor:'rgb(255 255 255 / 10%)'}}>
     <FontAwesomeIcon className='fs-2 text-warning game' icon={faLock} />
    <h3 className='text-white'>Secure video Sessions</h3>
    <p className='text-center' style={{color:'rgb(167 169 169 / 70%)'}}>HIPAA-compliant video calls with screen sharing and session recording capabilities</p>

    <div className='container text-center p-1 rounded rounded-2' style={{backgroundColor:'rgb(29 78 216 / 15%)',color:'rgb(50 184 198)'}}><FontAwesomeIcon className='me-1 text-light' icon={faCamera} />HD Video</div>
    </div>
    
    <div className="col-md-3 col-10  overflow-hidden triangle position-relative d-flex flex-column justify-content-evenly align-items-center rounded rounded-4 " style={{height:'300px',backgroundColor:'rgb(255 255 255 / 10%)'}}>
   <FontAwesomeIcon className='fs-2 text-light game' icon={faChartSimple} />
    <h3 className='text-white'>Real-Time Analytics</h3>
    <p className='text-center' style={{color:'rgb(167 169 169 / 70%)'}}>Track your mood patterns, therapy progress, and wellness metrics with beautiful visualizations</p>

    <div className='container text-center p-1 rounded rounded-2' style={{backgroundColor:'rgb(29 78 216 / 15%)',color:'rgb(50 184 198)'}}><IoBarChartSharp className='me-2 text-success' />
Analyses live data</div></div>
    


    <div className="col-md-3 col-10 mb-4  overflow-hidden triangle position-relative d-flex flex-column justify-content-evenly align-items-center rounded rounded-4 " style={{height:'300px',backgroundColor:'rgb(255 255 255 / 10%)'}}>
   <MdOutlineSos className='text-danger fs-1 game'/>

    <h3 className='text-white'>Real-Time Analytics</h3>
    <p className='text-center' style={{color:'rgb(167 169 169 / 70%)'}}>
Track your mood patterns, therapy progress, and wellness metrics with beautiful visualizations</p>

    <div className='container text-center p-1 rounded rounded-2' style={{backgroundColor:'rgb(29 78 216 / 15%)',color:'rgb(50 184 198)'}}>
<PiSirenBold className='me-2 text-danger' />Help Available</div></div>
 </div>
    </div>


{/* testimonialss */}

    <div className='w-100  d-flex flex-column align-items-center justify-content-center   ' style={{backgroundColor:'rgb(53, 36, 30)'}}>
    <h2 className='text-light text-center  mt-3  '>Success Stories</h2>
    <p className='text-center' style={{color:'rgb(167 169 169 / 70%)'}}>See how MindCare has transformed lives</p>
   <div className='row w-100 d-flex flex-md-row justify-content-center align-items-center mb-5 mt-3 flex-column gap-4'>
    <div className="col-md-3   p-3 rounded rounded-3  col-10 d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:'rgb(255 255 255 / 10%)',minHeight:'200px'}}>
    <div className='w-100 mb-3 d-flex justify-content-start'>
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
    </div>
    <p className='text-light '><i>"The gamification features made therapy feel like a personal growth adventure. I've maintained my wellness streak for 3 months!"</i></p>
    <div className='d-flex flex-row w-100'>
      <div className='rounded-circle d-flex justify-content-center align-items-center' style={{width:'50px',height:'50px',backgroundColor:'rgb(112, 183, 197)'}}><FontAwesomeIcon className='text-dark fs-3' icon={faS} /></div>
      <div>
        <p className='text-light ms-2 mb-0 fw-bold'>Sarah J</p>
        <p className='mt-0 ms-2' style={{color:'rgb(167 169 169 / 70%)'}}>Patient</p>
      </div>
    </div>
    </div>

     <div className="col-md-3 p-3 rounded rounded-3  col-10 d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:'rgb(255 255 255 / 10%)',minHeight:'200px'}}>
    <div className='w-100 mb-3 d-flex justify-content-start text-wrap'><FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
    </div>
    <p className='text-light'><i>"The secure video sessions helped me lot to express my feelings in a safe and confidential way"</i></p>
    <div className='d-flex flex-row w-100'>
      <div className='rounded-circle d-flex justify-content-center align-items-center' style={{width:'50px',height:'50px',backgroundColor:'rgb(112, 183, 197)'}}><FontAwesomeIcon className='text-dark fs-3' icon={faM} /></div>
      <div>
        <p className='text-light ms-2 mb-0 fw-bold'>Michael b</p>
        <p className='mt-0 ms-2' style={{color:'rgb(167 169 169 / 70%)'}}>Patient</p>
      </div>
    </div>
    </div>
   
     <div className="col-md-3 p-3 rounded rounded-3  col-10 d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:'rgb(255 255 255 / 10%)',minHeight:'200px'}}>
    <div className='w-100 mb-3 d-flex justify-content-start'><FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
          <FontAwesomeIcon className='text-warning' icon={faStar} />
    </div>
    <p className='text-light'><i>"The real-time patient analytics dashboard has revolutionized how I provide care. I can intervene early and track progress accurately."</i></p>
    <div className='d-flex flex-row w-100'>
      <div className='rounded-circle d-flex justify-content-center align-items-center' style={{width:'50px',height:'50px',backgroundColor:'rgb(112, 183, 197)'}}><FontAwesomeIcon className='text-dark fs-3' icon={faE} /></div>
      <div>
        <p className='text-light ms-2 mb-0 fw-bold'>Dr.Emily C</p>
        <p className='mt-0 ms-2' style={{color:'rgb(167 169 169 / 70%)'}}>Clinical Psychologist</p>
      </div>
    </div>
    </div>

   </div>
    </div>



{/* Footer */}
<div className=' d-flex flex-column   align-items-center w-100 'style={{backgroundColor:'rgb(18, 27, 37)',height:'fit-content'}}>
<div className='container  bg-danger  mt-5 rounded' >
<p className='text-light fs-4 my-auto text-center'> In crisis? Call 1-800-273-8255 or TEXT HOME to 741741</p>

</div>
<div className="row mt-4 d-flex justify-content-center  gap-3 mt-3 p-2 w-100">
  <div className="col-md-2 col-8 d-flex flex-row  ">
    <LuBrain className='text-light fs-1' />
    <p className='text-light fs-3 fw-medium'>MindCare</p>

  </div>

  <div className="col-md-2 col-8">
    <h5 className='text-light'>Services</h5>

    <p className='text-light mt-4'>Therapy</p>
    <p className='text-light'>Psychiatry</p>
    <p  className='text-light'>Support groups</p>
    <p  className='text-light'>Self-Help Tools</p>
  </div>

  <div className="col-md-2 col-8">
    <h5 className='text-light'>Resources</h5>

    <p className='text-light mt-4'>Blog</p>
    <p className='text-light'>Webinars</p>
    <p  className='text-light'>Guides</p>
    <p  className='text-light'>FAQ</p>
  </div>
  <div className="col-md-3 col-8">
    <h5 className='text-light'>Contact</h5>
    <div className='w-100 mt-4 d-flex flex-md-row flex-column justify-content-between '>
      <p className=' text-light'>Info@mindcare.com <br />(123) 456-7390</p>
      <p className='text-light'>Subscribe to <br /> our newsletter</p>
    </div>
     <div className='w-100 d-flex flex-row justify-content-evenly'>
       <input type="email" class="form-control w-75" id="exampleFormControlInput1" placeholder="name@example.com"></input>
       <button type="button" class="btn btn-dark p-2">Dark</button>
     </div>
  </div>
</div>

<hr className='border border-light border-3 container' />
<div className='w-25  mx-auto mt-2 justify-content-center'>
  <div className='w-100 d-flex flex-row justify-content-center gap-3 '>
   <FontAwesomeIcon className='text-light fs-4' icon={faFacebookF} />
   <FontAwesomeIcon className='text-light fs-4' icon={faXTwitter} />
   <FontAwesomeIcon className='text-light fs-4' icon={faInstagram} />
   <FontAwesomeIcon className='text-light fs-4' icon={faLinkedin} />
  </div>

  <p className='text-light text-center mt-3'>&copy;2025 MindCare</p>
  <div className=' px-4 w-100 mb-2 d-flex flex-md-row flex-column align-items-center justify-content-between'>
  <p className='text-light mb-2'>Privacy Policy</p>
  <p className='text-light '>Terms of Service</p>
  </div>
</div>

</div>

    </>
  )
  
}

export default Home