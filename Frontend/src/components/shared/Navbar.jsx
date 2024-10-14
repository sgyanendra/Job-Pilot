import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogIn, LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const logoutHandler = async () => {
        try {
          const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
          console.log(res);
          if (res.data && res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
          } else {
            toast.error("Token Failed");
          }
        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Failed to logout");
          }
        }
      }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#FA3002]'>Pilot</span></h1>
                </div>
                <div className='flex items-center gap-5'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browes</Link></li>
                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-5'>
                                <Link to="/login"><Button variant='outline' className="rounded border-grey">Login</Button></Link>
                                <Link to="/signup"><Button className='rounded bg-[#6438C2] hover:bg-[#320680]'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage className='h-12 w-12 rounded-full' src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent >
                                    <div className='flex gap-4 space-x-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage className='h-10 rounded-full' src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio} </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant='link'><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant='link' onClick={logoutHandler}>LogOut</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
