import { Input, Select } from 'antd';
import Modal from '../../../ui/Modal';

function TabCreatePaymentModal({ isOpenModal, onCloseModal }) {
  const handleSave = () => {
    console.log('save');
  };

  return (
    <Modal
      title="Create a payment"
      width="small"
      padding="15"
      open={isOpenModal}
      onCancel={onCloseModal}
      onSave={handleSave}
    >
      <>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Name</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select name"
            onChange={() => {}}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={[]}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Quantity</div>
          </div>
          <Input
            size="small"
            placeholder="Enter quantity"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            onChange={() => {}}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Amount</div>
          </div>
          <Input
            size="small"
            placeholder="$0.000.00"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            onChange={() => {}}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Discount</div>
          </div>
          <Input
            size="small"
            placeholder="$0.00"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            onChange={() => {}}
          />
        </div>
        <br />
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Payment type</div>
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
            <div className="modal__input-label pl-0">Surcharge fee rate</div>
          </div>
          <Input
            size="small"
            placeholder="Empty"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            onChange={() => {}}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Charge type</div>
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
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Direction</div>
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
      </>
    </Modal>
  );
}

export default TabCreatePaymentModal;
