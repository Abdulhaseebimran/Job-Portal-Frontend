import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(companies)) {
      setFilterCompany([]);
      return;
    }

    const filteredCompany = companies.filter((company) =>
      searchCompanyByText
        ? company?.name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase())
        : true
    );

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
    >
      <Table className="w-full">
        <TableCaption className="text-gray-500 dark:text-gray-400">
          A list of your registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="text-left py-3">Logo</TableHead>
            <TableHead className="text-left py-3">Name</TableHead>
            <TableHead className="text-left py-3">Founded</TableHead>
            <TableHead className="text-left py-3">Location</TableHead>
            <TableHead className="text-left py-3">Website</TableHead>
            <TableHead className="text-right py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length > 0 ? (
            filterCompany.map((company, index) => (
              <motion.tr
                key={company._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <TableCell className="py-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>
                <TableCell className="py-4 font-medium dark:text-white">
                  {company.name}
                </TableCell>
                <TableCell className="py-4 dark:text-gray-300">
                  {new Date(company.createdAt).toLocaleDateString()}{" "}
                </TableCell>
                <TableCell className="py-4 dark:text-gray-300">
                  {company.location}
                </TableCell>
                <TableCell className="py-4 dark:text-gray-300">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {company.website}
                  </a>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-700 dark:text-gray-200">
                          Edit
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan="6"
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default CompaniesTable;
