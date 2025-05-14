import React from 'react'
import { useState } from 'react'
import {  toast } from 'react-toastify';
import axios from 'axios'
import { Audio } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';






function CreateAccount() {

  const [Name , setName] = useState("")
  const [Email , setEmail] = useState("")
  const [Password , setPassword] = useState("")
  const [ConfPassword , setConfPassword] = useState("")
  const [LoaderState , setLoaderState] = useState(false)
  const Navigation = useNavigate()

  console.log();
  

  const Submit=()=>{
    
    if(!Name || !Email || !Password || !ConfPassword ){
      toast.warn("Please Enter All Fields")
    }else if(Password !== ConfPassword){
      toast.warn("Conform Password Dont't Match")
    }else{
      setLoaderState(true)
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/CreateAccount`,{Name,Email,Password})
      .then((res)=>{ 
        toast.success("Register Successful")
        setLoaderState(false)
        setName("")
        setEmail("")
        setPassword("")
        setConfPassword("")
      })
      .catch((error)=>{
        setLoaderState(false)
        toast.warn("Email Already Exists")
        console.log("error at", error);
      })
    }
  }

  const back=()=>{
    Navigation("/")
  }


  return (
    <div className='w-[100%] min-h-screen bg-[#FFF100]'>
        <div>
            <div className='font-Afacad text-4xl text-center border-b border-black pb-4 pt-4 shadow-xl font-semibold '>Create Account</div>
            <div className='pt-2 pl-4'><button className='bg-black text-white  p-3 px-4 rounded-lg flex gap-2' onClick={back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><path fill="#fff" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>Back</button></div>
            {!LoaderState && (<div className=' w-[100%] h-[450px] flex flex-col items-center justify-center gap-5 md:h-[600px]'>
                <input type="text" className='w-[80%] h-12 rounded-2xl bg-[#006BFF] font-Afacad p-4 md:w-[25%] text-white placeholder-white' placeholder='Enter Name ' value={Name}  onChange={(e)=>setName(e.target.value)}/>
                <input type="email" className='w-[80%] h-12 rounded-2xl bg-[#006BFF] font-Afacad p-4 md:w-[25%] text-white placeholder-white' placeholder='Enter Email ' value={Email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className='w-[80%] h-12 rounded-2xl bg-[#006BFF] font-Afacad p-4 md:w-[25%] text-white placeholder-white' placeholder='Enter Password ' value={Password} onChange={(e)=>setPassword(e.target.value)} />
                <input type="password" className='w-[80%] h-12 rounded-2xl bg-[#006BFF] font-Afacad p-4 md:w-[25%] text-white placeholder-white' placeholder='Enter Confirm Password ' value={ConfPassword} onChange={(e)=>setConfPassword(e.target.value)} />
                <button className='bg-black text-white p-2 rounded-md font-Afacad px-7' onClick={Submit}>Create</button>
                
            </div>)}
                    {LoaderState && (<div className=' w-[100%] h-[450px] flex flex-col items-center justify-center gap-5 md:h-[600px]'>
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
                    </div>)}
        </div>
    </div>
  )
}

export default CreateAccount