import React, { useState } from 'react'
import { DialogContent, Dialog, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangehandeler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandeler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`https://job-pilot.onrender.com//api/v1/user/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }
    return (
        <div className='bg-white'>
            <Dialog open={open} className='bg-white'>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className='text-white'>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandeler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right text-white'>Name</Label>
                                <Input
                                    id='name'
                                    name='name'
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='gmail' className='text-right text-white'>Gmail</Label>
                                <Input
                                    id='gmail'
                                    name='gmail'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='number' className='text-right text-white'>Number</Label>
                                <Input
                                    id='number'
                                    name='number'
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right text-white'>Bio</Label>
                                <Input
                                    id='bio'
                                    name='bio'
                                    className='col-span-3'
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right text-white'>Skills</Label>
                                <Input
                                    id='skills'
                                    name='skills'
                                    className='col-span-3'
                                    onChange={changeEventHandler}
                                    value={input.skills} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file' className='text-right text-white'>Resume</Label>
                                <Input
                                    id='file'
                                    name='file'
                                    type='file'
                                    onChange={fileChangehandeler}
                                     accept='application/pdf'
                                    className='col-span-3' />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4 bg-[#662ddf] rounded hover:bg-[#4305d4]">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog