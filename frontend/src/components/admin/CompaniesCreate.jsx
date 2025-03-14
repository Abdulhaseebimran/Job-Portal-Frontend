import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Company_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { setSingleCompany } from "../../../redux/companySlice";

const CompainesCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const registeredNewCompany = async () => {
    try {
      const res = await axios.post(
        `${Company_API_END_POINT}/register`,

        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const companyData = res.data.message;
      dispatch(setSingleCompany(companyData)); 
      toast.success(res.data.data);
      const companyId = companyData._id;
      navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to your company name? you can chnage this later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt,Mircrosoft etc."
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registeredNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompainesCreate;
