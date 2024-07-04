import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type PostToCDActionType = 'post' | 'repost' | 'delete';

export type PostCDParamsType = {
  guid: string;
  action: PostToCDActionType;
};
export function useOrderPostCD() {
  const queryClient = useQueryClient();

  const {
    mutate: orderPostCD,
    isPending: isLoadingPostCD,
    isSuccess,
    data: updatedOrderPostCDData,
  } = useMutation({
    mutationFn: ({ guid, action }: PostCDParamsType) =>
      Orders.orderPostCD({ guid, action }),
    onSuccess: ({ action }) => {
      console.log('POST', action);
      const result =
        action === 'post'
          ? 'Posted to CD'
          : action === 'repost'
            ? 'Reposted to CD'
            : 'Removed from CD';
      message.success(result);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    orderPostCD,
    updatedOrderPostCDData,
    isLoadingPostCD,
    isSuccess,
  };
}
