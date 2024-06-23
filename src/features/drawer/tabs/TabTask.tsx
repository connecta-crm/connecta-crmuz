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
import { classNames } from '../../../utils/helpers';
import { EndPointType } from '../../attachments/useCreateNote';
import { useCreateTask } from '../../attachments/useCreateTask';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';
import Calendar from '../../../ui/Calendar';

function TabTask({ user, customer, sourceId, sourceType }) {
  const { isFullScreen } = useDrawerFeature();

  const [eventType, setEventType] = useState('call');
  const [taskNote, setTaskNote] = useState('');
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

  const handleChangePriority = (value: string) => {
    console.log(value);
  };
  const handleChangeBusy = (value: string) => {
    console.log(value);
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
          {sourceType !== 'task' && (
            <div
              className={classNames(
                !isFullScreen ? 'pr-5' : '',
                'task__bottom',
              )}
            >
              <Flex className="p-0" gap="small" wrap="wrap">
                <Button size="small" onClick={handleCancel}>
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
