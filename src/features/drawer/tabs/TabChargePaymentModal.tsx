import { Button, Checkbox, Collapse, CollapseProps, Input } from 'antd';
import Modal from '../../../ui/Modal';

function TabChargePaymentModal({ isOpenModal, onCloseModal }) {
  const itemsForCreditCard: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <Checkbox onChange={() => {}} className="modal__input-label">
            Credit Card information
          </Checkbox>
        </div>
      ),
      children: (
        <>
          <div
            className="modal__input-label mb-5"
            style={{
              fontWeight: 700,
              fontSize: 16,
              borderBottom: '1px solid #164863',
            }}
          >
            Card details
          </div>
          <div className="mb-15">
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Card number</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">First name</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Last name</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
          </div>
          <div className="mb-15">
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Expiration date</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Security code</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
          </div>
          <div
            className="modal__input-label mb-5"
            style={{
              fontWeight: 700,
              fontSize: 16,
              borderBottom: '1px solid #164863',
            }}
          >
            Billing address
          </div>
          <div className="">
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Address</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">City</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">State</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Zip</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
          </div>
        </>
      ),
      className: 'charge-payment',
    },
    {
      key: '2',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <Checkbox onChange={() => {}} className="modal__input-label">
            Credit Card information #2
          </Checkbox>
        </div>
      ),
      children: (
        <>
          <div
            className="modal__input-label mb-5"
            style={{
              fontWeight: 700,
              fontSize: 16,
              borderBottom: '1px solid #164863',
            }}
          >
            Card details
          </div>
          <div className="mb-15">
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Card number</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">First name</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Last name</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
          </div>
          <div className="mb-15">
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Expiration date</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Security code</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
          </div>
          <div
            className="modal__input-label mb-5"
            style={{
              fontWeight: 700,
              fontSize: 16,
              borderBottom: '1px solid #164863',
            }}
          >
            Billing address
          </div>
          <div className="">
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Address</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">City</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">State</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex">
                <div className="modal__input-label pl-0">Zip</div>
              </div>
              <Input
                size="small"
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
          </div>
        </>
      ),
      className: 'charge-payment',
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
            <b>Charge</b>
          </Button>
        </div>
        <br />
        <Collapse
          ghost
          collapsible="icon"
          defaultActiveKey={['1']}
          expandIcon={() => (
            <div className="box-header__arrow-bold cursor-inherit">
              <img src="./img/drawer/down-arrow-bold.svg" alt="" />
            </div>
          )}
          items={itemsForCreditCard}
          expandIconPosition="end"
        />
      </>
    </Modal>
  );
}

export default TabChargePaymentModal;
