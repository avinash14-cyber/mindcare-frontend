import React, { useContext, useState } from 'react'
import { LuBrain } from 'react-icons/lu'
import { replace, useNavigate } from 'react-router-dom';
import { handleLoginApi, handleRegisterApi } from '../services/allApi';
import { ToastContainer,toast } from 'react-toastify'
import  { PatientContext } from '../context/UserContext';

const PatientAuth = () => {
    const [login,setLogin]=useState(true)
    const [loginData, setLoginData] = useState({
  email: "",
  password: ""
});

    const {patient,setPatient}=useContext(PatientContext)

    const [regData,setregData]=useState({
      name:"",
      email:"",
      age:"",
      password:"",
      contact:"",
      emergency:""

    })
      const navigate = useNavigate();


    const handleLogin=async()=>{
      const{email,password}=loginData

      if(email && password){

        const result = await handleLoginApi(loginData)
        console.log(result.data);
        
        
        if(result.status==200){
          toast.success('login successfull')
          sessionStorage.setItem("pat",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("Token",result.data.token)
          setPatient(result.data.existingUser)
          setTimeout(()=>{
             navigate('/patient',{replace:true})
          },2000)
          
          
          
        }
        else if (result.status==401){
          toast.error(result.response.data)
        }
        else if(result.status==404){
          toast.warning(result.response.data)
        }
        else if(result.status==500){
          toast.error(result.response.data)
        }
      }
      else{
        toast.warning('Please enter details')
      }
    }

     


      const handleRegister=async()=>{
         const {name,email,password,contact,emergency,age}=regData

         

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[0-9]{10}$/

         if (!name || !email || !password || !contact || !emergency || !age) {
    return toast.warning("Please fill the form")
  }

   if (!emailRegex.test(email.trim())) {
    return toast.warning("Invalid email format")
  }

  
  if (!phoneRegex.test(contact)) {
    return toast.warning("Contact must be 10 digits")
  }

 
  if (!phoneRegex.test(emergency)) {
    return toast.warning("Emergency contact must be 10 digits")
  }

        

          const result= await handleRegisterApi(regData)
          if(result.status==200 || result.status===201){
            toast.success("Registration successful")
            setregData({
               name:"",
      email:"",
      age:"",
      password:"",
      contact:"",
      emergency:""

            })
            setLogin(!login)
          }
          else if(result.status==400){
          
            
            toast.warning(result.response.data)
             setregData({
               name:"",
      email:"",
      age:"",
      password:"",
      contact:"",
      emergency:""

            })
          }
          else if (result.status==500){
            toast.error(result.response.data)
             setregData({
               name:"",
      email:"",
      age:"",
      password:"",
      contact:"",
      emergency:""

            })
          }

         
         
          
      }
    
      
  return (
    <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center' style={{backgroundImage:"url('/images/generated-image.png')",backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}>
            

            {login?
            <div className='glasseffect d-flex justify-content-center flex-column align-items-center border border-secondary rounded-3 px-5 py-3'>
                <div className='d-flex flex-column align-items-center'>
                        <LuBrain className='text-info 'style={{fontSize:'5rem'}} />
                        <p className='text-light fw-medium mb-1 fs-3'>Mindcare</p>
                        <p className='text-light fw-medium fs-2 mt-0'>Patient login</p>
                </div>
                  <input value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})} type="email" class="form-control bg-secondary mb-3 " id="exampleFormControlInput1 " placeholder="Email"/>
                        <input value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})} type="password" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Password' aria-describedby="passwordHelpInline"/>
                        <button onClick={()=>handleLogin()} type="button" class="btn btn-info w-75 fw-medium fs-5 mb-2">Login</button>
                        <p className='text-light mb-1'>Are u a new user?</p>
                        <p style={{cursor:'pointer'}} className=' text-info' onClick={()=>setLogin(!login)}>Register</p>


            </div>: <div className='glasseffect d-flex justify-content-center flex-column align-items-center border border-secondary rounded-3 px-5 py-3'>
                <div className='d-flex flex-column align-items-center'>
                        <LuBrain className='text-info 'style={{fontSize:'5rem'}} />
                        <p className='text-light fw-medium fs-3'>Mindcare</p>
                </div>
                  <input type="text" value={regData.name} onChange={(e)=>setregData({...regData,name:e.target.value})} class="form-control bg-secondary mb-3 " id="exampleFormControlInput1 " placeholder="Name"/>
                        <input value={regData.email} onChange={(e)=>setregData({...regData,email:e.target.value})} type="email" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Email' aria-describedby="passwordHelpInline"/>
                          <input value={regData.age} onChange={(e)=>setregData({...regData,age:e.target.value})} type="text" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Age' aria-describedby="passwordHelpInline"/>
                        <input value={regData.password} onChange={(e)=>setregData({...regData,password:e.target.value})} type="text" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder=' Password' aria-describedby="passwordHelpInline"/>
                        <input value={regData.contact} onChange={(e)=>setregData({...regData,contact:e.target.value})} type="text" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Contact' aria-describedby="passwordHelpInline"/>
                        <input value={regData.emergency} onChange={(e)=>setregData({...regData,emergency:e.target.value})} type="text" id="inputPassword6" class="form-control bg-secondary mb-3" placeholder='Emergency Contact' aria-describedby="passwordHelpInline"/>
                        <button onClick={()=>handleRegister()} type="button" class="btn btn-info w-75 fw-medium fs-5 mb-2">Register</button>
                        <p className='text-light mb-1'>Already have an account?</p>
                        <p style={{cursor:'pointer'}} className=' text-info'onClick={()=>setLogin(!login)}>Login</p>


            </div>}
            

                <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
  )
}

export default PatientAuth