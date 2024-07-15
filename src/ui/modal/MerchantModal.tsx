import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { MerchantTableDataType } from '../../features/merchant/merchantTableDataType';
import { useCreateMerchant } from '../../features/merchant/useCreateMerchant';
import { useUpdateMerchant } from '../../features/merchant/useUpdateMerchant';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function MerchantModal({
  openModal,
  setModal,
  setEditId,
  merchant,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  merchant: MerchantTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [type, setType] = useState<'authorize' | 'firstdata' | 'paypal' | null>(
    null,
  );
  const { create } = useCreateMerchant();
  const { update } = useUpdateMerchant();

  const createUser = (e: MerchantTableDataType) => {
    if (merchant) {
      e.id = merchant.id;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
          setType(null);
        },
      });

      return;
    }
    create(e, {
      onSuccess: () => {
        setModal(false);
        setType(null);
      },
    });
  };

  useEffect(() => {
    if (merchant) {
      setShowInput(true);
      setType(merchant.merchantType);
      return;
    }
    setShowInput(false);
  }, [merchant]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={!merchant ? 'New Merchant' : 'Merchant'}
      width="small"
      padding="15"
      open={openModal}
      hasEdit={showInput ? true : false}
      onCancel={() => {
        setModal(false);
        setEditId(null);
        setType(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          hasEdit={merchant ? true : false}
          showEdit={showEditAction}
          title="Merchant information"
        >
          <FormControl img={car} title="Name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={merchant?.name}
                preserve={false}
              >
                <Input value={merchant?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{merchant?.name}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={merchant?.status}
                preserve={false}
              >
                <Select
                  value={merchant?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{merchant?.status}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Type">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="merchantType"
                rules={[{ required: true, message: '' }]}
                initialValue={merchant?.merchantType}
                preserve={false}
              >
                <Select
                  value={merchant?.merchantType}
                  onChange={(value) => setType(value)}
                  options={[
                    { value: 'authorize', label: 'Authorize' },
                    { value: 'firstdata', label: 'Firstdata' },
                    { value: 'paypal', label: 'PayPal' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{merchant?.merchantType}</span>
            )}
          </FormControl>
          {type === 'authorize' && (
            <>
              <FormControl img={car} title="Login">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="authorizeLogin"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.authorizeLogin}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.authorizeLogin}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.authorizeLogin}</span>
                )}
              </FormControl>
              <FormControl img={car} title="Password">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="authorizePassword"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.authorizePassword}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.authorizePassword}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.authorizePassword}</span>
                )}
              </FormControl>
              <FormControl img={car} title="Pin code">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="authorizePinCode"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.authorizePinCode}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.authorizePinCode}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.authorizePinCode}</span>
                )}
              </FormControl>
            </>
          )}

          {type === 'firstdata' && (
            <>
              <FormControl img={car} title="Gateway ID">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="firstdataGatewayId"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.firstdataGatewayId}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.firstdataGatewayId}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.firstdataGatewayId}</span>
                )}
              </FormControl>
              <FormControl img={car} title="Password">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="firstdataPassword"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.firstdataPassword}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.firstdataPassword}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.firstdataPassword}</span>
                )}
              </FormControl>
              <FormControl img={car} title="Key ID">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="firstdataKeyId"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.firstdataKeyId}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.firstdataKeyId}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.firstdataKeyId}</span>
                )}
              </FormControl>
              <FormControl img={car} title="HMAC key">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="firstdataHmacKey"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.firstdataHmacKey}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.firstdataHmacKey}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.firstdataHmacKey}</span>
                )}
              </FormControl>
            </>
          )}
          {type === 'paypal' && (
            <>
              <FormControl img={car} title="Secret Key">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100 "
                    name="paypalSecretKey"
                    rules={[{ required: true, message: '' }]}
                    initialValue={merchant?.paypalSecretKey}
                    preserve={false}
                  >
                    <Input
                      value={merchant?.paypalSecretKey}
                      type="text"
                      placeholder="Empty"
                    />
                  </FormItem>
                ) : (
                  <span className=" ml-20">{merchant?.paypalSecretKey}</span>
                )}
              </FormControl>
            </>
          )}
        </UpCollapse>
        <br />
        {merchant && (
          <>
            <UpCollapse title="History ">
              {merchant?.logs?.length ? (
                <>
                  {merchant?.logs?.map((item: LogType, index: number) => (
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
