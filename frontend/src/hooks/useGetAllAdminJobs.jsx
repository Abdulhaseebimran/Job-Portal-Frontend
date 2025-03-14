import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs } from "../../redux/jobSlice.js";
import { JOB_API_END_POINT } from "../../utils/constant.js";
import axios from 'axios';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success) {
                    console.log(res.data);
                    dispatch(setAllAdminJobs(res.data.message));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs