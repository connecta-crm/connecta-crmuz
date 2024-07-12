/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  GetProp,
  Image,
  Input,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import Modal from '../../../ui/Modal';
import {
  PAYMENT_BROKER_DIRECTIONS,
  PAYMENT_CARRIER_TYPES,
  PAYMENT_CHARGE_TYPES,
  PAYMENT_TYPES,
} from '../../../utils/constants';
import { useOrderAttachCreate } from '../../orders/useOrderAttachCreate';
import { useOrderPaymentAttachs } from '../../orders/useOrderPaymentAttachs';

type AttachmentData = {
  id: number;
  executedOn: string;
  name: string;
  quantity: number;
  amount: string;
  amountCharged: string;
  discount: string;
  paymentType: string;
  surchargeFeeRate: number;
  chargeType: string;
  direction: string;
  createdAt: string;
  status: string;
  order: string;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function TabAttachModal({
  data,
  orderId,
  isOpenModal,
  onCloseModal,
}: {
  data: AttachmentData;
}) {
  const [attachment, setAttachment] = useState({
    amount: '',
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { createOrderAttach, isLoading, createdOrderAttachData } =
    useOrderAttachCreate();

  const { orderPaymentAttachs, isLoadingOrderPaymentAttachs } =
    useOrderPaymentAttachs(data.id, data.status === 'paid');

  const handleUpload: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  useEffect(() => {
    if (data) {
      setAttachment(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && createdOrderAttachData) {
      setFileList([]);
      onCloseModal();
    }
  }, [isLoading, createdOrderAttachData]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleSave = () => {
    const { amount } = attachment;
    const image = fileList?.[0];

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('image', image?.originFileObj as FileType); // image?.originFileObj as FileType
    formData.append('orderPayment', data.id);
    formData.append('creditCard', '');
    createOrderAttach(formData);
  };

  return (
    <Modal
      title={data.status === 'paid' ? 'Attached payment' : 'Attach a payment'}
      width="small"
      padding="15"
      open={isOpenModal}
      onCancel={() => {
        onCloseModal();
        setAttachment(data);
      }}
      loading={isLoading}
      hasEdit={!(fileList?.length > 0) || data.status === 'paid'}
      onSave={handleSave}
    >
      <>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Name</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {
              PAYMENT_CARRIER_TYPES.find((item) => item.value === data.name)
                ?.label
            }
          </div>
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Quantity</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {data.quantity}
          </div>
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Amount</div>
          </div>
          {data.status === 'paid' ? (
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              ${data.amount}
            </div>
          ) : (
            <Input
              size="small"
              type="number"
              placeholder="$0.000.00"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              value={attachment.amount}
              onChange={({ target: { value: amount } }) =>
                setAttachment((prev) => ({
                  ...prev,
                  amount,
                }))
              }
            />
          )}
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Discount</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            ${data.discount}
          </div>
        </div>
        <br />
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Payment type</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {
              PAYMENT_TYPES.find((item) => item.value === data.paymentType)
                ?.label
            }
          </div>
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Surcharge fee rate</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {data.surchargeFeeRate}%
          </div>
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Charge type</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {
              PAYMENT_CHARGE_TYPES.find(
                (item) => item.value === data.chargeType,
              )?.label
            }
          </div>
        </div>
        <div className="d-flex justify-between mb-20">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Direction</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {
              PAYMENT_BROKER_DIRECTIONS.find(
                (item) => item.value === data.direction,
              )?.label
            }
          </div>
        </div>
        {data.status === 'paid' ? (
          <Button
            type="primary"
            style={{
              width: '100%',
              cursor: 'inherit',
              backgroundColor: 'rgb(66, 125, 157)',
            }}
            size="middle"
          >
            <b>Attached</b>
          </Button>
        ) : (
          <ImgCrop rotationSlider>
            <Upload
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              listType="picture-card"
              style={{ width: '100%' }}
              onPreview={handlePreview}
              onChange={handleUpload}
            >
              {fileList?.length > 0 ? null : (
                <Button type="primary" style={{ width: '100%' }} size="middle">
                  <b>Attach a receipt</b>
                </Button>
              )}
            </Upload>
          </ImgCrop>
        )}
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}

        {data.status === 'paid' && isLoadingOrderPaymentAttachs && (
          <div className="text-center mt-10">
            <Spin />
          </div>
        )}
        {data.status === 'paid' &&
          !isLoadingOrderPaymentAttachs &&
          orderPaymentAttachs?.map((attach, index) => (
            <div key={index} className="mt-20">
              <div className="mb-20">
                <h3 className="text-center f-16 font-bold">
                  This transaction has been recorder via{' '}
                  <b style={{ color: '#427d9d' }}>
                    {
                      PAYMENT_TYPES.find(
                        (item) => item.value === data.paymentType,
                      )?.label
                    }
                  </b>
                </h3>
                <div className="d-flex align-center justify-between f-15">
                  <p style={{ color: '#086ed6', fontSize: 16 }}>Successful</p>{' '}
                  <span style={{ color: '#02a858' }}>${attach.amount}</span>
                  <div style={{ color: '#21232c' }}> {data.executedOn}</div>
                  {/* 03/14/2024 03:23 PM */}
                </div>
              </div>
              <p className="px-35">
                {attach?.image ? (
                  <Image.PreviewGroup items={[attach.image]}>
                    <Image
                      loading="lazy"
                      width={'100%'}
                      src={attach.image}
                      fallback="data:image/png;base64,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"
                    />
                  </Image.PreviewGroup>
                ) : (
                  <p className="text-center">No image</p>
                )}
              </p>
            </div>
          ))}
      </>
    </Modal>
  );
}

export default TabAttachModal;
