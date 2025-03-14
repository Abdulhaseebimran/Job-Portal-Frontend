import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Application_API_END_POINT } from "../../utils/constant.js";
import { setAllAppliedJobs } from "../../redux/jobSlice.js";
const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${Application_API_END_POINT}/appliedjobs`, {
          withCredentials: true,
        });
        // console.log(res.data);

        if (res.data.success) {
            // console.log(res.data);
          dispatch(setAllAppliedJobs(res.data.message));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};
export default useGetAppliedJobs;
