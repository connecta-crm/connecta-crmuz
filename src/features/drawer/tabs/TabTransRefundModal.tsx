import { Button, Input, Select } from 'antd';
import Modal from '../../../ui/Modal';

function TabTransRefundModal({ isOpenModal, onCloseModal }) {
  return (
    <Modal
      title="View a transaction"
      width="small"
      padding="15"
      open={isOpenModal}
      hasEdit
      onCancel={onCloseModal}
    >
      <>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Amount</div>
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
            <div className="modal__input-label pl-0">Payment type</div>
          </div>
          <div className="modal__single-text">Credit Card</div>
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
        <div className="d-flex justify-between mb-20">
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
        <Button type="primary" style={{ width: '100%' }} size="middle">
          <b>Submit</b>
        </Button>
        <div className="mt-20">
          <div className="mb-20">
            <h3 className="text-center f-16 font-bold">
              This transaction has been approved via Zelle
            </h3>
            <div className="d-flex align-center justify-between f-15">
              <p style={{ color: '#086ed6', fontSize: 16 }}>Successful</p>{' '}
              <span style={{ color: '#02a858' }}>$200.00</span>
              <div style={{ color: '#21232c' }}>03/14/2024 03:23 PM</div>
            </div>
          </div>
          <div className="">
            <h3 className="text-center f-16 font-bold">
              This transaction has been approved via Zelle
            </h3>
            <div className="d-flex align-center justify-between f-15">
              <p style={{ color: '#e52e2e', fontSize: 16 }}>Unsuccessful</p>{' '}
              <span style={{ color: '#02a858' }}>$300.00</span>
              <div style={{ color: '#21232c' }}>03/14/2024 03:23 PM</div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default TabTransRefundModal;
