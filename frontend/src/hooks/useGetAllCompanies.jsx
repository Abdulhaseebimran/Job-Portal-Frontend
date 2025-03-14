import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Company_API_END_POINT} from "../../utils/constant.js";
import { setCompanies } from "../../redux/companySlice.js";

const useGetAllCompanies = () =>{
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchCompanies = async() =>{
        try{
         const res = await axios.get(`${Company_API_END_POINT}/getCompany`,{withCredentials:true});
        //  console.log(res.data);
         if(res.data.success){
            dispatch(setCompanies(res.data.message))
         }
        }catch(error){
            console.log(error);
            
        }
    }
    fetchCompanies();
},[dispatch])
}

export default useGetAllCompanies;