import React, { useEffect, useState } from "react";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { Application_API_END_POINT } from "../../../utils/constant.js";
import { motion } from "framer-motion";

const ApplicantsTable = ({ applicants }) => {
  const shortListingStatus = ["Accepted", "Rejected"];
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    if (allAdminJobs.length > 0) {
      const filteredJobs = allAdminJobs.filter((job) =>
        searchJobByText
          ? job?.company?.name
              ?.toLowerCase()
              .includes(searchJobByText.toLowerCase())
          : true
      );
      setFilterJobs(filteredJobs);
    }
  }, [allAdminJobs, searchJobByText]);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${Application_API_END_POINT}/status/${id}/update`,
        { status: status.toLowerCase() }
      );

      if (res.data.success) {
        toast.success(`Application ${status.toLowerCase()} successfully.`);
      }
    } catch (error) {
      toast.error(`Failed to ${status.toLowerCase()} application.`);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 border-green-500";
      case "rejected":
        return "bg-red-100 border-red-500";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-lg"
    >
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow className="border-b bg-gray-100">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants && applicants.length > 0 ? (
            applicants.map((item) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`border-b transition ${getStatusClass(item.status)}`}
              >
                <TableCell>{item?.applicant?.fullName || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell className="text-blue-500">
                  {item?.applicant?.profile?.resumeOriginalName ? (
                    <a
                      className="text-blue-500 hover:text-blue-700 transition"
                      href={item?.applicant?.profile?.resumeOriginalName}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                    </a>
                  ) : (
                    <span className="text-gray-500">NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 bg-white shadow-md border rounded-lg">
                      {shortListingStatus.map((status, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
                          onClick={() => statusHandler(status, item._id)}
                        >
                          {status === "Accepted" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ApplicantsTable;