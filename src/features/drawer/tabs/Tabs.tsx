import { LoadingOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
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
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppSelector } from '../../../store/hooks';
import Calendar from '../../../ui/Calendar';
import { classNames } from '../../../utils/helpers';
import { useCreateNote } from '../../attachments/useCreateNote';
import { getUser } from '../../authentication/authSlice';
import { getLeadData } from '../../leads/leadSlice';
import TabEmail from './TabEmail';
import TabFiles from './TabFiles';
import Notes from './TabNotes';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';

export type CancelNotesActionType = 'main' | 'phone' | 'task' | 'email';

function TabsApp() {
  const [eventType, setEventType] = useState('call');
  const [taskNote, setTaskNote] = useState('');
  const [notes, setNotes] = useState({
    mainNote: '',
    phoneNote: '',
    emailNote: '',
  });

  const { isFullScreen } = useDrawerFeature();

  const { id: leadId } = useAppSelector(getLeadData);
  const userData = useAppSelector(getUser);

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['leadAttachments'] });

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

  const handleChangeTaskNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTaskNote(value);
  };

  const handleSetNotes = (type: CancelNotesActionType, note: string) => {
    switch (type) {
      case 'main':
        setNotes({ ...notes, mainNote: note });
        break;
      case 'phone':
        setNotes({ ...notes, phoneNote: note });
        break;
      case 'email':
        setNotes({ ...notes, emailNote: note });
        break;
    }
  };

  const feature = 'lead';
  const { createNote, isLoading } = useCreateNote();

  const handleSave = (type: 'main' | 'task' | 'phone') => {
    const user = userData?.id ? +userData?.id : undefined;
    switch (feature) {
      case 'lead':
        if (type === 'main') {
          createNote({
            rel: leadId,
            endpointType: 'lead',
            text: notes.mainNote,
            user,
          });
          setNotes({ ...notes, mainNote: '' });
        }
        // editLead({ guid: leadData.guid, updateLeadModel });
        break;
      // case 'quote':
      // editQuote({ guid: leadData.guid, updateLeadData });
      // break;
    }
  };

  const handleCancel = (type: CancelNotesActionType) => {
    switch (feature) {
      case 'lead':
        switch (type) {
          case 'main':
            setNotes({ ...notes, mainNote: '' });
            break;
          case 'phone':
            setNotes({ ...notes, phoneNote: '' });
            break;
          case 'email':
            setNotes({ ...notes, emailNote: '' });
            break;
          case 'task':
            setTaskNote('');
            break;
        }
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
            src="./img/drawer/tab/note.svg"
            alt=""
          />
          <img
            className="tab-icon active-icon"
            src="./img/drawer/tab/note_a.svg"
            alt=""
          />
        </>
      ),
      children: (
        <div>
          <Notes
            type="main"
            tabIndex={1}
            content={notes.mainNote}
            onSetContent={handleSetNotes}
          />
          <Flex
            className="p-5"
            gap="small"
            wrap="wrap"
            style={{ backgroundColor: 'rgba(234, 234, 234, 1)' }}
          >
            <Button
              size="small"
              disabled={isLoading}
              onClick={() => handleCancel('main')}
            >
              Cancel
            </Button>
            <Button
              // className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading}
              onClick={() => handleSave('main')}
            >
              {isLoading ? <LoadingOutlined /> : 'Save'}
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
              <div
                className={classNames(
                  !isFullScreen ? 'pr-5 small-screen' : '',
                  'task__feature feature-task',
                )}
              >
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
                      style={{ width: isFullScreen ? 175 : 110 }}
                      allowClear={false}
                      onChange={handleChangeDate}
                    />
                    <TimePicker
                      className="ml-10"
                      style={{ width: isFullScreen ? 100 : 92 }}
                      use12Hours
                      format="hh:mm A"
                      onChange={handleChangeTime}
                    />
                  </div>
                  {isFullScreen ? (
                    <span className="mx-15">-</span>
                  ) : (
                    <span className="mx-5">-</span>
                  )}
                  <div className="feature-task__date feature-task__date--2">
                    <DatePicker
                      allowClear={false}
                      style={{ width: isFullScreen ? 175 : 110 }}
                      onChange={handleChangeDate}
                    />
                    <TimePicker
                      className="ml-10"
                      style={{ width: isFullScreen ? 100 : 92 }}
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
                    suffixIcon={<img alt="" src={ArrowDownIcon} />}
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
                    suffixIcon={<img alt="" src={ArrowDownIcon} />}
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
                    value={taskNote}
                    onChange={handleChangeTaskNote}
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
                    suffixIcon={<img alt="" src={ArrowDownIcon} />}
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
                    suffixIcon={<img alt="" src={ArrowDownIcon} />}
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
                    suffixIcon={<img alt="" src={ArrowDownIcon} />}
                    options={[
                      { value: 'ali', label: 'Ali Brain (you)' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled' },
                    ]}
                  />
                </div>
              </div>
              <div
                className={classNames(
                  !isFullScreen ? 'pr-5' : '',
                  'task__bottom',
                )}
              >
                <Flex className="p-0" gap="small" wrap="wrap">
                  <Button
                    size="small"
                    // disabled={isLoading}
                    onClick={() => handleCancel('task')}
                  >
                    Cancel
                  </Button>
                  <Button
                    // className="ml-10"
                    type="primary"
                    size="small"
                    // disabled={isLoading}
                    onClick={() => handleSave('task')}
                  >
                    {isLoading ? <LoadingOutlined /> : 'Save'}
                  </Button>
                </Flex>
              </div>
            </div>
            <div className="task__col">
              <div className="task__calendar calendar">
                <Calendar />
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
      children: (
        <div className="phone">
          <div className="phone__body">
            <div className="phone__item item-phone">
              <div className="item-phone__text">From:</div>
              <div className="item-phone__select">
                <Select
                  variant="borderless"
                  defaultValue={['(929) 592-3003']}
                  placeholder=""
                  style={{ flex: 1, width: 150 }}
                  suffixIcon={<img alt="" src={ArrowDownIcon} />}
                  options={[
                    { value: '(929) 592-3003', label: '(929) 592-3003' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                />
              </div>
            </div>
            <div className="phone__item item-phone">
              <div className="item-phone__text">To:</div>
              <div className="item-phone__select">
                <Select
                  variant="borderless"
                  defaultValue={['(929) 999-9999']}
                  placeholder=""
                  style={{ flex: 1, width: 150 }}
                  suffixIcon={<img alt="" src={ArrowDownIcon} />}
                  allowClear={true}
                  options={[
                    { value: '(929) 999-9999', label: '(929) 999-9999' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                />
              </div>
            </div>
            <div className="phone__item item-phone">
              <div className="item-phone__select">
                <Select
                  variant="filled"
                  // defaultValue={['']}
                  placeholder="Choose from template"
                  style={{ flex: 1, width: 190, height: 22 }}
                  suffixIcon={<img alt="" src={ArrowDownIcon} />}
                  options={[
                    { value: '(929) 999-9999', label: '(929) 999-9999' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                />
              </div>
              <div className="item-phone__select">
                <Select
                  variant="borderless"
                  // defaultValue={''}
                  // value={''}
                  placeholder="Insert a field"
                  style={{ flex: 1, width: 130 }}
                  suffixIcon={<img alt="" src={ArrowDownIcon} />}
                  options={[
                    { value: '(929) 592-3003', label: '(929) 592-3003' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                />
              </div>
            </div>
            <div className="phone__item item-phone px-0">
              <div className="w-100">
                <Notes
                  type="phone"
                  tabIndex={2}
                  content={notes.phoneNote}
                  onSetContent={handleSetNotes}
                />
                <Flex
                  className="p-5"
                  style={{ backgroundColor: 'rgba(234, 234, 234, 1)' }}
                  gap="small"
                  wrap="wrap"
                >
                  <Button size="small" onClick={() => handleCancel('phone')}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleSave('phone')}
                  >
                    Save
                  </Button>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      ),
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
