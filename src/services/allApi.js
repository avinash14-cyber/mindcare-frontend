import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";


// register api

export const handleRegisterApi=async(reqBody)=>{

    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

// login api

export const handleLoginApi=async(reqBody)=>{
    
    return await commonAPI("POST",`${serverURL}/login`,reqBody) 
}


// update mood

export const handleMoodApi=async(reqBody,reqHeader)=>{
    console.log('inside api');
    
    return await commonAPI("POST",`${serverURL}/mood_update`,reqBody,reqHeader)
}

// mood details

export const handleMoodDetailsApi=async(reqBody,reqHeader)=>{

        return await commonAPI("POST",`${serverURL}/mood_details`,reqBody,reqHeader)
}

// get mood details

export const hanldeRecentEntriesApi=async(reqHeader)=>{

    return await commonAPI("GET",`${serverURL}/get_mood_details`,"",reqHeader)
}

// upload doctor slots


export const handleDoctorSlotsApi=async(reqBody,reqHeader)=>{
    return await commonAPI("PATCH",`${serverURL}/update_slot`,reqBody,reqHeader)
}

// get doc schedules


export const handleDocScheduleApi=async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/get_update_slot`,"",reqHeader)
}

// doc delete time slot

export const handleDocDeleteTimeApi=async(reqBody,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/delete_slot`,reqBody,reqHeader)
}

// doc register details

export const handleDocRegisterApi=async(reqBody)=>{
    
    
     return await commonAPI("POST",`${serverURL}/doc_register`,reqBody)
}


// doc log api

export const handleDocLoginApi=async(reqBody)=>{

    return await commonAPI("POST",`${serverURL}/doc_login`,reqBody)
}

// choose doc api

export const chooseDoctorApi=async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/choose_doc`,reqBody)
}

// book appointment api

export const bookAppointmentApi=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/book_appoinment`,reqBody,reqHeader)
}