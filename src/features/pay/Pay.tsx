import { Form, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
export default function Pay() {
  const [methodValue, setMethodValue] = useState<
    'zelle' | 'cashapp' | 'venmo' | 'paypal' | null
  >(null);
  const navigate = useNavigate();

  const onChange = () => {
    if (methodValue == 'cashapp') {
      window.open('https://cash.app/$OCEANBLUEGO');
      return;
    }
    if (methodValue == 'paypal') {
      window.open('https://paypal.me/oceanbluego');
      return;
    }
    if (methodValue == 'venmo') {
      window.open('https://venmo.com/u/oceanbluego');
      return;
    }
  };

  const openQrCode = () => {
    if (methodValue == 'cashapp') {
      navigate('cashapp');
      return;
    }
    if (methodValue == 'paypal') {
      navigate('paypal');
      return;
    }
    if (methodValue == 'venmo') {
      navigate('venmo');
      return;
    }
    if (methodValue == 'zelle') {
      navigate('zelle');
      return;
    }
  };

  return (
    <div className="pay">
      <div className="pay__content">
        <div className=" text-center">
          <img src={img} alt="" className="pay__content__logo" />
        </div>
        <Form className="pay__form">
          <div className="pay__form__header">Ocean Blue Logistics Inc</div>
          <div className="pay__form__body">
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Name</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">Adam Smith</span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Email</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">youremail@gmail.com</span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Phone number</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">(929) 929-9292</span>
              </InputCol>
            </InputRow>
            <div className='mt-20'></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Order ID</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">101001</span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Vehicle</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">2023 Toyota Camry</span>
              </InputCol>
            </InputRow>
            <div className='mt-20'></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Amount due</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">$200.00</span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Payment method</span>
              </InputCol>
              <InputCol>
                <Select
                  style={{ width: '100%' }}
                  onSelect={(value) => setMethodValue(value)}
                  placeholder="Select payment  method"
                  options={[
                    { value: 'cashapp', label: 'Cash App' },
                    { value: 'venmo', label: 'Venmo' },
                    { value: 'paypal', label: 'PayPal' },
                    { value: 'zelle', label: 'Zelle' },
                  ]}
                />
              </InputCol>
            </InputRow>

            <InputRow>
              <button
                disabled={methodValue && methodValue !== 'zelle' ? false : true}
                className="pay__form__btn mt-10 "
                aria-disabled={methodValue ? true : false}
                onClick={onChange}
              >
                Pay now
              </button>
            </InputRow>
            <InputRow>
              <button
                onClick={() => openQrCode()}
                disabled={methodValue ? false : true}
                className="pay__form__btn mt-5 pay__form__qr"
              >
                Pay with QR code
              </button>
            </InputRow>
            <InputRow>
              <div className="pay__form__footer">
                You can pay by pressing the <b>“Pay now”</b> button above, and
                it will redirect you to your selected payment method’s app or
                web. <br /> Or press <b>“Pay with QR code”</b> to scan a QR code
                with phone’s camera app or inside payment app.
              </div>
            </InputRow>
          </div>
        </Form>
      </div>
    </div>
  );
}
