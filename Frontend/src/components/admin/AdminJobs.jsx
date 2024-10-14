import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-18'>
                <div className='flex items-center justify-between'>
                    <Input
                        className='w-fit rounded'
                        placeholder='Filter by name'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className='rounded bg-blue-600' onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs