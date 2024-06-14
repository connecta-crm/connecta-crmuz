import { LogType } from '../features/dstribution/DistributionDataType';
import History from './History';
import Modal from './Modal';

type HistoryModalProps = {
  isOpenModal: boolean;
  historyLogs: LogType[];
  onOpenModal: (val: boolean) => void;
};

function HistoryModal({
  isOpenModal,
  historyLogs,
  onOpenModal,
}: HistoryModalProps) {
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
        {historyLogs?.length ? (
          <>
            {historyLogs?.map((item: LogType, index: number) => (
              <History key={index} title={item?.title} message={item.message} />
            ))}
          </>
        ) : (
          <div className="d-flex justify-center history__message">
            Not found history
          </div>
        )}
      </div>
    </Modal>
  );
}

export default HistoryModal;
