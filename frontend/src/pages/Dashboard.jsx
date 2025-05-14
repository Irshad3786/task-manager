import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import Cookies from 'js-cookie';
import dateFormat, { masks } from "dateformat";




function Dashboard() {
  
   const Navigation =  useNavigate()
   const [Tittle,setTittle] = useState("")
   const [Description,setDescription] = useState("")
   const [Email,setEmail] = useState("")
   const [AllTaskBut , setAllTaskBut] = useState(false)
   const [TaskData , setTaskData] = useState([])
   const [Edit ,setEdit] = useState(false)
   const [TextChange , setTextChange] = useState("")
   const [Text , setText] = useState("")
   const [Indexval,setIndexval] = useState()

   console.log(import.meta.env.VITE_BACKEND_URL);
   

   const AllTaskDis =()=>{
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/Dashboard`,{}, { withCredentials: true })
      .then((res)=>{
          setEmail(res.data.data.email);
      })
      .catch((error)=>{
          console.log("error" ,error);
          Navigation("/Signin")
      })
   }

    useEffect(()=>{

      AllTaskDis()
        
    },[Navigation])

    const submit=()=>{
      if(!Tittle || !Description){
        toast.warn("Please Enter All Fields")
      }else{

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/Task`,{Email,Tittle,Description})
        .then((res)=>{
          
        if(res.data.message === "Added Task"){
           toast.success("Task Added")
           setTittle("")
           setDescription("")
        }
        
        })
        .catch((error)=>{
        console.log(error);
        
        })
        
      }
      
      
    }

    const AddTaskButton = ()=>{
      setAllTaskBut(false)
      
    }

    const AllTaskButton = ()=>{
      setAllTaskBut(true)

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/AllTasks`,{Email},{ withCredentials: true })
      .then((res)=>{
        setTaskData(res.data.data)
        console.log(TaskData);
        
      })
      .catch((error)=>{
        console.log(error);
      })
      
    }

    const EditTask = (e,inx)=>{
      setEdit(true)
      setIndexval(inx)
      setText(e)
    }


    const DeleteTask =(data)=>{
      console.log(data._id);
      
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/DeleteTask`,{_id: data._id },{ withCredentials: true })
      .then((res)=>{
        AllTaskButton()
      })
      .catch((error)=>{
        console.log(error);
        
      })
      
      
    }


    


    const UpdateText = (data)=>{
    
      setEdit(false)

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/UpdateTask`,{_id: data._id , Description :Text},{ withCredentials: true })
      .then((res)=>{
        console.log(res);
        AllTaskButton()
      })
      .catch((error)=>{
        console.log(error);
        
      })
      
    }


  
    
    
    const logout = ()=>{
      Cookies.remove('Authtoken',{ path: '/' });
      window.location.href = '/'
    }

  return (
    <div>
      <div className='w-screen min-h-screen bg-[#FFF100]'>

          

            <div className='flex justify-center font-semibold gap-8 p-4 border-b border-black'>
              <div><h1 className='bg-[#006BFF] font-Afacad flex justify-center items-center p-3 gap-2 rounded-lg text-[4.5vw] md:text-[1.2vw] cursor-pointer' onClick={AddTaskButton}>Add Task <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="#120505" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" rx="3"/><path stroke-linecap="round" d="M24 16v16m-8-8h16"/></g></svg></h1></div>
              <div><h1 className='bg-[#006BFF] flex justify-center items-center p-3 gap-2 rounded-lg text-[4.5vw] font-Afacad  md:text-[1.2vw] cursor-pointer' onClick={AllTaskButton}>All Tasks <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#120505" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#120505"><path d="M3.5 9.368c0-3.473 0-5.21 1.025-6.289S7.2 2 10.5 2h3c3.3 0 4.95 0 5.975 1.08C20.5 4.157 20.5 5.894 20.5 9.367v5.264c0 3.473 0 5.21-1.025 6.289S16.8 22 13.5 22h-3c-3.3 0-4.95 0-5.975-1.08C3.5 19.843 3.5 18.106 3.5 14.633z"/><path d="m8 2l.082.493c.2 1.197.3 1.796.72 2.152C9.22 5 9.827 5 11.041 5h1.917c1.213 0 1.82 0 2.24-.355c.42-.356.52-.955.719-2.152L16 2M8 16h4m-4-5h8"/></g></svg></h1></div>
            </div>

         

            <div className='p-4 font-semibold'>
              <h1 className='bg-black text-white p-2 w-fit text-[4vw] md:text-[1.2vw] flex justify-center items-center gap-2 rounded-md font-Afacad cursor-pointer' onClick={logout}>Logout <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.203C3 14.724 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5" color="#fff" />
              </svg></h1>
            </div>
          {!AllTaskBut && (<div>

            <div className='flex flex-col items-center justify-center w-[100%] h-96 md:h-[75%] gap-4'>
              <div><input type="text" placeholder='Enter Tittle' className='p-4 bg-[#006BFF] text-white font-Afacad placeholder:text-white placeholder:font-Afacad w-60 font-medium md:w-96' value={Tittle} onChange={(e)=>{setTittle(e.target.value)}}/></div>
              <div><textarea type="text"  placeholder='Enter Description' className="p-4 bg-[#006BFF] text-white placeholder:text-white font-Afacad w-60 md:w-96 font-medium  resize-none h-40"value={Description} onChange={(e)=>{setDescription(e.target.value)}} /></div>
              <div><button className='bg-black font-Afacad text-white p-2 px-4 flex gap-2 justify-center items-center font-semibold rounded-lg'onClick={submit} >Add <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g fill="#fff" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
                    <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" />
                  </g>
                </svg></button></div>
            </div>
          </div>)}
        



        {AllTaskBut && (<div>

          {TaskData.slice().reverse().map((data,index)=>(
            <div className='p-6 pb-11 md:flex justify-center'>
            <div className='h-48 w-[2wh] md:w-[60%] rounded-2xl'>
              <div className='w-[100%] h-11 bg-[#006BFF]  rounded-ss-xl rounded-se-xl flex items-center justify-between'>
                <h1 className='font-Afacad text-xl text-black font-semibold p-2'>{data.Tittle}</h1>

                <div className='flex pr-5 gap-2 justify-center items-center'>
                <div><h1 className='font-Afacad text-white'>{dateFormat(data.timestamp,"dd mmmm yyyy")} </h1></div>
                {index != Indexval ? (<div onClick={()=>{EditTask(data.Description,index)}} className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <g fill="#000" fill-rule="evenodd" clip-rule="evenodd">
                    <path d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352z" />
                    <path d="M19.846 4.318a2.2 2.2 0 0 0-.437-.692a2 2 0 0 0-.654-.463a1.92 1.92 0 0 0-1.544 0a2 2 0 0 0-.654.463l-.546.578l2.852 3.02l.546-.579a2.1 2.1 0 0 0 .437-.692a2.24 2.24 0 0 0 0-1.635M17.45 8.721L14.597 5.7L9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.5.5 0 0 0 .255-.145l4.778-5.06Z" />
                  </g>
                  </svg>
                </div>) : (
                  <button className='bg-black text-white font-semibold p-2 rounded-xl font-Afacad text-sm' onClick={() => {
                    UpdateText(data);
                    setIndexval(null)
                  }}>UPDATE</button>
                )}
  
               <div onClick={()=>{DeleteTask(data)}} className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36">
                  <path fill="#000" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m8 22.1a1.4 1.4 0 0 1-2 2l-6-6l-6 6.02a1.4 1.4 0 1 1-2-2l6-6.04l-6.17-6.22a1.4 1.4 0 1 1 2-2L18 16.1l6.17-6.17a1.4 1.4 0 1 1 2 2L20 18.08Z" class="clr-i-solid clr-i-solid-path-1" />
                  <path fill="none" d="M0 0h36v36H0z" />
                  </svg>
                </div>

                </div>
               </div>
               <div className='w-full h-full overflow-auto scrollbar-hide text-white bg-black rounded-b-xl p-2 font-Afacad'>
                {Edit && index === Indexval ? (
                  <textarea
                    type="text"
                    className='text-black w-full h-full p-2 rounded'
                    value={Text || ''} 
                    onChange={(e) => setText(e.target.value)}
                  />
                ) : (
                  <p>{data?.Description || "No description available"}</p>
                )}
              </div>
            </div>
          </div>
          ))}
        
        </div>)}
        
      </div>
    </div>
  )
}

export default Dashboard




