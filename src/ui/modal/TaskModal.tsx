import { Flex, Radio, Select } from 'antd';
import { FormEvent } from 'react';
import Calendar from '../Calendar';
import Input from '../form/Input';
import UseDatePicker from '../picker/DatePicker';
import Modal from './Modal';
import bag from '/img/drawer/tab/bag.svg';
import calendar from '/img/drawer/tab/calendar.svg';
import email from '/img/drawer/tab/email.svg';
import list from '/img/drawer/tab/list.svg';
import task from '/img/drawer/tab/notes.svg';
import payment from '/img/drawer/tab/payment.svg';
import phone from '/img/drawer/tab/phone.svg';
import user from '/img/drawer/tab/user.svg';
import user2 from '/img/drawer/tab/user2.svg';

export default function TaskModal() {
  // const { hideModal } = useModal()

  const getFotmData = (e: FormEvent) => {
    e.preventDefault();

    // const formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData);
    // console.log(formProps);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal isLoading title="New Task" onSubmit={getFotmData}>
      <div className="modal__row">
        <div className="modal__col">
          <div className="form__control">
            <img src={''} width="17px" height="17px" alt="" />
            <Input
              defaultValue=""
              type="text"
              placeholder="Title"
              name="title"
            />
          </div>

          <div className="task__modal__menu form__control">
            <img src={''} width="17px" height="17px" alt="" />
            <Flex vertical gap="middle">
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">
                  <span className="task__modal__item">
                    <img src={phone} width={12} height={12} alt="" />
                    <span>Call</span>
                  </span>
                </Radio.Button>
                <Radio.Button value="b">
                  <span className="task__modal__item">
                    <img src={email} width={12} height={12} alt="" />
                    <span>Email</span>
                  </span>
                </Radio.Button>

                <Radio.Button value="c">
                  <span className="task__modal__item">
                    <img src={task} width={12} height={12} alt="" />
                    <span>Task</span>
                  </span>
                </Radio.Button>
                <Radio.Button value="d">
                  <span className="task__modal__item">
                    <img src={phone} width={12} height={12} alt="" />
                    <span>Deadline</span>
                  </span>
                </Radio.Button>
                <Radio.Button value="e">
                  <span className="task__modal__item">
                    <img src={payment} width={12} height={12} alt="" />
                    <span>Payment</span>
                  </span>
                </Radio.Button>
              </Radio.Group>
            </Flex>
          </div>

          <div className="form__control">
            <div className="task__modal__date-details">
              <img src={calendar} width="17px" height="17px" alt="" />
              <div className="task__modal__date">
                <UseDatePicker type={'date'} name="est_ship_date" />
              </div>
              <div className="task__modal__times">
                <div className="task__modal__time">
                  <UseDatePicker type={'time'} name="est_ship_date" />
                </div>
                <span>-</span>
                <div className="task__modal__time">
                  <UseDatePicker type={'time'} name="est_ship_date" />
                </div>
              </div>
            </div>
          </div>

          <div className="form__control">
            <img src={bag} width="17px" height="17px" alt="" />
            <Select
              defaultValue="lucy"
              style={{ width: 100 }}
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </div>
          <div className="form__control form__textare">
            <img
              src={list}
              width="17px"
              height="17px"
              alt=""
              style={{ marginTop: '2px' }}
            />
            <textarea rows={3} cols={67}></textarea>
          </div>
          <div className="form__control">
            <img src={user} width="17px" height="17px" alt="" />
            <Select
              defaultValue="lucy"
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </div>
          <div className="form__control">
            <img src={user2} width="17px" height="17px" alt="" />
            <Select
              defaultValue="lucy"
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </div>
          <div className="form__control">
            <img src={''} width="17px" height="17px" alt="" />
            <Select
              defaultValue="lucy"
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </div>
        </div>
        <div className="modal__col">
          <Calendar />
        </div>
      </div>
    </Modal>
  );
}
