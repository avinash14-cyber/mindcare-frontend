import React from 'react'
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Box from '@mui/material/Box';
import { isExpired } from '../../utils/isValidUtil';

 
const FollowDate = ({date,time,onDateChange,onTimeChange,followslot}) => {
 
  return (
   <>
   
   <h3 className='text-light text-center w-100'>Select your Slot</h3>
        <div className='d-flex w-100 flex-row'>
           <div>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
         <Box  sx={{
              mt:4,
              transform: 'scale(0.9)',      // adjust size (0.8 = 80%)
              transformOrigin: 'top left',  // or 'center' if you want it centered
              display: 'inline-block',      // ensures scaling applies neatly
            }}> <StaticDatePicker orientation="landscape"
            onChange={(data)=>{
              if(!data) return;
            onDateChange(data.format("YYYY-MM-DD"));
            
            }}
            disablePast
  minDate={dayjs()}
  maxDate={dayjs().add(7, "day")} /></Box>
        </LocalizationProvider>
           </div>
      <div className='row w-50  h-75  mt-5 p-4 gap-2'>
      
       {followslot.map(item=>{
         const expired=isExpired(item,date)
         const selected =
  time?.hour === item.hour &&
  time?.minute === item.minute;

       return (
         <div key={item.label}  className={`col-3 rounded-3 border-2 border p-1 fw-medium text-center
    ${
      expired
        ? "disabled bg-dark text-secondary"
        : selected
        ? "bg-info text-dark border-info"
        : "bg-dark text-light"
    }
  `} onClick={()=>{
          if (expired) return ;
          
          onTimeChange({label:item.label,hour:item.hour,minute:item.minute}
           
          );
           
         }}style={{height:'60px',cursor:'pointer'}}>{item.label} </div>
       )
       }
      
       )}
  
      </div>
        </div>
   </>
  )
}

export default FollowDate