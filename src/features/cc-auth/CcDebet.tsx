import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate, useParams } from 'react-router-dom';
import visa from '../../../public/img/card/visa.svg';
import amex from '../../../public/img/card/amex.svg';
import discover from '../../../public/img/card/discover.svg';
import master from '../../../public/img/card/master-card.svg';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import { useContractPayment } from '../contract/useContractPayment';
export default function CcDebet() {
  const params = useParams() as unknown as {
    id: string | number;
  };

  const [cardType, setCardType] = useState<
    'Amex' | 'Visa' | 'MasterCard' | 'Discover' | null
  >(null);

  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState('');
  const { contractpayments } = useContractPayment(true, params?.id);
  const sigCanvas = useRef({});
  const clear = () => {
    sigCanvas?.current?.clear();
  };
  const navigate = useNavigate();
  const onFinish = (e) => {
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    e.cardNumber = cardNumber.replace(/ /g, '');
    e.signFile = dataUrl;
    e.expirationDate = expirationDate.replace('/', '');
    if (sigCanvas?.current?.isEmpty()) {
      message.warning('Draw your signature below !');
      return;
    }
    localStorage.setItem('cardInfo', JSON.stringify(e));
    navigate('/contract/cc-card-picture/picture/' + params?.id);
  };

  function maskVisaCardNumber(value: string) {
    // Faqat raqamlarni saqlang
    const onlyNumbers = value.replace(/\D/g, '');
    // Maskalangan format: #### #### #### ####
    const d = onlyNumbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(d);
  }
  function validateCardNumber(cardNumber: string) {
    maskVisaCardNumber(cardNumber);

    cardNumber = cardNumber.replace(/ /g, '');
    // AMEX: Starts with 34 or 37, and 15 digits
    if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      setCardType('Amex');
    }
    // Visa: Starts with 4, and 13 or 16 digits
    else if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      setCardType('Visa');
    }
    // MasterCard: Starts with 51-55 or 2221-2720, and 16 digits
    else if (
      /^5[1-5][0-9]{14}$/.test(cardNumber) ||
      /^2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720)[0-9]{12}$/.test(
        cardNumber,
      )
    ) {
      setCardType('MasterCard');
    }
    // Discover: Starts with 6011, 65, 644-649, or 622126-622925, and 16 digits
    else if (
      /^6(?:011|5[0-9]{2}|4[4-9][0-9]|22(?:12[6-9]|1[3-9][0-9]|2[0-5]))[0-9]{12}$/.test(
        cardNumber,
      )
    ) {
      setCardType('Discover');
    }
    // Not a recognized card
    else {
      setCardType(null);
    }
  }

  function maskExpirationDate(value: string) {
    // Faqat raqamlarni saqlang
    const onlyNumbers = value.replace(/\D/g, '');
    // Maskalangan format: MM/YY
    if (onlyNumbers.length <= 2) {
      return onlyNumbers;
    } else {
      return onlyNumbers.substring(0, 2) + '/' + onlyNumbers.substring(2, 4);
    }
  }

  const handleExpirationDateChange = (e) => {
    const maskedValue = maskExpirationDate(e.target.value);
    setExpirationDate(maskedValue);
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
                    // name="cardNumber"
                    // initialValue={cardNumber}
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
                      value={cardNumber}
                      placeholder="0000 0000 0000 0000"
                      style={{ paddingRight: '30px' }}
                      maxLength={19}
                      minLength={18}
                      onChange={(e) => validateCardNumber(e.target.value)}
                    />
                  </FormItem>
                  {cardType == 'Visa' && (
                    <img
                      className="pay__card__type--img"
                      src={visa}
                      alt=""
                      width={'14px'}
                    />
                  )}
                  {cardType == 'Amex' && (
                    <img
                      className="pay__card__type--img"
                      src={amex}
                      alt=""
                      width={'14px'}
                    />
                  )}
                  {cardType == 'Discover' && (
                    <img
                      className="pay__card__type--img"
                      src={discover}
                      alt=""
                      width={'14px'}
                    />
                  )}
                  {cardType == 'MasterCard' && (
                    <img
                      className="pay__card__type--img"
                      src={master}
                      alt=""
                      width={'14px'}
                    />
                  )}
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
                  // name="expirationDate"
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
                    value={expirationDate}
                    maxLength={5}
                    minLength={5}
                    placeholder="MM/YY"
                    onChange={handleExpirationDateChange}
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
                    maxLength={4}
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
                  <Input
                    minLength={2}
                    maxLength={2}
                    type="text"
                    placeholder="State"
                  />
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
                  <Input
                    minLength={5}
                    maxLength={5}
                    type="text"
                    placeholder="Zip"
                  />
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
