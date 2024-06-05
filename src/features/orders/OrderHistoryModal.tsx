/* eslint-disable @typescript-eslint/no-unused-vars */
import History from '../../ui/History';
import Modal from '../../ui/Modal';
import { OrderModalProps } from './OrderDispatchModal';

function OrderHistoryModal({ isOpenModal, onOpenModal }: OrderModalProps) {
  return (
    <Modal
      title="History"
      width="small"
      padding="15"
      hasEdit
      open={isOpenModal}
      onCancel={() => {
        onOpenModal(false);
      }}
    >
      <div className="mt-10">
        <History title="Order History" message="lorem123 343 4443" />
        <History title="Order History" message="lorem123 343 4443" />
        <History title="Order is created on March 11, 2024 09:01 AM by Ali.Brian.ML" />
      </div>
    </Modal>
  );
}

export default OrderHistoryModal;
