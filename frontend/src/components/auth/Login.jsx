import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '../../../utils/constant'
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from '../../../redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // const { isLoading, user } = useSelector((state) => state.auth);
    const { isLoading, user } = useSelector((state) => state.auth);

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.message))
                navigate("/");
                console.log(res.data.message.fullName, res.data);
                toast.success(`${res.data.message.fullName} logged in successfully!`);
            }
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message;
            const errorMessage = typeof message === 'string'
                ? message
                : String(message) || "Something went wrong!";
            toast.error(errorMessage);
            console.log(toast.error(errorMessage));

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
                <form className='w-1/2 border border-gray-400 rounded-md p-4 my-10' onSubmit={submithandler}>
                    <h1 className='text-xl font-bold mb-5'>Login</h1>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Email</Label>
                        <Input type="email" name="email" placeholder='Enter your email' onChange={changeEventHandler} value={input.email} />
                    </div>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Password</Label>
                        <div className='relative'>
                            <Input type={input.showPassword ? "text" : "password"}
                                name="password"
                                placeholder='Enter your password'
                                onChange={changeEventHandler}
                                value={input.password}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setInput(prev => ({ ...prev, showPassword: !prev.showPassword }))}
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
                    <div className="flex items-center justify-between mt-5">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    onChange={changeEventHandler}
                                    checked={input.role == "student"}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    onChange={changeEventHandler}
                                    checked={input.role == "recruiter"}
                                />
                                <Label htmlFor="rr">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        isLoading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full my-4 bg-blue-800 text-white">Login</Button>
                    }
                    <span className="text-sm">
                        Don't have an account ?{" "}
                        <Link to="/signup" className="text-blue-800 text-sm">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>

    )
}

export default Login