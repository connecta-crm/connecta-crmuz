import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate, useParams } from 'react-router-dom';
import visa from '../../../public/img/card/visa.svg';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import { useContractPayment } from '../contract/useContractPayment';
export default function CcDebet() {
  const params = useParams() as unknown as {
    id: string | number;
  };

  const { contractpayments } = useContractPayment(true, params?.id);
  const sigCanvas = useRef({});
  const clear = () => {
    sigCanvas?.current?.clear();
  };
  const navigate = useNavigate();
  const onFinish = (e) => {
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    e.signFile = dataUrl;
    if (sigCanvas?.current?.isEmpty()) {
      message.warning('Draw your signature below !');
      return;
    }
    localStorage.setItem('cardInfo', JSON.stringify(e));
    navigate('/contract/cc-card-picture/picture/' + params?.id);
  };
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
        <Form className="pay__form" onFinish={onFinish}>
          <div className="pay__form__header">
            {contractpayments ? contractpayments?.company?.name : '...'}
          </div>
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
                      },
                    ]}
                    preserve={false}
                  >
                    <Input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      style={{ paddingRight: '30px' }}
                      maxLength={16}
                      minLength={15}
                    />
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
                  name="firstName"
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
                  name="lastName"
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
                  name="expirationDate"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  preserve={false}
                >
                  <Input
                    type="text"
                    maxLength={4}
                    minLength={4}
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
                  name="cvv"
                  rules={[
                    {
                      required: true,
                      message: '',
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
                  name="billingAddress"
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
                  name="billingCity"
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
                  name="billingState"
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input minLength={2} maxLength={2} type="text" placeholder="State" />
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
                  
                  name="billingZip"
                  rules={[{ required: true, message: '' }]}
                  preserve={false}
                >
                  <Input minLength={5} maxLength={5} type="text" placeholder="Zip" />
                </FormItem>
              </InputCol>
            </InputRow>
            {/* ------------- */}
            <br />
            <div className="pay__form__label mt-10">
              <b>Draw your signature below</b>
            </div>
            <InputRow>
              <div>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    width: '378',
                    height: 104,
                    className: 'sigCanvas',
                  }}
                />
                <Button onClick={clear} size="small" className="mr-5">
                  Clear
                </Button>
              </div>
            </InputRow>

            <InputRow>
              <div
                className="pay__form__prev mt-10 "
                onClick={() => navigate(-1)}
              >
                Back
              </div>
              <button className="pay__form__next mt-10 ">Next</button>
            </InputRow>
          </div>
        </Form>
      </div>
    </div>
  );
}
