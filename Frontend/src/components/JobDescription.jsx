import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import useGetSingleJob from '@/hooks/useGetSingleJob'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'


const JobDescription = () => {
    const params=useParams();
    const jobId=params.id;
    const {singleJob}=useSelector(store=>store.job);
    const {user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const isInitiallyApplied=singleJob?.applications?.some(application=>application.applicant===user?._id)||false;
    const [isApplied,setIsApplied]=useState(isInitiallyApplied);
    useEffect(()=>{
        console.log(singleJob?.applications?.some(application=>application.applicant===user?._id));
        const fetchAllJobs=async ()=>{
           try {
               const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
               if(res.data.success){
                 setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id));          
                 dispatch(setSingleJob(res.data.job));
                }
           } catch (error) {
               console.log(error);
           }
        }
        fetchAllJobs();
      },[jobId,dispatch,user?._id]);

     const applyJobhandler= async ()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
     }
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 my-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} position</Badge>
                            <Badge className={'text-[#F83C02] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                        </div>
                    </div>
                    <Button disabled={isApplied} 
                    onClick={isApplied?null:applyJobhandler}
                    className={`rounded ${isApplied?'bg-gray-600 text-white cursor-not-allowed hover:bg-gray-600':'bg-[#7209b7] hover:bg-[#330353] text-white'}`}>{isApplied?'Already applied':'Apply Now'}</Button>
                </div>
                <h1 className='border-b-2 border-b-gray-200 font-medium py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} year</span></h1>
                    <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicante:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription