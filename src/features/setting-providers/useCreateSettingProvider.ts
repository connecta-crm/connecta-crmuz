import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import settingProviders from '../../services/setting-providers';
import { SettingProvidersTableDataType } from './setttingProviderTableDataType';

export function useCreateSettingProvider() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: SettingProvidersTableDataType) => settingProviders.createProvider(item),
    onSuccess: () => {
      message.success('Provider created');
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
