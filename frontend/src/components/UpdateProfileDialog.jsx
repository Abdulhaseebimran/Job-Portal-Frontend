import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { setUser } from "../../redux/authSlice.js";
import { toast } from "sonner";
import axios from "axios";
import { motion } from 'framer-motion';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""

    });
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }
        setOpen(false)
        console.log(input);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="max-w-md w-full rounded-xl bg-white p-6 shadow-2xl transition-all duration-300 mx-auto"
                onInteractOutside={() => setOpen(false)}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <DialogHeader className="text-center mb-2">
                        <DialogTitle className="text-2xl font-semibold text-gray-900">Update Profile</DialogTitle>
                        <p className="text-gray-500 text-sm">Make sure your details are up to date</p>
                    </DialogHeader>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                                <Input id="name" name="fullName" value={input.fullName} onChange={changeEventHandler}
                                    className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                <Input id="email" name="email" value={input.email} onChange={changeEventHandler}
                                    className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <Label htmlFor="number" className="text-sm font-medium text-gray-700">Phone Number</Label>
                                <Input id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}
                                    className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</Label>
                                <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler}
                                    className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills</Label>
                                <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler}
                                    className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <Label htmlFor="file" className="text-sm font-medium text-gray-700">Resume</Label>
                                <Input id="file" name="file" type="file" onChange={fileChangeHandler}
                                    className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <DialogFooter className="mt-4">
                            {loading ? (
                                <Button className="w-full flex items-center justify-center bg-gray-300 text-gray-700 py-2 rounded-md">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                                    Update Profile
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog