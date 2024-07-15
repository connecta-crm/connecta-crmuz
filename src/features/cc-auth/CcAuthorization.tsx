import { Link, useParams } from 'react-router-dom';
import card from '../../../public/img/card/cards.svg';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import { useEffect, useState } from 'react';
import { Origintype } from '../contract/contractDataTypes';
import { useContractPayment } from '../contract/useContractPayment';
export default function CcAuthorization() {
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

  return (
    <div className="pay">
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
            {contractpayments
              ? contractpayments?.company?.name
              : '...'}
          </div>
          <div className="pay__form__body">
            <InputRow>
              <div className="pay__cc__text">
                Please fill out the <b> Credit Card Authorization </b> form to
                pay for your auto transportation. <br /> <br /> You can use this
                payment method for now and future auto transport needs.
              </div>
            </InputRow>

            <div className="mt-10"></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Name</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  {order ? order?.customer?.name : '...'}
                </span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Email</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  {order ? order?.customer?.email : '...'}
                </span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Phone number</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  {' '}
                  {order ? order?.customer?.phone : '...'}
                </span>
              </InputCol>
            </InputRow>
            <div className="mt-10"></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Order ID</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  {' '}
                  {order ? order?.id : '...'}
                </span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Vehicle</span>
              </InputCol>
              <InputCol>
                <div>
                  {order?.orderVehicles.map((item) => (
                    <div className="pay__form__text" key={item.id}>
                      {order ? (
                        <>
                          {item.vehicleYear} {item?.vehicle?.mark?.name}{' '}
                          {item.vehicle.name}
                        </>
                      ) : (
                        '...'
                      )}
                    </div>
                  ))}
                </div>
              </InputCol>
            </InputRow>
            <div className="mt-10"></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Payment method</span>
              </InputCol>
              <InputCol>
                <div className="d-flex align-center">
                  <span className="pay__form__text mr-5">
                    Credit/Debit Card{' '}
                  </span>
                  <img width={68} height={14} src={card} alt="" />
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Amount</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  ${order ? order?.reservationPrice : 0}
                </span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Surcharge fee</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  ${order ? (order?.reservationPrice * 5) / 100 : 0}
                </span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Total amount:</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">
                  $
                  {order
                    ? (Number(order?.reservationPrice) * 5) / 100 +
                      Number(order?.reservationPrice)
                    : 0}
                </span>
              </InputCol>
            </InputRow>

            <InputRow>
              <div className="pay__form__footer">
                I authorize <b> Mate Logistics Inc </b> to charge the credit
                card indicated in this authorization form according to the above
                mentioned terms. This payment authorization is for the
                goods/services described above, for the amount indicated above
                and the agreement under this “Order ID” only. <br /> <br /> I
                certify that I am an authorized user of this credit card and
                will not dispute the payment with my credit card company; so
                long as the transaction corresponds to the terms indicated in
                the agreement.
              </div>
            </InputRow>

            <InputRow>
              <Link
                className="pay__form__btn mt-10 "
                to={'/contract/cc-debit/card/' + params?.id}
              >
                Fill out a form now
              </Link>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
