import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice.js";
import { JOB_API_END_POINT } from "../../utils/constant.js";
import axios from "axios";
import { useEffect } from "react";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobs?keywords=${encodeURIComponent(searchedQuery)}`, { withCredentials: true });
                // console.log("All Jobs:", res.data);
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.message || []));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                dispatch(setAllJobs([]));
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
