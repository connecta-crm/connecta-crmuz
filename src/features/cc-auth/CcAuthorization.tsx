import { Link } from 'react-router-dom';
import card from '../../../public/img/card/cards.svg';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
export default function CcAuthorization() {
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
            <div className="mt-10"></div>
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
                <span className="pay__form__text ">2023 Toyota Camry</span>
              </InputCol>
            </InputRow>
            <div className="mt-10"></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Payment method</span>
              </InputCol>
              <InputCol>
                <div className="d-flex align-center">
                  <span className="pay__form__text mr-5">Credit/Debit Card </span>
                  <img width={68} height={14} src={card} alt="" />
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Amount</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">$200.00</span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Surcharge fee</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">$9.00</span>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Total amount:</span>
              </InputCol>
              <InputCol>
                <span className="pay__form__text">$209.00</span>
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
              <Link className="pay__form__btn mt-10 " to={'/contract/cc-debit'}>
                Fill out a form now
              </Link>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
