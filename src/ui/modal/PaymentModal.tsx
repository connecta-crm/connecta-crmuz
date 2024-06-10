import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { PaymentTableDataType } from '../../features/payment/PaymentTableDataType';
import { useCreatePayemnt } from '../../features/payment/useCreatePayment';
import { useUpdatePayment } from '../../features/payment/useUpdatePayment';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
export type PaymentType = {
  data: FormData;
  id: number | null;
};
export default function PaymentModal({
  openModal,
  setModal,
  setEditId,
  payment,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  payment: PaymentTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [img, setImg] = useState<Event | null>(null);
  const { create } = useCreatePayemnt();
  const { update } = useUpdatePayment();

  const createUser = (e: PaymentTableDataType) => {
    const formData = new FormData();
    formData.append('name', e.name);
    formData.append('status', e.status);
    formData.append('paymentType', e.paymentType);
    formData.append('accountName', e.accountName);
    formData.append('accountUsername ', e.accountUsername);
    formData.append('link ', e.link);
    if (img) {
      const target = img?.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      formData.append('qrCode ', file);
    }

    if (payment) {
      update(
        { data: formData, id: payment?.id },
        {
          onSuccess: () => {
            setModal(false);
            setEditId(null);
            setImg(null);
          },
        },
      );
      return;
    }

    create(formData, {
      onSuccess: () => {
        setModal(false);
        setImg(null);
      },
    });
  };

  useEffect(() => {
    if (payment) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [payment]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={!payment ? 'New Payment' : 'Payment App'}
      width="small"
      padding="15"
      open={openModal}
      hasEdit={showInput ? true : false}
      onCancel={() => {
        setModal(false);
        setEditId(null);
        setImg(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          hasEdit={payment ? true : false}
          showEdit={showEditAction}
          title="Payment app information"
        >
          <FormControl img={car} title="Name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={payment?.name}
                preserve={false}
              >
                <Input value={payment?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {payment?.name}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={payment?.status}
                preserve={false}
              >
                <Select
                  value={payment?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {payment?.status}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Type">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="paymentType"
                rules={[{ required: true, message: '' }]}
                initialValue={payment?.paymentType}
                preserve={false}
              >
                <Select
                  value={payment?.paymentType}
                  options={[
                    { value: 'zelle', label: 'Zelle' },
                    { value: 'paypal', label: 'PayPal' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {payment?.paymentType}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Account name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="accountName"
                rules={[{ required: true, message: '' }]}
                initialValue={payment?.accountName}
                preserve={false}
              >
                <Input
                  value={payment?.accountName}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {payment?.accountName}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="User name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="accountUsername"
                rules={[{ required: true, message: '' }]}
                initialValue={payment?.accountUsername}
                preserve={false}
              >
                <Input
                  value={payment?.accountUsername}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {payment?.accountUsername}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Link">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="link"
                rules={[{ required: true, type: 'url' }]}
                initialValue={payment?.link}
                preserve={false}
              >
                <Input value={payment?.link} type="link" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20 ">
                {payment?.link}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="QR code">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="qrCode"
                rules={[{ required: payment ? false : true, message: '' }]}
                // initialValue={payment?.qrCode}
                preserve={false}
              >
                <Input
                  value={payment?.qrCode}
                  type="file"
                  placeholder="Empty"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImg(e as unknown as Event)
                  }
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {payment?.qrCode}
              </span>
            )}
          </FormControl>
        </UpCollapse>

        <br />
        {payment && (
          <>
            <UpCollapse title="History ">
              {payment?.logs?.length ? (
                <>
                  {payment?.logs?.map((item: LogType, index: number) => (
                    <History
                      key={index}
                      title={item?.title}
                      message={item.message}
                    />
                  ))}
                </>
              ) : (
                <div className="d-flex justify-center history__message">
                  Not found history
                </div>
              )}
            </UpCollapse>
          </>
        )}
      </Form>
    </Modal>
  );
}
