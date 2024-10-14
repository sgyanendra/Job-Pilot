import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import store from '@/redux/store'


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const {loading,user}=useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }finally{
            dispatch(setLoading(false));
        }
        console.log(input);
    }
  
    useEffect(()=>{
        if(user){
          navigate("/");
        }
    },[]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center rounded-2xl justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type='email'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder='xyz@gmail.com'
                            className='border-gray-200 rounded'
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type='password'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder='abc123'
                            className='border-gray-200 rounded'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-3'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading?<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>:<Button type="submit" className="w-full my-4 bg-[#662ddf] rounded hover:bg-[#4305d4]">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account?<Link to="/signup" className="text-blue-600">SignUp</Link></span>

                </form>
            </div>
        </div>
    )
}

export default Login
