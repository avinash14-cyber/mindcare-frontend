import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import PatientDashboard from '../patient/PatientDashboard'
import PatientMood from '../patient/PatientMood'
import PatientAppointments from '../patient/PatientAppointments'
import PatientMessage from '../patient/PatientMessage'
import Doctorportal from '../doctor/Doctorportal'
import DoctorPatients from '../doctor/DoctorPatients'
import DoctorSchedule from '../doctor/DoctorSchedule'
import DoctorMessage from '../doctor/DoctorMessage'
import PatientAchievments from '../patient/PatientAchievments'
import PatientAuth from '../patient/PatientAuth'
import DoctorAuth from '../doctor/DoctorAuth'
import ProtectedRoute from './ProtectedRoute'
import LoginRoute from './LoginRoute'
import DocLoginRoute from './DocLoginRoute'
import DocProtected from './DocProtected'

const Allroutes = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/patient' element={<ProtectedRoute><PatientDashboard/></ProtectedRoute>}></Route>
    <Route path='/patientmood' element={<ProtectedRoute><PatientMood/></ProtectedRoute>}></Route>
    <Route path='/patientappointments' element={<ProtectedRoute><PatientAppointments/></ProtectedRoute>}></Route>
    <Route path='/patientmessage' element={<ProtectedRoute><PatientMessage/></ProtectedRoute>}></Route>
    <Route path='/doctorportal' element={<DocProtected><Doctorportal/></DocProtected>}></Route>
    <Route path='/doctorpatient' element={<DocProtected><DoctorPatients/></DocProtected>}></Route>
    <Route path='/doctorschedule' element={<DocProtected><DoctorSchedule/></DocProtected>}></Route>
    <Route path='/doctormessage' element={<DoctorMessage/>}></Route>
    <Route path='/patientachievments' element={<ProtectedRoute><PatientAchievments/></ProtectedRoute>}></Route>
    <Route path='/patientauth' element={<LoginRoute><PatientAuth/></LoginRoute>}></Route>
    <Route path='/doctorauth' element={<DocLoginRoute><DoctorAuth/></DocLoginRoute>}></Route>
    <Route path=''></Route>
   </Routes>
    
    </>
  )
}

export default Allroutes