import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { setUser } from "../../../redux/authSlice.js";
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
                <div>
                    <Link to="/">
                        <h1 className="text-2xl font-bold">
                            Job<span className="text-red-600">Portal</span>
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='rounded-full cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-88'>
                                    <div className='flex gap-2 space-y-2 items-center'>
                                        <Avatar className='rounded-full cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-gray-600'>
                                        {
                                            user && user.role == 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button
                                                        variant='link'
                                                        className='w-full justify-start'
                                                        onClick={() => navigate("/profile")}
                                                    >
                                                        View Profile
                                                    </Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button
                                                variant='link'
                                                className='w-full justify-start'
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </Button>
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

export default Navbar;