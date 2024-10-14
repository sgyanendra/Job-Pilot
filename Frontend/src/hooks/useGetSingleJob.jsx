import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetSingleJob = (jobId) => {
   const dispatch=useDispatch();
   useEffect(()=>{
     const fetchAllJobs=async ()=>{
        try {
            const res=await axios.get(`https://job-pilot.onrender.com//api/v1/job/get/jobId`,{withCredentials:true});
            if(res.data.success){
              dispatch(setAllJobs(res.data.jobs));          
            }
        } catch (error) {
            console.log(error);
        }
     }
     fetchAllJobs();
   },[]);
}

export default useGetSingleJob