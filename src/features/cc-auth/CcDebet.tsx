import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import InputMask from 'react-input-mask';
import { Link, useNavigate } from 'react-router-dom';
import visa from '../../../public/img/card/visa.svg';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
export default function CcDebet() {
  const navigate = useNavigate();
  const onFinish = () => {
    navigate('/contract/cc-card-picture');
  };
  return (
    <div className="pay cc-debet">
      <div className="pay__content">
        <div className=" text-center">
          <img src={img} alt="" className="pay__content__logo" />
        </div>
        <Form className="pay__form" onFinish={onFinish}>
          <div className="pay__form__header">Ocean Blue Logistics Inc</div>
          <div className="pay__form__body">
            <div className="pay__form__label mt-10">
              <b>Credit/Debit card information</b>
            </div>

            <div className="mt-10"></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Card number</span>
              </InputCol>
              <InputCol>
                <div style={{ position: 'relative' }}>
                  <FormItem
                    className="m-0 w-100 "
                    name="cardNumber"
                    rules={[
                      {
                        required: true,
                        message: '',
                        pattern: new RegExp(/^(\d{4}-){3}\d{3,4}$/),
                      },
                    ]}
                    preserve={false}
                  >
                    {/* <Input
                      type="text"
                      placeholder="0000-0000-0000-0000"
                      style={{ paddingRight: '30px' }}
                      maxLength={19}
                      minLength={18}
                    /> */}
                    <InputMask mask="0000-0000-0000-0000">
                      {() => (
                        <Input
                          type="text"
                          placeholder="0000-0000-0000-0000"
                          style={{ paddingRight: '30px' }}
                          maxLength={19}
                          minLength={18}
                        />
                      )}
                    </InputMask>
                  </FormItem>
                  <img
                    className="pay__card__type--img"
                    src={visa}
                    alt=""
                    width={'14px'}
                  />
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">First name</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name=""
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input type="text" placeholder="First and middle name" />
                </FormItem>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Last name</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name=""
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input type="text" placeholder="Last name on the card" />
                </FormItem>
              </InputCol>
            </InputRow>

            <InputRow>
              <InputCol>
                <span className="pay__form__label">Expiration date</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name="d"
                  rules={[
                    {
                      required: true,
                      message: '',
                      pattern: new RegExp(
                        /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/,
                      ),
                    },
                  ]}
                  preserve={false}
                >
                  <Input
                    type="text"
                    maxLength={5}
                    minLength={5}
                    placeholder="MM/YY"
                  />
                </FormItem>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Security code</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: '',
                      pattern: new RegExp(/^[0-9]{3,4}$/),
                    },
                  ]}
                  preserve={false}
                >
                  <Input
                    maxLength={3}
                    minLength={3}
                    type="text"
                    placeholder="CVV"
                  />
                </FormItem>
              </InputCol>
            </InputRow>

            {/* ------------- */}
            <br />
            <div className="pay__form__label mt-10">
              <b>Billing address</b>
            </div>

            <div className="mt-10"></div>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Address</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name=""
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input type="text" placeholder="Address" />
                </FormItem>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">City</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name=""
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input type="text" placeholder="City" />
                </FormItem>
              </InputCol>
            </InputRow>
            <InputRow>
              <InputCol>
                <span className="pay__form__label">State</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name=""
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input type="text" placeholder="State" />
                </FormItem>
              </InputCol>
            </InputRow>

            <InputRow>
              <InputCol>
                <span className="pay__form__label">Zip</span>
              </InputCol>
              <InputCol>
                <FormItem
                  className="m-0 w-100 "
                  name=""
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input type="text" placeholder="Zip" />
                </FormItem>
              </InputCol>
            </InputRow>
            {/* ------------- */}
            <br />
            <div className="pay__form__label mt-10">
              <b>Billing address</b>
            </div>
            <InputRow>
              <FormItem
                className="m-0 w-100 "
                name=""
                rules={[{ required: true, message: '' }]}
                preserve={false}
              >
                <Input.TextArea placeholder="" style={{ marginTop: '5px' }} />
              </FormItem>
            </InputRow>

            <InputRow>
              <Link className="pay__form__prev mt-10 " to={'/contract/cc-auth'}>
                Back
              </Link>
              <button className="pay__form__next mt-10 ">Next</button>
            </InputRow>
          </div>
        </Form>
      </div>
    </div>
  );
}
