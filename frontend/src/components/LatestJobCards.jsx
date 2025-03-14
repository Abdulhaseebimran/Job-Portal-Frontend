import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      onClick={() => navigate(`/description/${job?._id}`)}
      className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}
    >
      <div className='mb-3'>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>Pakistan</p>
      </div>
      <div className='mb-3'>
        <h1 className="font-bold text-xl my-2">{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full" variant="ghost">
        {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full" variant="ghost">
        {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full" variant="ghost">
        {job?.Salary} LPA
        </Badge>
      </div>
    </motion.div>
  )
}

export default LatestJobCards