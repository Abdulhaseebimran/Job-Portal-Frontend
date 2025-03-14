import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaMoneyBillAlt,
  FaBriefcase,
} from "react-icons/fa";
import {
  Application_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const JobDescription = () => {
  // const isApplied = true;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${Application_API_END_POINT}/apply/${jobId}`,
        {}, // Send empty object for POST request
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updateSinglejob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
          // applications: [...(singleJob.applications || []), res.data.message],
        };
        dispatch(setSingleJob(updateSinglejob));
        toast.success(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios(`${JOB_API_END_POINT}/getJob/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.message));
          setIsApplied(
            res.data.message.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <motion.div
      className="max-w-5xl mx-auto my-10 bg-white shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="font-bold text-2xl text-gray-900">
            {singleJob?.title}
          </h1>
          <div className="flex gap-2 mt-2">
            <Badge
              className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-md shadow-sm"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-md shadow-sm"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="bg-indigo-100 text-indigo-600 font-semibold px-3 py-1 rounded-md shadow-sm"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-white/20 font-medium py-4 text-lg text-black">
        Job Description
      </h1>
      <motion.div
        className="mt-4 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <FaBriefcase className="w-5 h-5 mr-2 text-indigo-300" />
            <h1 className="font-semibold text-black">
              Role:<span className="pl-4 font-normal">{singleJob?.title}</span>
            </h1>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-300" />
            <h1 className="font-semibold text-black">
              Location:
              <span className="pl-4 font-normal">{singleJob?.location}</span>
            </h1>
          </div>
          <div className="flex items-center">
            <FaMoneyBillAlt className="w-5 h-5 mr-2 text-green-300" />
            <h1 className="font-semibold text-black">
              Salary:
              <span className="pl-4 font-normal">{singleJob?.salary} LPA</span>
            </h1>
          </div>
          <div className="flex items-center">
            <FaUser className="w-5 h-5 mr-2 text-blue-300" />
            <h1 className="font-semibold text-black">
              Experience:
              <span className="pl-4 font-normal">
                {singleJob?.experienceLevel} yrs
              </span>
            </h1>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="w-5 h-5 mr-2 text-purple-300" />
            <h1 className="font-semibold text-black">
              Description:
              <span className="pl-4 font-normal">{singleJob?.description}</span>
            </h1>
          </div>
          <div className="flex items-center">
            <FaUser className="w-5 h-5 mr-2 text-yellow-300" />
            <h1 className="font-semibold text-black">
              Total Applicants:
              <span className="pl-4 font-normal">
                {singleJob?.applications?.length}
              </span>
            </h1>
          </div>
          <div className="flex items-center">
            <FaUser className="w-5 h-5 mr-2 text-yellow-300" />
            <h1 className="font-semibold text-black">
              Posted Date:
              <span className="pl-4 font-normal">
                {singleJob?.createdAt.split("T")[0]}
              </span>
            </h1>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobDescription;
