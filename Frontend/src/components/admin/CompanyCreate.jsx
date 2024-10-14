import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const navigate=useNavigate();
    const [companyName,setCompanyname]=useState();

    const registerNewCompany=async ()=>{
        try {
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            if(res.data.success){
               toast.success(res.data.message);
               const companyId=res?.data?.company?._id;
               navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
              <div className='my-10'>
              <h1 className='font-bold text-2xl'>Your Company Name</h1>
              <p className='text-gray-500'>What should you like to give your company name? you can change this later.</p>
              </div>
                <Label className='font-bold'>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e)=>setCompanyname(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                   <Button variant="outline" className="bg-blue-400 rounded border-gray-300" onClick={()=>navigate("/admin/companies")}>Cancle</Button>
                   <Button variant="outline" onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate