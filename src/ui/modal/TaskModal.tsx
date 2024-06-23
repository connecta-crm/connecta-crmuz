import { getUser } from '../../features/authentication/authSlice';
import TabTask from '../../features/drawer/tabs/TabTask';
import { useAppSelector } from '../../store/hooks';
import Modal from '../Modal';

type TaskModalProps = {
  isOpenModal: boolean;
  onOpenModal: (val: boolean) => void;
  onSave: () => void;
};

function TaskModal({ isOpenModal, onOpenModal, onSave }: TaskModalProps) {
  const userData = useAppSelector(getUser);
  const user = userData?.id ? Number(userData?.id) : undefined;

  const sourceId = 0,
    customer = 0; // todo
  return (
    <Modal
      title="New Task"
      width="large"
      padding="0"
      open={isOpenModal}
      onCancel={() => {
        onOpenModal(false);
      }}
      onSave={onSave}
    >
      <TabTask
        user={user}
        customer={customer}
        sourceId={sourceId}
        sourceType="task"
      />
    </Modal>
  );
}

export default TaskModal;
