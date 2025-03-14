import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import axios from 'axios'
import { USER_API_END_POINT } from '../../../utils/constant'
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../../redux/authSlice';
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((state) => state.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileEventHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submithandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                console.log(res.data.data, res.data);
                navigate("/login");
                toast.success(res.data?.data || 'Sign-Up successful!');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "All fields are required")
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
                    onSubmit={submithandler}
                >
                    <h1 className='text-xl font-bold mb-5'>Signup</h1>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Full Name</Label>
                        <Input type="text" name="fullName" placeholder='Enter your full name' onChange={changeEventHandler} value={input.fullName} />
                    </div>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Email</Label>
                        <Input type="email" name="email" placeholder='Enter your email' onChange={changeEventHandler} value={input.email} />
                    </div>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Phone Number</Label>
                        <Input type="text" name="phoneNumber" placeholder='+92 300 0000000' onChange={changeEventHandler} value={input.phoneNumber} />
                    </div>
                    {/* <div className='my-5'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password"
                        onChange={changeEventHandler} placeholder="Enter password" />
                    </div> */}
                    <div className='my-5'>
                        <Label className='mb-2 block'>Password</Label>
                        <div className="relative">
                            <Input 
                                type={input.showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder='Enter your password' 
                                onChange={changeEventHandler} 
                                value={input.password} 
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setInput(prev => ({...prev, showPassword: !prev.showPassword}))}
                            >
                                {input.showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='my-5 flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="rr">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label>Profile: </Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" onChange={changeFileEventHandler} />
                        </div>
                    </div>
                    {
                        isLoading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button>: <Button type="submit" className="w-full my-4 bg-blue-800 text-white">Signup</Button>
                    }
                    <span className="text-sm">
                        Already have an Account ?{" "}
                        <Link to="/login" className="text-blue-800 text-sm">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup