import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import copy from '../../../public/img/drawer/copy.svg';
import zelle from '../../../public/img/qr-code/zelle-ocean.svg';
import zellemate from '../../../public/img/qr-code/zelle-mate.svg';
import InputRow from '../../ui/form/InputRow';
import { useContractPayment } from '../contract/useContractPayment';
import { useEffect, useState } from 'react';
import { Origintype } from '../contract/contractDataTypes';
export default function Zelle() {
  const navigate = useNavigate();

  const params = useParams() as unknown as {
    id: string | number;
  };
  const [order, setOrder] = useState<Origintype>();
  const { contractpayments } = useContractPayment(true, params?.id);
  const [companyName, setCompany] = useState<'MATE' | 'OCEAN' | ''>('');
  useEffect(() => {
    if (contractpayments) {
      setOrder(contractpayments?.order);
      if (contractpayments?.company?.name.toLowerCase().includes('ocean')) {
        setCompany('OCEAN');
      }
    }
  }, [contractpayments]);

  return (
    <div className="pay">
      <div className="pay__content">
        <div className=" text-center">
          <img
            src={contractpayments?.company?.logo}
            alt=""
            className="pay__content__logo"
          />
        </div>
        <div className="pay__form">
          <div className="pay__form__header">
            {contractpayments?.company?.name}
          </div>
          <div className="pay__form__body">
            <InputRow>
              <div className="pay__form__qr-text">
                You can pay ${order ? order?.payments?.paymentReservation : 0}by clicking
                the <b>scan QR code</b> inside
                <b> Bank app </b>
                on your phone <br /> <br /> Or enter the <b>“Email”</b> below as
                a recipient.
              </div>
            </InputRow>
            <div className="text-center mt-20 mb-20">
              <img width="200px" height="200px" src={companyName=="OCEAN"?zelle:zellemate} alt="" />
            </div>

            <div className=" d-flex justify-center" style={{ gap: '10px' }}>
              <span className="pay__form__label">Account name</span>
              <span className="pay__form__text">
                {companyName == 'OCEAN'
                  ? 'Ocean Blue Logistics'
                  : 'Mate Logistics Inc'}
              </span>
            </div>
            <div
              className=" d-flex justify-center mt-10"
              style={{ gap: '10px' }}
            >
              <span className="pay__form__label">Email</span>
              <div
                className="pay__form__text d-flex"
                onClick={() => {
                  navigator.clipboard.writeText(`${companyName == 'OCEAN' ? 'payment@oceanbluego.com' : 'payment@matelogisticss.com'}`);
                  message.success('Copied');
                }}
              >
                <span className="copy__text">
                {companyName == 'OCEAN' ? 'payment@oceanbluego.com' : 'payment@matelogisticss.com'}{' '}
                   </span>
                <div className="box-header__copy cursor-pointer ml-5 __inner">
                  <img src={copy} alt="" />
                </div>
              </div>
            </div>
            <InputRow>
              <div className="pay__back__btn" onClick={() => navigate(-1)}>
                Back
              </div>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
