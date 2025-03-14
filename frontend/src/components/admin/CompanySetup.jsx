import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { motion } from "framer-motion";
import { Company_API_END_POINT } from "../../../utils/constant.js";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null, // Change to null to correctly handle files
  });

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null, // Keep file as null (users will upload a new one)
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file); // Upload only if user selects a file
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${Company_API_END_POINT}/updateCompany/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <Navbar />
      <div className="max-w-2xl mx-auto my-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <form onSubmit={submitHandler}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 dark:text-gray-300 font-semibold"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl dark:text-white">
              Company Setup
            </h1>
          </motion.div>

          {/* Input Fields */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <Label className="dark:text-gray-300">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="e.g. Microsoft, Google"
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="dark:text-gray-300">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief description of your company"
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="dark:text-gray-300">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="e.g. https://company.com"
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <Label className="dark:text-gray-300">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. San Francisco, USA"
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Logo Upload & Display */}
            <div>
              <Label className="dark:text-gray-300">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="dark:bg-gray-700 dark:text-white"
              />
              {singleCompany?.logo && !input.file && (
                <div className="mt-2">
                  <img
                    src={singleCompany.logo}
                    alt="Company Logo"
                    className="h-20 w-20 rounded-md object-cover border"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {isLoading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-6">
                Update
              </Button>
            )}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CompanySetup;
