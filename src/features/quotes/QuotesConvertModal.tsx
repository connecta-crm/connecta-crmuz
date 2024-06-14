import Modal from '../../ui/Modal';
import { ModalProps } from '../orders/OrderDispatchModal';
import QuoteConvertModalContent from './QuoteConvertModalContent';

function QuotesConvertModal({ isOpenModal, onOpenModal }: ModalProps) {
  const handleSaveConvert = () => {};
  const isLoading = false;

  return (
    <Modal
      title="Converting to order"
      width="middle"
      padding="0"
      loading={isLoading}
      open={isOpenModal}
      onCancel={() => {
        onOpenModal(false);
      }}
      onSave={handleSaveConvert}
    >
      <QuoteConvertModalContent />
    </Modal>
  );
}

export default QuotesConvertModal;
