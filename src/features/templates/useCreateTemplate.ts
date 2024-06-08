import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Templates from '../../services/templates';
import { TemplatesTableDataType } from './templatesTableDataType';
export function useCreateTemplate() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: TemplatesTableDataType) => Templates.createTemplate(item),
    onSuccess: () => {
      message.success('Template created');
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
