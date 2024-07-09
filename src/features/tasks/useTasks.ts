import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Attachments from '../../services/attachments';

export type TasksParamsType = {
  limit: number;
  offset: number;
  q: string;
  due: boolean;
  nextWeek: boolean;
  thisWeek: boolean;
  toDo: boolean;
  today: boolean;
  type: 'call' | 'email' | 'task' | 'deadline' | 'payment' | '';
  user: number[];
};

export function useTasks() {
  const {
    limit,
    offset,
    q,
    user,
    due,
    nextWeek,
    thisWeek,
    toDo,
    today,
    taskType: type,
  } = useGetSearchParams();

  const {
    data: { results: tasks, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: [
      'tasks',
      limit,
      offset,
      q,
      user,
      due,
      nextWeek,
      thisWeek,
      toDo,
      today,
      type,
    ],
    queryFn: () =>
      Attachments.getTasks({
        limit,
        offset,
        q,
        user,
        due,
        nextWeek,
        thisWeek,
        toDo,
        today,
        type,
      }),
  });
  return { tasks, count, isLoading, error };
}
