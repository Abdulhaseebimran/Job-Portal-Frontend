import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, ArrowLeft } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import Navbar from './shared/Navbar';

const Profile = () => {
  useGetAppliedJobs();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const isResume = true;
  const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <div className='max-w-5xl mx-auto bg-white border border-gray-300 shadow-lg rounded-2xl my-5 p-8 transition-all duration-300 hover:shadow-2xl'>
        <div className="flex items-center mb-6">
          <Button
            className="flex items-center gap-2 border-gray-400 hover:bg-gray-200 transition-all duration-200"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </Button>
        </div>
        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg" alt='Profile Picture' />
            </Avatar>
            <div>
              <h1 className='font-semibold text-2xl text-gray-900'>{user?.fullName}</h1>
              <p className='text-gray-600'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button 
            className="border-gray-400 hover:bg-gray-200 transition-all duration-200 p-2" 
            variant="outline" 
            onClick={() => setOpen(true)}
          >
            <Pen size={18} />
          </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2 text-gray-700'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2 text-gray-700'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1 className='font-bold text-lg text-gray-800'>Skills</h1>
          <div className='flex flex-wrap gap-2 mt-2'>
            {user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className={`${colors[index % colors.length]} text-white px-3 py-1 rounded-md shadow-md`}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold text-gray-800">Resume</Label>
          {
            isResume ? <a target="blank" href={user?.profile?.resumeOriginalName} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto rounded-2xl p-5 my-5 shadow-lg transition-all duration-300 hover:shadow-2xl'>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </motion.div>
  );
}

export default Profile;
