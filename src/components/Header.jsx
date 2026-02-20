import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className='d-flex flex-row justify-content-between px-2 ' style={{backgroundColor:' #0f766e'}}>
       <div className='d-flex flex-row justify-content-around align-items-center' style={{width:'70px'}}>
            <img src="/images/brain.png" alt="" style={{width:'80px',height:'80px',objectFit:'contain'}} />
            <p className=' mt-3 fs-4 fw-bold' style={{color:'rgb(52,186,200)',fontFamily:"Work Sans , sans-serif;"}}>Mindcare</p>
       </div>
       <div className='mt-4 fw-medium d-none  hidden d-md-flex justify-content-around flex-row text-white end-0 align-items-center fs-4 h-100' style={{width:'450px'}}>
       <Link className='cursor-pointer text-light'> <p className='d-inline-block effect  position-relative'>About</p></Link>
       <Link className='cursor-pointer text-light' > <p className='d-inline-block effect position-relative' >Features</p></Link>
       <Link className='cursor-pointer text-light'> <p className='d-inline-block effect position-relative'>Testimonials</p></Link>
       <Link className='cursor-pointer text-light'> <p className='d-inline-block effect position-relative'>Contacts</p></Link>

       
       </div>
 <div className='d-md-none d-flex align-items-center'>
         <FontAwesomeIcon type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='text-white fs-3' icon={faBars} />
       </div>

       <div className="  h-50  offcanvas offcanvas-end"  style={{background:'linear-gradient(to bottom right,#1e2939,#203530,#242a30)',width:'40%'}} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body d-flex flex-column fs-4">
     <Link className='cursor-pointer text-light'> <p className='d-inline-block effect  position-relative'>About</p></Link>
       <Link className='cursor-pointer text-light' > <p className='d-inline-block effect position-relative' >Features</p></Link>
       <Link className='cursor-pointer text-light'> <p className='d-inline-block effect position-relative'>Testimonials</p></Link>
       <Link className='cursor-pointer text-light'> <p className='d-inline-block effect position-relative'>Contacts</p></Link>

  </div>
</div>
       
    </header>
    </>
  )
}

export default Header