import { Badge } from "@/components/ui/badge"
import React from 'react'
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useNavigate } from "react-router-dom"

const LatestJobCards = ({ job }) => {
  const navigate=useNavigate();

  return (
    <div onClick={()=>navigate(`/jobs/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
      <div className="flex items-center gap-2 my-1">
        <Button className="p-6" varient="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
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
    </div>
  )
}
export default LatestJobCards