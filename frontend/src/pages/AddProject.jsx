import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom'

function AddProject() {

    const Navigation =  useNavigate()
   const [Tittle,setTittle] = useState("")
   const [Description,setDescription] = useState("")
   const [Email,setEmail] = useState("")



   useEffect(()=>{
  
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/GetVerify`, { withCredentials: true })
      .then((res)=>{
          setEmail(res.data.data.email);
      })
      .catch((error)=>{
          console.log("error" ,error);
          Navigation("/Signin")
      })
          
  },[Navigation])

   const AddingData = ()=>{
    console.log(Tittle , Description);
    console.log(Email);

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/AddProject`,{Email ,Tittle , Description }, { withCredentials: true })
      .then((res)=>{
         if(res.data.message == "Created new user and project" || res.data.message =="Added Project to existing user"){
              toast.success("Project Added Successfully")
              setTittle('')
              setDescription('')
         }
      })
      .catch((error)=>{
          console.log("error" ,error);
          if(error.response.data.message === "Project limit exceeded"){
              toast.warn("Project limit exceeded")
          }
      })
    
    
   }

  return (
    <div className='bg-[#FFF100] w-[100%] min-h-screen '>

            <div className='flex justify-center font-semibold gap-8 p-4 border-b border-black'>
              <Link to='/AddProject'><div ><h1 className='bg-[#006BFF] font-Afacad flex justify-center items-center p-3 gap-2 rounded-lg text-sm md:text-lg cursor-pointer' >Add Project <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="#120505" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" rx="3"/><path stroke-linecap="round" d="M24 16v16m-8-8h16"/></g></svg></h1></div></Link> 
               <Link to='/AllProjects'><div onClick={()=>{ Navigation("/AllProjects")}}><h1 className='bg-[#006BFF] flex justify-center items-center p-3 gap-2 rounded-lg text-sm font-Afacad  md:text-lg cursor-pointer' >All Projects <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#120505" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#120505"><path d="M3.5 9.368c0-3.473 0-5.21 1.025-6.289S7.2 2 10.5 2h3c3.3 0 4.95 0 5.975 1.08C20.5 4.157 20.5 5.894 20.5 9.367v5.264c0 3.473 0 5.21-1.025 6.289S16.8 22 13.5 22h-3c-3.3 0-4.95 0-5.975-1.08C3.5 19.843 3.5 18.106 3.5 14.633z"/><path d="m8 2l.082.493c.2 1.197.3 1.796.72 2.152C9.22 5 9.827 5 11.041 5h1.917c1.213 0 1.82 0 2.24-.355c.42-.356.52-.955.719-2.152L16 2M8 16h4m-4-5h8"/></g></svg></h1></div></Link>
            </div>

            <h1 className='text-center font-Afacad font-bold text-2xl mt-14'>
              Add Project
            </h1>

            <div className='mt-6'> 
              <div className='flex flex-col items-center justify-center w-[100%] h-96 md:h-[75%] gap-4'>
              <div><input type="text" placeholder='Enter Project Name' className='p-4 bg-[#006BFF] text-white font-Afacad placeholder:text-white placeholder:font-Afacad w-60 font-medium md:w-96' value={Tittle} onChange={(e)=>setTittle(e.target.value)}/></div>
              <div><textarea type="text"  placeholder='Enter Description' className="p-4 bg-[#006BFF] text-white placeholder:text-white font-Afacad w-60 md:w-96 font-medium  resize-none h-40"  value={Description} onChange={(e)=>setDescription(e.target.value)}/></div>
              <div><button className='bg-black font-Afacad text-white p-2 px-4 flex gap-2 justify-center items-center font-semibold rounded-lg' onClick={AddingData}>Add <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g fill="#fff" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
                    <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" />
                  </g>
                </svg></button></div>
            </div>  
            </div>
    </div>
  )
}

export default AddProject