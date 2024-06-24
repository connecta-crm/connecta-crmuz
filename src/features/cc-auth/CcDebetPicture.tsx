import { Button } from 'antd';
import { Link } from 'react-router-dom';
import deleteFile from '../../../public/img/delete.svg';
import file from '../../../public/img/drawer/tab/file.svg';
import img from '../../../public/img/payment.png';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
export default function CcDebePicture() {
  return (
    <div className="pay cc-debet">
      <div className="pay__content">
        <div className=" text-center">
          <img src={img} alt="" className="pay__content__logo" />
        </div>
        <div className="pay__form">
          <div className="pay__form__header">Ocean Blue Logistics Inc</div>
          <div className="pay__form__body">
            <div className="pay__form__label mt-10">
              <b>Valid picture of the card</b>
            </div>

            <br />
            <InputRow>
              <InputCol>
                <span className="pay__form__label">Front of the card</span>
              </InputCol>
              <InputCol>
                <div className="d-flex justify-end w-100">
                  <Button type="primary">Attach</Button>
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              <div className="d-flex pay__form__img-action justify-between w-100 mb-10">
                <div className="d-flex align-center">
                  <img width={'20'} height={'20'} src={file} alt="" />
                  <span className="ml-5">IMG_2343</span>
                </div>
                <div className="pay__form__delete d-flex">
                  <img width={'14'} src={deleteFile} alt="" />
                </div>
              </div>
            </InputRow>

            <InputRow>
              <InputCol>
                <span className="pay__form__label">Back of the card</span>
              </InputCol>
              <InputCol>
                <div className="d-flex justify-end w-100">
                  <Button type="primary">Attach</Button>
                </div>
              </InputCol>
            </InputRow>
            <InputRow>
              <div className="d-flex pay__form__img-action justify-between w-100 mb-10">
                <div className="d-flex align-center">
                  <img width={'20'} height={'20'} src={file} alt="" />
                  <span className="ml-5">IMG_2343</span>
                </div>
                <div className="pay__form__delete d-flex">
                  <img width={'14'} src={deleteFile} alt="" />
                </div>
              </div>
            </InputRow>
            <InputRow>
              <Link
                type="submit"
                className="pay__form__prev mt-10 "
                to={'/contract/cc-debit'}
              >
                Back
              </Link>
              <Link
                className="pay__form__next mt-10  "
                to={'/contract/cc-phone'}
              >
                Next
              </Link>
            </InputRow>
          </div>
        </div>
      </div>
    </div>
  );
}
