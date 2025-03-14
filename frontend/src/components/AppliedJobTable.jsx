import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Applied Jobs</h2>
      <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <TableCaption className="text-gray-600">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-100 text-gray-800">
          <TableRow>
            <TableHead className="p-4">Date</TableHead>
            <TableHead className="p-4">Job Role</TableHead>
            <TableHead className="p-4">Company</TableHead>
            <TableHead className="p-4">Location</TableHead>
            <TableHead className="p-4">Job Type</TableHead>
            <TableHead className="p-4">Salary</TableHead>
            <TableHead className="p-4 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="7" className="text-center py-6 text-gray-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob, index) => (
              <motion.tr
                key={appliedJob?._id}
                whileHover={{ backgroundColor: "#eaeaea", scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`border-b border-gray-200 cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <TableCell className="p-4 text-gray-800">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="p-4 font-medium text-gray-900">
                  {appliedJob.job?.title || "N/A"}
                </TableCell>
                <TableCell className="p-4 text-gray-700">
                  {appliedJob.job?.companyId?.name || "N/A"}
                </TableCell>
                <TableCell className="p-4 text-gray-700">
                  {appliedJob.job?.location || "N/A"}
                </TableCell>
                <TableCell className="p-4 capitalize text-gray-700">
                  {appliedJob.job?.jobType || "N/A"}
                </TableCell>
                <TableCell className="p-4 font-medium text-green-600">
                  {appliedJob.job?.salary
                    ? `PKR ${appliedJob.job?.salary.toLocaleString()}`
                    : "N/A"}
                </TableCell>
                <TableCell className="p-4 text-center">
                  <Badge
                    className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {appliedJob.status?.toUpperCase() || "UNKNOWN"}
                  </Badge>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
