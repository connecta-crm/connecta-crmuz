/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import TaskTable from './TaskTable';
import { useLeads } from '../leads/useLeads';

function Leads() {
  useSetStatusParam('tasks');
  const { leads, count, isLoading: isLoadingTasks } = useLeads();

  const [openTaskModal, setOpenTaskModal] = useState(false);

  return (
    <div className="tasks">
      <TaskTable
        count={count}
        dataSource={leads}
        sourceType="task"
        loadingList={isLoadingTasks}
        onOpenModal={setOpenTaskModal}
      />
    </div>
  );
}

export default Leads;
