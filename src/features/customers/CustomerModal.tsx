import { Input } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import { useCreateCustomer } from './useCreateCustomer';

type CustomerModalProps = {
  openModal: boolean;
  onOpenModal: (val: boolean) => void;
};

function CustomerModal({ openModal, onOpenModal }: CustomerModalProps) {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
    lastName: '',
  });

  const { create, isLoading, isSuccess } = useCreateCustomer();

  const handleSave = () => {
    create({ ...customerData });
  };

  const handleChange = (field: string, value: string) => {
    setCustomerData({ ...customerData, [field]: value });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      onOpenModal(false);
    }
  }, [isLoading, isSuccess]);

  return (
    <Modal
      title="New Customer"
      onCancel={() => {
        onOpenModal(false);
      }}
      onSave={handleSave}
      width="small"
      padding="15"
      loading={isLoading}
      open={openModal}
    >
      <div className="customer-modal">
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 21 }}>
              <img src={`./img/drawer/user.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Name</div>
          </div>
          <Input
            value={customerData.name}
            defaultValue={customerData.name}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex align-center">
            <div
              className="d-flex align-center"
              style={{ width: 18, height: 20 }}
            >
              <img src={`./img/drawer/user.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Last Name</div>
          </div>
          <Input
            value={customerData.lastName}
            defaultValue={customerData.lastName}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex align-center">
            <div
              className="d-flex align-center"
              style={{ width: 18, height: 20 }}
            >
              <img src={`./img/drawer/mail.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Email</div>
          </div>
          <Input
            value={customerData.email}
            defaultValue={customerData.email}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 20 }}>
              <img src={`./img/drawer/phone.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Phone</div>
          </div>
          <Input
            value={customerData.phone}
            defaultValue={customerData.phone}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        <div className="mt-10">
          <div className="form-label pl-0">Note about the customer</div>
          <Input
            value={customerData.note}
            defaultValue={customerData.note}
            size="small"
            style={{ width: '100%', float: 'inline-end', height: 24 }}
            onChange={(e) => handleChange('note', e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default CustomerModal;
