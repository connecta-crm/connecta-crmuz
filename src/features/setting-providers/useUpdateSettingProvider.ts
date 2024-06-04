import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import SettingProviders from '../../services/setting-providers';
import { SettingProvidersTableDataType } from './setttingProviderTableDataType';
export function useUpdateSettingProvider() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: SettingProvidersTableDataType) => SettingProviders.updateProvider(item),
    onSuccess: () => {
      message.success('Provider updated');
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
