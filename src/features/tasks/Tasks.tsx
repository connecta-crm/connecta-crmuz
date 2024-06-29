/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import TaskModal from '../../ui/modal/TaskModal';
import TaskTable from './TaskTable';
import { useTasks } from './useTasks';

function Leads() {
  useSetStatusParam('tasks');
  const { tasks, count, isLoading: isLoadingTasks } = useTasks();

  const [isOpenTaskModal, setOpenTaskModal] = useState(false);

  const handleSaveTask = () => {};

  return (
    <div className="tasks">
      <TaskTable
        guid={null}
        count={count}
        dataSource={tasks}
        sourceType="task"
        loadingList={isLoadingTasks}
        loadingItem={false}
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
