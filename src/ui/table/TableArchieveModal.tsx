/* eslint-disable @typescript-eslint/no-unused-vars */
import { message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGroupArchieve } from '../../features/group-actions/useGroupArchieve';
import {
  LEAD_ARCHIVE_REASONS,
  ORDER_ARCHIVE_REASONS,
  QUOTE_ARCHIVE_REASONS,
} from '../../utils/constants';
import Modal from '../Modal';

function TableArchieveModal({ ids, feature, isOpenModal, onCloseModal }) {
  const [archieveReason, setArchieveReason] = useState('');

  const { groupArchieve, isLoading, isSuccess } = useGroupArchieve(feature);

  const handleArchive = () => {
    if (!archieveReason) {
      message.warning('Provide a reason to archieve!');
      return;
    }
    groupArchieve({
      ids,
      reason: archieveReason,
      endpointType: feature === 'lead' ? 'leads' : feature,
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      onCloseModal();
    }
  }, [isLoading, isSuccess]);

  return (
    <Modal
      title="Reason To Archive"
      open={isOpenModal}
      onCancel={onCloseModal}
      width="small"
      padding="15"
      saveBtnText="Archive"
      onSave={handleArchive}
      saveBtnDanger
      loading={isLoading}
    >
      <div className="d-flex justify-between">
        <div className="d-flex">
          <div className="form-label pl-0">Reason</div>
        </div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Select reason"
          onChange={(e) => setArchieveReason(e)}
          style={{ width: 218 }}
          loading={false}
          options={
            feature === 'quote'
              ? QUOTE_ARCHIVE_REASONS
              : feature === 'order'
                ? ORDER_ARCHIVE_REASONS
                : feature === 'lead'
                  ? LEAD_ARCHIVE_REASONS
                  : []
          }
        />
      </div>
    </Modal>
  );
}

export default TableArchieveModal;
