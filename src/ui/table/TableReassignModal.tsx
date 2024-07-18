/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import { useState } from 'react';
import { REASSIGN_USERS_REASONS } from '../../utils/constants';
import Modal from '../Modal';

function TableReassignModal({ isOpenModal, onCloseModal }) {
  const [reassignReason, setReassignReason] = useState('');
  const handleReassign = () => {};
  return (
    <Modal
      title="Why are you reassigning?"
      open={isOpenModal}
      onCancel={onCloseModal}
      width="small"
      padding="15"
      onSave={handleReassign}
      loading={false}
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
          loading={false}
          options={REASSIGN_USERS_REASONS}
        />
      </div>
    </Modal>
  );
}

export default TableReassignModal;
