import { message } from 'antd';
import { Link } from 'react-router-dom';
import copy from '../../../public/img/drawer/copy.svg';
import img from '../../../public/img/payment.png';
import paypal from '../../../public/img/qr-code/paypal.svg';
import InputRow from '../../ui/form/InputRow';
export default function Paypal() {
  return (
    <div className="pay">
      <div className="pay__content">
        <div className=" text-center">
          <img src={img} alt="" className="pay__content__logo" />
        </div>
        <div className="pay__form">
          <div className="pay__form__header">Ocean Blue Logistics Inc</div>
          <div className="pay__form__body">
            <InputRow>
              <div className="pay__form__qr-text">
                You can pay $200.00 by clicking the <b>scan QR code</b> inside
                <b> PayPal app </b>
                on your phone <br /> <br /> Or enter the <b>“Username”</b> below
                as a recipient.
              </div>
            </InputRow>
            <div className="text-center mt-20 mb-20">
              <img width="200px" height="200px" src={paypal} alt="" />
            </div>

            <div className=" d-flex justify-center" style={{ gap: '10px' }}>
              <span className="pay__form__label">Account name</span>
              <span className="pay__form__text">Ocean Blue Logistics</span>
            </div>
            <div
              className=" d-flex justify-center mt-10"
              style={{ gap: '10px' }}
            >
              <span className="pay__form__label">Username</span>
              <div
                className="pay__form__text d-flex"
                onClick={() => {
                  navigator.clipboard.writeText('@oceanbluego');
                  message.success('Copied');
                }}
              >
                <span className="copy__text">@oceanbluego</span>
                <div className="box-header__copy cursor-pointer ml-5 __inner">
                  <img src={copy} alt="" />
                </div>
              </div>
            </div>
            <InputRow>
              <Link className="pay__back__btn" to="/contract/pay">
                Back
              </Link>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
