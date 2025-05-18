import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Audio } from 'react-loader-spinner'


function AllProjects() {
    const Navigation =  useNavigate()

    const [AllProjects,setAllProjects] = useState([])
    const [Email,setEmail] = useState("")
    const [LoaderState , setLoaderState] = useState(false)

    useEffect(()=>{
          
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/GetVerify`, { withCredentials: true })
          .then((res)=>{
              setEmail(res.data.data.email);
              console.log(res.data.data.email);
              
          })
          .catch((error)=>{
              console.log("error" ,error);
              Navigation("/Signin")
          })
              
    },[Navigation])
    

    useEffect(()=>{
        if(Email){
           setLoaderState(true)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/GetAllProjects`,{Email}, { withCredentials: true })
            .then((res)=>{
                setLoaderState(false)
                console.log(res.data.data[0].Projects);
                
                setAllProjects(res.data.data[0].Projects)

          
      })
      .catch((error)=>{
          console.log("error" ,error);
        
      })
        }
      
          
  },[Email, Navigation])

  const Tasks = (key,Tittle,id)=>{
    Navigation("/Dashboard",{
        state: {
        Tittle: Tittle,
      }
    })
   
    
  }


  const logout = ()=>{
        Cookies.remove('Authtoken',{ path: '/' });
        window.location.href = '/'
      }


  return (
    <div className='bg-[#FFF100] w-[100%] min-h-screen '>

        
            <div className='flex justify-center font-semibold gap-8 p-4 border-b border-black'>
              <Link to='/AddProject'><div><h1 className='bg-[#006BFF] font-Afacad flex justify-center items-center p-3 gap-2 rounded-lg text-sm md:text-xl cursor-pointer' >Add Project <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="#120505" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" rx="3"/><path stroke-linecap="round" d="M24 16v16m-8-8h16"/></g></svg></h1></div></Link>
               <Link to='/AllProjects'><div><h1 className='bg-[#006BFF] flex justify-center items-center p-3 gap-2 rounded-lg text-sm font-Afacad  md:text-xl cursor-pointer' >All Projects <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#120505" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#120505"><path d="M3.5 9.368c0-3.473 0-5.21 1.025-6.289S7.2 2 10.5 2h3c3.3 0 4.95 0 5.975 1.08C20.5 4.157 20.5 5.894 20.5 9.367v5.264c0 3.473 0 5.21-1.025 6.289S16.8 22 13.5 22h-3c-3.3 0-4.95 0-5.975-1.08C3.5 19.843 3.5 18.106 3.5 14.633z"/><path d="m8 2l.082.493c.2 1.197.3 1.796.72 2.152C9.22 5 9.827 5 11.041 5h1.917c1.213 0 1.82 0 2.24-.355c.42-.356.52-.955.719-2.152L16 2M8 16h4m-4-5h8"/></g></svg></h1></div></Link>
            </div>
            
            <div className='p-4 font-semibold'>
              <h1 className='bg-black text-white p-2 w-fit text-sm md:text-lg flex justify-center items-center gap-2 rounded-md font-Afacad cursor-pointer' onClick={logout}>Logout <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.203C3 14.724 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5" color="#fff" />
              </svg></h1>
            </div>

            
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
            {
                AllProjects.map((data,key)=>(
                    <div className='flex justify-center items-center mt-6' key={key}>
                        <div className='flex flex-col md:flex-row gap-3 md:gap-2 bg-[#006BFF] w-fit px-6 py-3 rounded-md text-white font-Afacad justify-center items-center'>
                            <h1 className='bg-black px-4 py-2 rounded-3xl'><span className='text-white font-mono'>No :</span> {key+1}</h1>
                            <h1 className='bg-black px-4 py-2 rounded-3xl'><span className='text-white font-mono'>Project Name :</span> {data.Tittle} </h1>
                           <h1 className='bg-black px-4 py-2 rounded-3xl'>
                            <span className='text-white font-mono'>Date :</span>{" "}
                            {new Date(data.timestamp).toLocaleDateString('en-IN')}
                            </h1>
                            <button className='bg-white text-black px-4 py-2 rounded-md font-bold border border-black' onClick={()=>{Tasks(key,data.Tittle,data._id)}}>Open</button>
                        </div>
                    </div>
                ))
            }

           

            

    </div>
  )
}

export default AllProjects