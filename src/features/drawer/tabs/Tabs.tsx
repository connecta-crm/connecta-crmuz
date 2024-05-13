import { LoadingOutlined } from '@ant-design/icons';
import type { RadioChangeEvent, TabsProps, TimePickerProps } from 'antd';
import {
  Button,
  DatePicker,
  Flex,
  Input,
  Radio,
  Select,
  Tabs,
  TimePicker,
  theme,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useState } from 'react';
import StickyBox from 'react-sticky-box';
import TabEmail from './TabEmail';
import TabFiles from './TabFiles';
import Notes from './TabNotes';

function TabsApp() {
  const [eventType, setEventType] = useState('call');
  const [notes, setNotes] = useState('');

  const handleEventType = (e: RadioChangeEvent) => {
    setEventType(e.target.value);
  };

  const handleChangeDate = (e: RadioChangeEvent) => {
    setEventType(e.target.value);
  };

  const handleChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
    console.log(time, timeString);
  };

  const handleChangePriority = (value: string) => {
    console.log(value);
  };
  const handleChangeBusy = (value: string) => {
    console.log(value);
  };

  const handleChangeNotes = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
  };

  const feature = 'lead';
  const isLoading = false;
  const handleSave = () => {
    switch (feature) {
      case 'lead':
        // editLead({ guid: leadData.guid, updateLeadModel });
        break;
      // case 'quote':
      // editQuote({ guid: leadData.guid, updateLeadData });
      // break;
    }
  };

  const handleCancel = () => {
    switch (feature) {
      case 'lead':
        // dispatch(resetLeadField({ field: 'trailerType' }));
        break;
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  const tabData = [
    {
      key: '1',
      label: 'Notes',
      value: 'notes',
      icon: (
        <>
          <img
            className="tab-icon default-icon"
            src="./img/drawer/tab/notes.svg"
            alt=""
          />
          <img
            className="tab-icon active-icon"
            src="./img/drawer/tab/notes_a.svg"
            alt=""
          />
        </>
      ),
      children: (
        <div>
          <Notes />
          <Flex className="p-5" gap="small" wrap="wrap">
            <Button size="small">Cancel</Button>
            <Button type="primary" size="small">
              Save
            </Button>
          </Flex>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Task',
      value: 'task',
      icon: (
        <>
          <img
            className="tab-icon default-icon"
            src="./img/drawer/tab/task.svg"
            alt=""
          />
          <img
            className="tab-icon active-icon"
            src="./img/drawer/tab/task.svg"
            alt=""
          />
        </>
      ),
      children: (
        <div className="task">
          <div className="task__row">
            <div className="task__col">
              <div className="task__feature feature-task">
                <Input
                  value={eventType}
                  placeholder="Call"
                  style={{
                    width: '100%',
                    float: 'inline-end',
                    height: 30,
                    border: '1px solid #d1d1d1',
                  }}
                />
                <Radio.Group
                  value={eventType}
                  onChange={handleEventType}
                  className="mb-10 mt-5"
                >
                  <Radio.Button value="call">
                    <div className="feature-task__item d-flex align-center ">
                      <img src="./img/drawer/tab/task/phone.svg" alt="" />
                      <span className="ml-5">Call</span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="email">
                    <div className="feature-task__item d-flex align-center ">
                      <img src="./img/drawer/tab/task/email.svg" alt="" />
                      <span className="ml-5">Email</span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="task">
                    <div className="feature-task__item d-flex align-center ">
                      <img src="./img/drawer/tab/task/task.svg" alt="" />
                      <span className="ml-5">Task</span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="deadline">
                    <div className="feature-task__item d-flex align-center ">
                      <img src="./img/drawer/tab/task/deadline.svg" alt="" />
                      <span className="ml-5">Deadline</span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="payment">
                    <div className="feature-task__item d-flex align-center ">
                      <img src="./img/drawer/tab/task/payment.svg" alt="" />
                      <span className="ml-5">Payment</span>
                    </div>
                  </Radio.Button>
                </Radio.Group>
                <div className="feature-task__dates feature-task--group mb-10">
                  <div className="feature-task__date feature-task__date--1">
                    <DatePicker
                      style={{ width: 175 }}
                      allowClear={false}
                      onChange={handleChangeDate}
                    />
                    <TimePicker
                      className="ml-10"
                      style={{ width: 100 }}
                      use12Hours
                      format="hh:mm A"
                      onChange={handleChangeTime}
                    />
                  </div>
                  <span className="mx-15">-</span>
                  <div className="feature-task__date feature-task__date--2">
                    <DatePicker
                      allowClear={false}
                      style={{ width: 175 }}
                      onChange={handleChangeDate}
                    />
                    <TimePicker
                      className="ml-10"
                      style={{ width: 100 }}
                      use12Hours
                      format="hh:mm A"
                      onChange={handleChangeTime}
                    />
                  </div>
                  <div className="task-icon">
                    <img src="./img/drawer/tab/calendar.svg" alt="" />
                  </div>
                </div>
                <div className="feature-task--group mb-10">
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120, height: 30 }}
                    onChange={handleChangePriority}
                    options={[
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled' },
                    ]}
                  />
                  <div className="task-icon">
                    <img src="./img/drawer/tab/phone.svg" alt="" />
                  </div>
                </div>
                <div className="feature-task--group mb-10">
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120, height: 30 }}
                    onChange={handleChangeBusy}
                    options={[
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled' },
                    ]}
                  />
                  <div className="task-icon">
                    <img src="./img/drawer/tab/phone.svg" alt="" />
                  </div>
                </div>
                <div className="feature-task--group mb-10">
                  <TextArea
                    value={notes}
                    onChange={handleChangeNotes}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    className="feature-task__notes"
                  />
                  <div className="task-icon">
                    <img src="./img/drawer/tab/notes.svg" alt="" />
                  </div>
                </div>
                <div className="feature-task--group mb-10">
                  <Select
                    defaultValue="lucy"
                    style={{ width: '100%', height: 30 }}
                    onChange={handleChangeBusy}
                    options={[
                      { value: 'ali', label: 'Ali Brain (you)' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled' },
                    ]}
                  />
                  <div className="task-icon">
                    <img src="./img/drawer/tab/phone.svg" alt="" />
                  </div>
                </div>
                <div className="feature-task--group mb-10">
                  <Select
                    defaultValue="lucy"
                    style={{ width: '100%', height: 30 }}
                    onChange={handleChangeBusy}
                    allowClear={true}
                    options={[
                      { value: 'ali', label: 'Ali Brain (you)' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled' },
                    ]}
                  />
                  <div className="task-icon">
                    <img src="./img/drawer/tab/phone.svg" alt="" />
                  </div>
                </div>
                <div className="feature-task--group mb-10">
                  <Select
                    defaultValue="lucy"
                    style={{ width: '100%', height: 30 }}
                    onChange={handleChangeBusy}
                    allowClear={true}
                    options={[
                      { value: 'ali', label: 'Ali Brain (you)' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled' },
                    ]}
                  />
                </div>
              </div>
              <div className="task__bottom">
                <Flex className="p-0" gap="small" wrap="wrap">
                  <Button
                    size="small"
                    // disabled={isLoading}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    // className="ml-10"
                    type="primary"
                    size="small"
                    // disabled={isLoading}
                    onClick={handleSave}
                  >
                    {isLoading ? <LoadingOutlined /> : 'Save'}
                  </Button>
                </Flex>
              </div>
            </div>
            <div className="task__col">
              <div className="task__calendar calendar">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus a quas dolores possimus sit quis assumenda rerum eos,
                asperiores voluptates.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Phone',
      value: 'phone',
      icon: (
        <>
          <img
            className="tab-icon default-icon"
            src="./img/drawer/tab/phone.svg"
            alt=""
          />
          <img
            className="tab-icon active-icon"
            src="./img/drawer/tab/phone.svg"
            alt=""
          />
        </>
      ),
      children: <p>tab content 3</p>,
    },
    {
      key: '4',
      label: 'Email',
      value: 'email',
      icon: (
        <>
          <img
            className="tab-icon default-icon"
            src="./img/drawer/tab/email.svg"
            alt=""
          />
          <img
            className="tab-icon active-icon"
            src="./img/drawer/tab/email.svg"
            alt=""
          />
        </>
      ),
      children: <TabEmail />,
    },
    {
      key: '5',
      label: 'Files',
      value: 'files',
      icon: (
        <>
          <img
            className="tab-icon default-icon"
            src="./img/drawer/tab/files.svg"
            alt=""
          />
          <img
            className="tab-icon active-icon"
            src="./img/drawer/tab/files.svg"
            alt=""
          />
        </>
      ),
      children: <TabFiles />,
    },
  ];

  const items = tabData.map(({ key, label, value, icon, children }) => {
    return {
      label,
      key,
      children,
      // style: i === 0 ? { height: 200 } : undefined,
      icon,
      value,
    };
  });

  return (
    <div className="tabs">
      <Tabs
        defaultActiveKey="1"
        type="card"
        renderTabBar={renderTabBar}
        items={items}
      />
    </div>
  );
}

export default TabsApp;
