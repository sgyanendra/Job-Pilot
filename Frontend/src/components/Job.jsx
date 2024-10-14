import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom'


const Job = ({job}) => {
  const navigate=useNavigate();

  const daysAgoFunction=(mongodbTime)=>{
     const createdAt=new Date(mongodbTime);
     const currentTime=new Date();
     const timeDiff=currentTime-createdAt;
     return Math.floor(timeDiff/(1000*24*60*60));
  }

  return (
    <div className='p-5 rounded shadow-xl bg-white border border-gray-100'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} dyas ago`}</p>
        <Button varient="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" varient="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 my-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} position</Badge>
            <Badge className={'text-[#F83C02] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>
      <div className='flex items-center gap-4 my-4'>
        <Button onClick={()=>navigate(`/jobs/description/${job._id}`)} variant="outline" className="rounded border-gray-600">Details</Button>
        <Button className='rounded text-white bg-[#7209b7] hover:bg-[#9d59ca]'>Save me</Button>
      </div>
    </div>
  )
}

export default Job
