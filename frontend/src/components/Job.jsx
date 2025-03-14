import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = 1213123;
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffernce = currentTime - createdAt;
    return Math.floor(timeDiffernce / (1000 * 24 * 60 * 60));
  }

  return (
    <motion.div
      className="p-6 rounded-xl shadow-lg bg-white border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)}`} days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Button className="p-2" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.companyId?.logo || "/fallback-logo.png"} 
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h2 className="text-md font-semibold">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">Pakistan</p>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-xl mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-600 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
          className="rounded-md"
        >
          Details
        </Button>
        <Button
          className="bg-purple-600 text-white hover:bg-purple-700 rounded-md"
          onClick={() => console.log('Saved')}
        >
          Save For Later
        </Button>
      </div>
    </motion.div>
  )
}

export default Job
