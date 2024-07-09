import { useSearchParams } from 'react-router-dom';
import { DEFAULT_LIMIT } from '../utils/constants';
import { TasksParamsType } from '../features/tasks/useTasks';

export const useGetSearchParams = () => {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));

  const q = searchParams.get('q') || '';
  let status = searchParams.get('status') || '';

  const sources = searchParams.getAll('source');
  const user = searchParams.getAll('user').map(Number);

  if (q) {
    status = '';
  }

  // * QUERY PARAMS FOR TASKS:

  const due = searchParams.get('due') === 'true';
  const nextWeek = searchParams.get('nextWeek') === 'true';
  const thisWeek = searchParams.get('thisWeek') === 'true';
  const toDo = searchParams.get('toDo') === 'true';
  const today = searchParams.get('today') === 'true';
  const taskType = (searchParams.get('type') || '') as TasksParamsType['type'];

  return {
    limit,
    offset,
    q,
    status,
    sources,
    user,
    due,
    nextWeek,
    thisWeek,
    toDo,
    today,
    taskType,
  };
};
