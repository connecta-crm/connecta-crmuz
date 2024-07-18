/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import { useState } from 'react';
import {
  LEAD_ARCHIVE_REASONS,
  ORDER_ARCHIVE_REASONS,
  QUOTE_ARCHIVE_REASONS,
} from '../../utils/constants';
import Modal from '../Modal';

function TableArchieveModal({ feature, isOpenModal, onCloseModal }) {
  const [archiveReason, setArchiveReason] = useState('');
  const handleArchive = () => {};

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
          onChange={(e) => setArchiveReason(e)}
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
