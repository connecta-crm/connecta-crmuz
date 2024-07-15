import { Input, message, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import deleteFile from '../../../public/img/delete.svg';
import file from '../../../public/img/drawer/tab/file.svg';
import imgLogo from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import { useEffect, useState } from 'react';
import { Origintype } from '../contract/contractDataTypes';
import { useContractPayment } from '../contract/useContractPayment';
import { useNavigate } from 'react-router-dom';
import { useCreateCard } from '../contract/useCreateCard';
export default function CcDebePicture() {
  const navigate = useNavigate();
  const [frontImg, setFrontImg] = useState<Event | null>(null);
  const [backImg, setBackImg] = useState<Event | null>(null);
  const card = localStorage.getItem('cardInfo');

  const params = useParams() as unknown as {
    id: string | number;
  };
  const [order, setOrder] = useState<Origintype>();
  const { contractpayments } = useContractPayment(true, params?.id);

  useEffect(() => {
    if (contractpayments) {
      setOrder(contractpayments?.order);
    }
  }, [contractpayments]);
  const { create,isLoadingCard } = useCreateCard();
  const onFinish = () => {
    if (frontImg && backImg) {

      const targetFront = frontImg?.target as HTMLInputElement;
      const fileFront: File = (targetFront.files as FileList)[0];
      const targetBack = backImg?.target as HTMLInputElement;
      const fileBack: File = (targetBack.files as FileList)[0];

      const data = JSON.parse(card);
      data.ccFrontImgFile = fileFront;
      data.ccBackImgFile = fileBack;
      data.order = order?.guid;
      const formData = new FormData();
      formData.append('signFile', data?.signFile);
      formData.append('ccFrontImgFile', data?.ccFrontImgFile);
      formData.append('ccBackImgFile', data?.ccBackImgFile);
      formData.append('cardNumber', data?.cardNumber);
      formData.append('firstName', data?.firstName);
      formData.append('lastName', data?.lastName);
      formData.append('expirationDate', data?.expirationDate);
      formData.append('cvv', data?.cvv);
      formData.append('billingAddress', data?.billingAddress);
      formData.append('billingCity', data?.billingCity);
      formData.append('billingState', data?.billingState);
      formData.append('billingZip', data?.billingZip);
      formData.append('order', data?.order);

      create(formData, {
        onSuccess: () => {
          localStorage.removeItem('cardInfo');
          navigate('/contract/cc-phone/phone/' + params?.id);
        },
      });

      return;
    }
    message.warning('Choose picture ');
  };

  return (
    <div className="pay cc-debet">
      <div className="pay__content">
        <div className=" text-center">
          <img
            src={contractpayments ? contractpayments?.company?.logo : imgLogo}
            alt=""
            className="pay__content__logo"
          />
        </div>
        <div className="pay__form">
          <div className="pay__form__header">
            {contractpayments ? contractpayments?.company?.name : '...'}
          </div>
          <div className="pay__form__body">
            <div className="pay__form__label mt-10">
              <b>Valid picture of the card</b>
            </div>

            <br />
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Front of the card</span>
              </InputCol>
              <InputCol>
                <div className="payment-attach d-flex justify-end w-100">
                  <Input
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    placeholder="Empty"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFrontImg(e as unknown as Event)
                    }
                  />
                  <div className="payment-attach-btn">Attach</div>
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              {frontImg && (
                <div className="d-flex pay__form__img-action justify-between w-100 mb-10">
                  <div className="d-flex align-center">
                    <img width={'20'} height={'20'} src={file} alt="" />
                    <span className="ml-5">IMG_01</span>
                  </div>
                  <div className="pay__form__delete d-flex">
                    <img
                      width={'14'}
                      src={deleteFile}
                      alt=""
                      onClick={() => setFrontImg(null)}
                    />
                  </div>
                </div>
              )}
            </InputRow>

            <InputRow>
              <InputCol>
                <span className="pay__form__label">Back of the card</span>
              </InputCol>
              <InputCol>
                <div className="payment-attach d-flex justify-end w-100">
                  <Input
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    placeholder="Empty"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBackImg(e as unknown as Event)
                    }
                  />
                  <div className="payment-attach-btn">Attach</div>
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              {backImg && (
                <div className="d-flex pay__form__img-action justify-between w-100 mb-10">
                  <div className="d-flex align-center">
                    <img width={'20'} height={'20'} src={file} alt="" />
                    <span className="ml-5">IMG_02</span>
                  </div>
                  <div className="pay__form__delete d-flex">
                    <img
                      width={'14'}
                      src={deleteFile}
                      alt=""
                      onClick={() => setBackImg(null)}
                    />
                  </div>
                </div>
              )}
            </InputRow>
            <InputRow>
              <div
                onClick={() => navigate(-1)}
                className="pay__form__prev mt-10 "
              >
                Back
              </div>
              <div
                className="pay__form__next mt-10 cursor-pointer "
                onClick={onFinish}
                // to={'/contract/cc-phone'}
              >
                <> {isLoadingCard&&<Spin/>}  Submit</>
              </div>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
