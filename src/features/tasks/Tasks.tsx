/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import TaskModal from '../../ui/modal/TaskModal';
import { TaskTableData } from '../../utils/table';
import { useLeads } from '../leads/useLeads';
import TaskTable from './TaskTable';

function Leads() {
  useSetStatusParam('tasks');
  const { leads, count, isLoading: isLoadingTasks } = useLeads();

  const [isOpenTaskModal, setOpenTaskModal] = useState(false);

  const handleSaveTask = () => {};

  return (
    <div className="tasks">
      <TaskTable
        count={count}
        dataSource={TaskTableData}
        sourceType="task"
        loadingList={isLoadingTasks}
        onOpenModal={setOpenTaskModal}
      />
      <TaskModal
        onSave={handleSaveTask}
        isOpenModal={isOpenTaskModal}
        onOpenModal={setOpenTaskModal}
      />
    </div>
  );
}

export default Leads;
