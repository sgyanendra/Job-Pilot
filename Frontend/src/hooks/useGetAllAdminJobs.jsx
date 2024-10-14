import { setAllAdminJobs} from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
   const dispatch=useDispatch();
   useEffect(()=>{
     const fetchAllAdminJobs=async ()=>{
        try {
            const res=await axios.get(`${JOB_API_END_POINT}/getAdminjobs`,{withCredentials:true});
            console.log(res);
            if(res.data.success){
              dispatch(setAllAdminJobs(res.data.job));          
            }
        } catch (error) {
            console.log(error);
        }
     }
     fetchAllAdminJobs();
   },[]);
}

export default useGetAllAdminJobs