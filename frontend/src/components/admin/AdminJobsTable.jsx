import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(allAdminJobs) && allAdminJobs.length > 0) {
      const filteredJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });

      if (JSON.stringify(filteredJobs) !== JSON.stringify(filterJobs)) {
        setFilterJobs(filteredJobs);
      }
    }
  }, [allAdminJobs, searchJobByText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl shadow-lg bg-white"
    >
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b hover:bg-muted transition"
              >
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer mt-2 hover:bg-gray-100 p-2 rounded-md transition"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AdminJobsTable;
