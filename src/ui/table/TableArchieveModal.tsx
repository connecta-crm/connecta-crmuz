/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import { useState } from 'react';
import {
  LEAD_ARCHIVE_REASONS,
  ORDER_ARCHIVE_REASONS,
  QUOTE_ARCHIVE_REASONS,
} from '../../utils/constants';
import Modal from '../Modal';
import { useLeadArchive } from '../../features/leads/useLeadArchive';
import { useOrderArchive } from '../../features/orders/useOrderArchive';
import { useQuoteArchive } from '../../features/quotes/useQuoteArchive';

function TableArchieveModal({ feature, isOpenModal, onCloseModal }) {
  const [archieveReason, setArchieveReason] = useState('');

  const {
    leadArchive,
    isLoadingArchive: isLoadingArchive3,
    isSuccessArchive: isSuccessArchive3,
  } = useLeadArchive();
  const {
    quoteArchive,
    isLoadingArchive: isLoadingArchive2,
    isSuccessArchive: isSuccessArchive2,
  } = useQuoteArchive();
  const {
    orderArchive,
    isLoadingArchive: isLoadingArchive1,
    isSuccessArchive: isSuccessArchive1,
  } = useOrderArchive();

  const handleArchive = () => {
    switch (feature) {
      case 'lead':
        leadArchive({ guid: featureData?.guid || '', reason: archieveReason });
        break;
      case 'quote':
        quoteArchive({ guid: featureData?.guid || '', reason: archieveReason });
        break;
      case 'order':
        orderArchive({ guid: featureData?.guid || '', reason: archieveReason });
        break;
      default:
        throw new Error('Something went wrong in archiving');
    }
  };

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
