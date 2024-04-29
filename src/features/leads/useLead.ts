import { useQuery } from "@tanstack/react-query";
import Leads from "../../services/leads";

const useLead = () => {
    const {data,isLoading,isError,isSuccess} = useQuery({
        queryFn:()=>{
          return   Leads.getAllLeads()
        },
        queryKey:["leads"]
        
    })
    return {data,isLoading,isError,isSuccess}
};
export default useLead