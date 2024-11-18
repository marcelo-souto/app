import { saleService } from "@/services/sales/sale-service";
import { useQuery } from "@tanstack/react-query";

export const useSaleGetAllRequest = () => {
  
  const query = useQuery({
    queryKey: ["get-all-sales"],
    queryFn: saleService.getAll,
  });

  return query;
};
