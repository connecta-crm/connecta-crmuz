import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Attachments from '../../services/attachments';
import { DEFAULT_LIMIT } from '../../utils/constants';

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
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));
  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));
  const q = searchParams.get('q') || '';
  const due = searchParams.get('due') === 'true';
  const nextWeek = searchParams.get('nextWeek') === 'true';
  const thisWeek = searchParams.get('thisWeek') === 'true';
  const toDo = searchParams.get('toDo') === 'true';
  const today = searchParams.get('today') === 'true';
  const type = (searchParams.get('type') || '') as TasksParamsType['type'];
  const user = searchParams.getAll('user').map(Number);

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
