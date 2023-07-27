import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PublicRoute({children}) {
  const navigate = useNavigate();
  useEffect(()=>{
   if(localStorage.getItem('token')){
    navigate('/home');
   }
  },[])
  return (
    <div className='register h-screen w-screen'>
        {children}
    </div>
  )
}

export default PublicRoute