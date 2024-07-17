import { useParams } from 'react-router-dom';
import img from '../../../public/img/payment.png';
import InputRow from '../../ui/form/InputRow';
import { Origintype } from '../contract/contractDataTypes';
import { useEffect, useState } from 'react';
import { useContractPayment } from '../contract/useContractPayment';
export default function CcDebePhone() {
  const params = useParams() as unknown as {
    id: string | number;
  };
  const [order, setOrder] = useState<Origintype>();
  const { contractpayments } = useContractPayment(true, params?.id);
 console.log(order);
 
  useEffect(() => {
    if (contractpayments) {
      setOrder(contractpayments?.order);
    }
  }, [contractpayments]);
  return (
    <div className="pay cc-debet">
      <div className="pay__content">
        <div className=" text-center">
          <img
            src={contractpayments ? contractpayments?.company?.logo : img}
            alt=""
            className="pay__content__logo"
          />
        </div>
        <div className="pay__form">
          <div className="pay__form__header">
            {contractpayments ? contractpayments?.company?.name : '...'}
          </div>
          <div className="pay__form__body">
            <InputRow>
              <div className="pay__form__text " style={{ textAlign: 'center' }}>
                Thank you for completing credit card authorization form. We
                greatly appreciate your cooperation and promptness in completing
                this necessary step. <br /> <br />
                Your transaction is now being processed securely. If you have
                any further questions or concerns, please don't hesitate to
                reach out to your individual advisor or support team below.{' '}
                <br /> <br />
                We value your trust and look forward to serving you again in the
                future. Thank you for choosing <br /> <b>{contractpayments ? contractpayments?.company?.name : '...'}</b>
              </div>
            </InputRow>

            <InputRow>
              <a
                className="pay__form__next mt-10 "
                href={'tel:' + contractpayments?.company?.mainline}
              >
                Call {contractpayments?.company?.mainline}
              </a>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
