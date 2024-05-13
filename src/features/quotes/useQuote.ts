import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useModal } from "../../context/ModalContext";
import toast from "react-hot-toast";
import Quote from "../../services/quotes";
import { QuoteDataType } from "../../models/QuoteDataType";
export function useCreateQuote() {
    const { hideModal } = useModal();
    const queryClient = useQueryClient();
    const { mutate: create, isPending: isLoading } = useMutation({
      mutationFn: (item: QuoteDataType) => Quote.createQuote(item),
      onSuccess: () => {
        hideModal();
        toast.success('Lead created');
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    return { create, isLoading };
  }
  