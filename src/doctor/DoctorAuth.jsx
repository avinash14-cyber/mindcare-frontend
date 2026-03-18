import React, { useState } from 'react'
import { LuBrain } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { handleDocLoginApi, handleDocRegisterApi } from '../services/allApi';
import { useContext } from 'react';
import { DoctorContext } from '../context/DocContext';
import { ToastContainer,toast } from 'react-toastify'


const DoctorAuth = () => {
    const [login,setLogin]=useState(true)
      const navigate = useNavigate();
        const[docDetails,setdocDetails]=useState({
          name:"",
        license:"",
        password:"",
        speciality:"",
        exp:0
        })
const[doclog,setDoclog]=useState({
  license:"",
  password:""
})

const {doc,setDoc}=useContext(DoctorContext)
const handleRegister=async()=>{

 
  const { name, license, password, speciality, exp } = docDetails;
 
  if(name && license && password && speciality && exp){
    try{
        const result=await handleDocRegisterApi(docDetails)
        if(result.status==200){
          toast.success("Registration Successfull")
        
        setdocDetails({
          name:"",
        license:"",
        password:"",
        speciality:"",
        exp:0
        })
        setLogin(!login)
        }
        else{
          toast.error("Something went wrong")
          setdocDetails({
          name:"",
        license:"",
        password:"",
        speciality:"",
        exp:0
        })
        }
    }catch(err){
        console.log(result);
        
    }
  }
  else{
    alert("Fill the form")
    
  }
  
}


const handleLogin=async()=>{

    if(doclog.license && doclog.password){

      try{

        const result= await handleDocLoginApi(doclog)
        if(result.status==200){
          sessionStorage.setItem("DOC",JSON.stringify(result.data.docInfo))
          sessionStorage.setItem("DOCTOK",result.data.token)
          setDoc(result.data.docInfo)
          setDoclog({
  license:"",
  password:""
})

        }
        
      }catch(err){

        toast.error("Something went wrong")
        setDoclog({
  license:"",
  password:""
})
      }
    }
    else{
      alert("Please enter credentials")
    }
}

console.log(`this is doc ${doc}`);

  return (
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center' style={{backgroundImage:"url('/images/generated-image.png')",backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}>
                
    
                {login?
                <div className='glasseffect d-flex justify-content-center flex-column align-items-center border border-secondary rounded-3 px-5 py-3'>
                    <div className='d-flex flex-column align-items-center'>
                            <LuBrain className='text-info 'style={{fontSize:'5rem'}} />
                            <p className='text-light fw-medium fs-3'>Mindcare</p>
                             <p className='text-light fw-medium fs-2 mt-0'>Doctor login</p>
                    </div>
                      <input type="email" value={doclog.license} onChange={e=>setDoclog(prev=>({...prev,license:e.target.value}))} class="form-control bg-secondary mb-3 " id="exampleFormControlInput1 " placeholder="Medical License number"/>
                            <input type="password" value={doclog.password} onChange={e=>setDoclog(prev=>({...prev,password:e.target.value}))} id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Password' aria-describedby="passwordHelpInline"/>
                            <button onClick={()=>handleLogin()} type="button" class="btn btn-info w-75 fw-medium fs-5 mb-2">Login</button>
                            <p className='text-light mb-1'>Are u a new user?</p>
                            <p style={{cursor:'pointer'}} className=' text-info' onClick={()=>setLogin(!login)}>Register</p>
    
    
                </div>: <div className='glasseffect d-flex justify-content-center flex-column align-items-center border border-secondary rounded-3 px-5 py-3'>
                    <div className='d-flex flex-column align-items-center'>
                            <LuBrain className='text-info 'style={{fontSize:'5rem'}} />
                            <p className='text-light fw-medium fs-3'>Mindcare</p>
                    </div>
                      <input value={docDetails.name} onChange={(e)=>setdocDetails(prev=>({...prev,name:e.target.value}))} type="text" class="form-control bg-secondary mb-3 " id="exampleFormControlInput1 " placeholder="Full name"/>
                            <input value={docDetails.license} onChange={(e)=>setdocDetails(prev=>({...prev,license:e.target.value}))} type="text" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Medical license number' aria-describedby="passwordHelpInline"/>
                            <input value={docDetails.password} onChange={(e)=>setdocDetails(prev=>({...prev,password:e.target.value}))} type="password" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Password' aria-describedby="passwordHelpInline"/>
                            <select value={docDetails.speciality} onChange={(e)=>setdocDetails(prev=>({...prev,speciality:e.target.value}))} class="form-select bg-secondary mb-3" aria-label="Default select example">
  <option value=""disabled hidden>Speciality</option>
  <option className='bg-light' value="Clinical Psychologist">Clinical Psychologist</option>
  <option className='bg-light' value="Psychiatrist">Psychiatrist</option>

</select>
                            <input type="number"  value={docDetails.exp} onChange={(e)=>setdocDetails(prev=>({...prev,exp:e.target.value}))} id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Years of Eperience' aria-describedby="passwordHelpInline"/>
                            <button type="button" class="btn btn-info w-75 fw-medium fs-5 mb-2"onClick={()=>handleRegister()}>Register</button>
                            <p className='text-light mb-1'>Already have an account?</p>
                            <p style={{cursor:'pointer'}} className=' text-info'onClick={()=>setLogin(!login)}>Login</p>
    
    
                </div>}
                
     <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
                
        </div>
  )
}

export default DoctorAuth