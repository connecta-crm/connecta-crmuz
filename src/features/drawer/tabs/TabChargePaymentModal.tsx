import { Button, Checkbox, Collapse, CollapseProps, Input } from 'antd';
import Modal from '../../../ui/Modal';

function TabChargePaymentModal({ isOpenModal, onCloseModal }) {
  const itemsForCreditCard: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label d-flex align-center">
            <Checkbox onChange={() => {}}>Credit Card information</Checkbox>
          </span>
          <div className="d-flex align-center charge-payment">
            <div className="detail__btns d-flex align-center pr-0">
              <div className="box-header__arrow-bold cursor-inherit">
                <img src="./img/drawer/down-arrow-bold.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      ),
      children: (
        <>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Address</div>
            </div>
            <Input
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
            />
          </div>
        </>
      ),
      showArrow: false,
    },
  ];

  return (
    <Modal
      title="Charge a payment"
      width="small"
      padding="0"
      open={isOpenModal}
      hasEdit
      onCancel={onCloseModal}
    >
      <>
        <div style={{ padding: 15 }}>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Amount</div>
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
              <div className="modal__input-label pl-0">Payment type</div>
            </div>
            <div className="detail__text">
              <span></span>
            </div>
            <div className="modal__single-text">Credit Card</div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Charge type</div>
            </div>
            <div className="modal__single-text">Charge</div>
          </div>
          <div className="d-flex justify-between mb-20">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Direction</div>
            </div>
            <div className="modal__single-text">Customer to Broker</div>
          </div>
          <Button type="primary" style={{ width: '100%' }} size="middle">
            Charge
          </Button>
        </div>
        <br />
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          // expandIcon={DrawerArrowIcon}
          items={itemsForCreditCard}
        />
      </>
    </Modal>
  );
}

export default TabChargePaymentModal;
