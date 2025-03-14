import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice.js";
import { motion } from "framer-motion";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Karachi", "Lahore", "Islamabad", "Hyderabad", "Multan", "Peshawar", "Quetta"],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend Developer",
        "Backend Developer",
        "FullStack Developer",
        "Data Scientist",
        "Cybersecurity Analyst",
        "DevOps Engineer",
      ],
    },
    {
      filterType: "Salary",
      array: [
        "0-40k",
        "42-1akh",
        "1lakh to 5 lakh",
        "5 lakh to 10 lakh",
        "10 lakh+",
      ],
    },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <motion.div
      className="w-full bg-white p-5 rounded-xl shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-full bg-white p-3 rounded-md">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => {
            return (
              <div key={index}>
                <h1 className="font-bold text-lg">{data.filterType}</h1>
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 my-2"
                    >
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* {filterData.map((data, index) => (
            <div key={index} className="mb-4">
              <h2 className="font-semibold text-lg mb-2">{data.filterType}</h2>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-1"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-gray-700">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          ))} */}
        </RadioGroup>
      </div>
    </motion.div>
  );
};

export default FilterCard;
