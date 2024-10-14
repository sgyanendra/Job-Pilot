import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const randomJobs=[1,2,3,4,5,6,7,8];
const LatestJob = () => {
 const {allJobs}=useSelector(store=>store.job);
 console.log(allJobs);
  return (
    <div className='max-w-7xl mx-auto my-20'>
       <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> job Opening</h1>
       <div className='grid grid-cols-3 gap-4 my-5'>
        {
            allJobs<=0?<span>No Jobs</span>:allJobs.slice(0,6).map((job)=><LatestJobCards job={job} key={job._id}/>)
        }
       </div>
    </div>
  )
}

export default LatestJob
