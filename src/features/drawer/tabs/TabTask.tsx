/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  DatePicker,
  Flex,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  TimePicker,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppSelector } from '../../../store/hooks';
import Calendar from '../../../ui/Calendar';
import { classNames } from '../../../utils/helpers';
import { EndPointType } from '../../attachments/useCreateNote';
import { useCreateTask } from '../../attachments/useCreateTask';
import { getUser } from '../../authentication/authSlice';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';

function TabTask({ user, customer: currentCustomer, sourceId, sourceType }) {
  const { isFullScreen } = useDrawerFeature();
  const userData = useAppSelector(getUser);

  const [eventType, setEventType] = useState('call');
  const [taskNote, setTaskNote] = useState('');
  const [busy, setBusy] = useState('busy');
  const [priority, setPriority] = useState('high');
  const [customer, setCustomer] = useState(currentCustomer.id);
  const [customerId, setCustomerId] = useState(currentCustomer.id);
  const [startDateAndTime, setStartDateAndTime] = useState<{
    startDate: string | string[];
    startTime: string | string[];
  }>({
    startDate: '',
    startTime: '',
  });

  const [endDateAndTime, setEndDateAndTime] = useState<{
    endDate: string | string[];
    endTime: string | string[];
  }>({
    endDate: '',
    endTime: '',
  });

  const { createTask, isLoading } = useCreateTask(sourceType as EndPointType);

  const handleEventType = (e: RadioChangeEvent) => {
    setEventType(e.target.value);
  };

  const handleChangeTaskNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTaskNote(value);
  };

  const handleChangeUser = (value: string) => {
    console.log(value);
  };
  const handleChangeCustomer = (value: number) => {
    console.log(value);
    setCustomer(value);
  };
  const handleChangeCustomerId = (value: number) => {
    console.log(value);
    setCustomerId(value);
  };

  const handleCancel = () => {
    setTaskNote('');
  };

  const isDateEmpty = (date: string | string[]) => {
    if (Array.isArray(date)) {
      return date.length === 0 || date[0] === '';
    }
    return date === '';
  };

  const AreDateAndTimeEmpty = (
    value1: string | string[],
    value2: string | string[],
  ) => {
    return isDateEmpty(value1) && isDateEmpty(value2);
  };

  const formatDateAndTime = (
    value1: string | string[],
    value2: string | string[],
  ) => {
    const combinedDateTime = `${value1} ${value2}`;
    const parsedDate = new Date(
      combinedDateTime ? combinedDateTime : new Date(),
    );
    return parsedDate.toISOString();
  };

  // console.log('P', user, currentCustomer, userData);
  const handleSave = () => {
    let startTime, endTime;

    if (
      AreDateAndTimeEmpty(
        startDateAndTime.startDate,
        startDateAndTime.startTime,
      )
    ) {
      startTime = null;
    } else {
      startTime = formatDateAndTime(
        startDateAndTime.startDate,
        startDateAndTime.startTime,
      );
    }

    if (AreDateAndTimeEmpty(endDateAndTime.endDate, endDateAndTime.endTime)) {
      endTime = null;
    } else {
      endTime = formatDateAndTime(
        endDateAndTime.endDate,
        endDateAndTime.endTime,
      );
    }
    createTask({
      rel: sourceId,
      endpointType: sourceType,
      text: taskNote,
      type: eventType,
      user,
      customer,
      startTime,
      endTime,
      priority,
      busy,
    });
  };

  return (
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
              onChange={(e) => setEventType(e.target.value)}
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
                  onChange={(_: Dayjs, dateString: string | string[]) =>
                    setStartDateAndTime((prev) => ({
                      ...prev,
                      startDate: dateString,
                    }))
                  }
                />
                <TimePicker
                  className="ml-10"
                  style={{ width: isFullScreen ? 100 : 92 }}
                  use12Hours
                  format="hh:mm A"
                  onChange={(_: Dayjs, timeString: string | string[]) =>
                    setStartDateAndTime((prev) => ({
                      ...prev,
                      startTime: timeString,
                    }))
                  }
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
                  onChange={(_: Dayjs, dateString: string | string[]) =>
                    setEndDateAndTime((prev) => ({
                      ...prev,
                      endDate: dateString,
                    }))
                  }
                />
                <TimePicker
                  className="ml-10"
                  style={{ width: isFullScreen ? 100 : 92 }}
                  use12Hours
                  format="hh:mm A"
                  onChange={(_: Dayjs, timeString: string | string[]) =>
                    setStartDateAndTime((prev) => ({
                      ...prev,
                      endTime: timeString,
                    }))
                  }
                />
              </div>
              <div className="task-icon">
                <img src="./img/drawer/tab/calendar.svg" alt="" />
              </div>
            </div>
            <div className="feature-task--group mb-10">
              <Select
                defaultValue={priority}
                style={{ width: 120, height: 30 }}
                onChange={(val) => setPriority(val)}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' },
                ]}
              />
              <div className="task-icon">
                <img src="./img/drawer/tab/task/busy.svg" alt="" />
              </div>
            </div>
            <div className="feature-task--group mb-10">
              <Select
                defaultValue={busy}
                style={{ width: 120, height: 30 }}
                onChange={(val) => setBusy(val)}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[
                  { value: 'busy', label: 'Busy' },
                  { value: 'free', label: 'Free' },
                ]}
              />
              <div className="task-icon">
                <img src="./img/drawer/tab/task/busy.svg" alt="" />
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
                <img src="./img/drawer/tab/task/comment.svg" alt="" />
              </div>
            </div>
            <div className="feature-task--group mb-10">
              <Select
                defaultValue={user}
                style={{ width: '100%', height: 30 }}
                onChange={handleChangeUser}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[
                  {
                    value: user,
                    label: `${userData?.firstName ?? 'Unknown'} ${userData?.lastName ?? ''}`,
                  },
                ]}
              />
              <div className="task-icon">
                <img src="./img/drawer/tab/task/user.svg" alt="" />
              </div>
            </div>
            <div className="feature-task--group mb-10">
              <Select
                defaultValue={currentCustomer?.id}
                style={{ width: '100%', height: 30 }}
                onChange={handleChangeCustomer}
                allowClear={true}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[
                  { value: currentCustomer?.id, label: currentCustomer?.name },
                ]}
              />
              <div className="task-icon">
                <img src="./img/drawer/tab/task/customer.svg" alt="" />
              </div>
            </div>
            <div className="feature-task--group mb-10">
              <Select
                mode="multiple"
                defaultValue={currentCustomer?.id}
                style={{ width: '100%', height: 30 }}
                onChange={handleChangeCustomerId}
                allowClear={true}
                filterOption={false}
                // onSearch={debounceFetcher}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[
                  { value: currentCustomer?.id, label: currentCustomer?.id },
                ]}
              />
              <div className="task-icon">
                <img src="./img/drawer/tab/task/task-check.svg" alt="" />
              </div>
            </div>
          </div>
          {sourceType !== 'task' && (
            <div
              className={classNames(
                !isFullScreen ? 'pr-5' : '',
                'task__bottom',
              )}
            >
              <Flex className="p-0" gap="small" wrap="wrap">
                <Button
                  size="small"
                  disabled={isLoading}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  size="small"
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Flex>
            </div>
          )}
        </div>
        <div className="task__col">
          <div className="task__calendar calendar">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabTask;
