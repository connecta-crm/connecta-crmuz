import { Button, Input, Select } from 'antd';
import Modal from '../../../ui/Modal';

function TabPaymentAttachModal({ isOpenModal, onCloseModal }) {
  return (
    <Modal
      title="Attach a payment"
      width="small"
      padding="15"
      hasEdit
      open={isOpenModal}
      onCancel={onCloseModal}
    >
      <>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="form-label detail__label pl-0">Amount</div>
          </div>
          <Input
            size="small"
            placeholder="Enter amount"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            onChange={() => {}}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="form-label detail__label pl-0">Payment type</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select payment type"
            onChange={() => {}}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={[]}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="form-label detail__label pl-0">Charge type</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select charge type"
            onChange={() => {}}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={[]}
          />
        </div>
        <div className="d-flex justify-between mb-20">
          <div className="d-flex">
            <div className="form-label detail__label pl-0">Direction</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select direction"
            onChange={() => {}}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={[]}
          />
        </div>
        <Button type="primary" style={{ width: '100%' }} size="middle">
          Attach a receipt
        </Button>
      </>
    </Modal>
  );
}

export default TabPaymentAttachModal;
