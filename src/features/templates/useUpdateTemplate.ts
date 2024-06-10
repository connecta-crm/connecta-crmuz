import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Templates from '../../services/templates';
import { TemplatesTableDataType } from './templatesTableDataType';
export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: TemplatesTableDataType) => Templates.updateTemplate(item),
    onSuccess: () => {
      message.success('Template updated');
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
