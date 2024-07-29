/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGroupReassign } from '../../features/group-actions/useGroupReassign';
import { REASSIGN_USERS_REASONS } from '../../utils/constants';
import Modal from '../Modal';

function TableReassignModal({
  ids,
  sourceType,
  reassignUserId,
  isOpenModal,
  onCloseModal,
}) {
  const [reassignReason, setReassignReason] = useState('');
  const { groupReassign, isLoading } = useGroupReassign();

  const handleReassign = () => {
    groupReassign({
      endpointType: sourceType === 'lead' ? 'leads' : sourceType,
      user: reassignUserId,
      reason: reassignReason,
      ids,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      onCloseModal();
    }
  }, [isLoading]);

  return (
    <Modal
      title="Why are you reassigning?"
      open={isOpenModal}
      onCancel={onCloseModal}
      width="small"
      padding="15"
      onSave={handleReassign}
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
          onChange={(e) => setReassignReason(e)}
          style={{ width: 218 }}
          disabled={isLoading}
          options={REASSIGN_USERS_REASONS}
        />
      </div>
    </Modal>
  );
}

export default TableReassignModal;
