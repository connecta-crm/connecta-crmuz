import img from '../../../public/img/payment.png';
import InputRow from '../../ui/form/InputRow';
export default function CcDebePhone() {
  return (
    <div className="pay cc-debet">
      <div className="pay__content">
        <div className=" text-center">
          <img src={img} alt="" className="pay__content__logo" />
        </div>
        <div className="pay__form">
          <div className="pay__form__header">Ocean Blue Logistics Inc</div>
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
                future. Thank you for choosing <br /> <b>Mate Logistics Inc.</b>
              </div>
            </InputRow>

            <InputRow>
              <a className="pay__form__next mt-10 " href="tel:9299293003">
                Call (929) 929-3003
              </a>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
