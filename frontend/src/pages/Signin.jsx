import React, { useState } from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'

function Signin() {

  const Navigate = useNavigate()
  const [Email , setEmail] = useState("")
  const [Password , setPassword] = useState("")
  const [LoaderState , setLoaderState] = useState(false)

  const submit = ()=>{
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/SignIn`,{Email,Password},{ withCredentials: true }).then((res)=>{
      if(res.data.message === "Login Successful"){
        setLoaderState(true)
        Navigate('/AddProject')
      }
      
    })
    .catch((error)=>{
      console.log("error at ", error);
      if(error){
        toast.warn("Email or Password Wrong")
      }
    })
  }


  const back=()=>{
    Navigate("/")
  }

  return (
    <div className='w-[100%] min-h-screen bg-[#FFF100]'>
        <div className='overflow-hidden'>
            <div className='font-Afacad text-5xl text-center border-b border-black pb-4 pt-4 shadow-xl font-semibold'>Signin</div>
            <div className='pt-2 pl-4'><button className='bg-black text-white  p-3 px-4 rounded-lg flex gap-2' onClick={back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><path fill="#fff" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>Back</button></div>
            {!LoaderState && (<div className=' w-[100%] h-[450px] flex flex-col items-center justify-center gap-5 md:h-[600px]'>
                <input type="email" className='w-[80%] h-12 rounded-2xl bg-[#006BFF] md:w-[25%]  font-Afacad p-4 text-white placeholder-white' placeholder='Enter Email ' value={Email} onChange={(e)=>setEmail(e.target.value)}  />
                <input type="password" className='w-[80%] h-12 rounded-2xl bg-[#006BFF] md:w-[25%]  font-Afacad p-4 text-white placeholder-white' placeholder='Enter Password ' value={Password} onChange={(e)=>setPassword(e.target.value)}  />
                <button className='bg-black text-white p-2 rounded-md font-Afacad px-7' onClick={submit}>Login</button>
                <div><h1>Don't have an account ? <Link to='/CreateAccount' className='text-[#006BFF]'>Create Account</Link> </h1></div>
            </div>)}
            {LoaderState && (<div className=' flex flex-col gap-3 justify-center items-center pt-48'>
              <Audio
                height="180"
                width="180"
                radius="19"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
                visible={LoaderState}
                /> 
                <h1 className='font-Afacad text-2xl'>PLEASE WAIT !</h1>              
              </div>)}
        </div>
    </div>
  )
}

export default Signin
