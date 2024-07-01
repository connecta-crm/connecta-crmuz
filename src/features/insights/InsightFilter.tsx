/* eslint-disable @typescript-eslint/no-unused-vars */
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, DatePicker, Select } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

function InsightFilter() {
  const [startEndDate, setStartEndDate] = useState<{
    startDate: string | string[];
    endDate: string | string[];
  }>({
    startDate: '',
    endDate: '',
  });

  const itemsForToday = [
    {
      value: 'today',
      label: 'Today',
    },
    {
      value: 'yesterday',
      label: 'Yesterday',
    },
    {
      value: 'this_week',
      label: 'This week',
    },
    {
      value: 'last_week',
      label: 'Last week',
    },
    {
      value: 'this_month',
      label: 'This month',
    },
    {
      value: 'last_month',
      label: 'Last month',
    },
    {
      value: 'this_year',
      label: 'This year',
    },
    {
      value: 'last_year',
      label: 'Last year',
    },
    {
      value: 'all_time',
      label: 'All time',
    },
    {
      value: 'period',
      label: 'Period',
    },
  ];

  const itemsForTime = [
    {
      value: 'lead_created_on',
      label: 'Lead created on',
    },
    {
      value: 'dispatched_on',
      label: 'Dispatched on',
    },
  ];

  return (
    <div className="insight__filter filter-insight">
      <div className="filter-insight__title d-flex align-center">
        <img width={22} src="/img/insight/dollar.svg" alt="icon" />
        <p className="ml-5 f-16 font-bold">Filter</p>
      </div>
      <div className="p-10">
        <div className="d-flex align-center mb-10">
          <Select
            showSearch
            style={{ width: 150, fontWeight: 600 }}
            placeholder="Filter by time"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={itemsForTime}
            suffixIcon={
              <CaretDownOutlined style={{ fontSize: 16, color: '#000000e0' }} />
            }
            defaultValue={itemsForTime[0].value}
          ></Select>
          <Select
            showSearch
            style={{ width: 150, fontWeight: 600 }}
            placeholder="Filter by day"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={itemsForToday}
            suffixIcon={
              <CaretDownOutlined style={{ fontSize: 16, color: '#000000e0' }} />
            }
            defaultValue={itemsForToday[0].value}
            className="ml-10 font-bold"
          ></Select>
          <DatePicker
            style={{ width: 150 }}
            className="ml-10 font-bold"
            allowClear={false}
            onChange={(_: Dayjs, dateString: string | string[]) =>
              setStartEndDate((prev) => ({
                ...prev,
                startDate: dateString,
              }))
            }
          />
          <span className="mx-15 font-bold">-</span>
          <DatePicker
            style={{ width: 150 }}
            allowClear={false}
            onChange={(_: Dayjs, dateString: string | string[]) =>
              setStartEndDate((prev) => ({
                ...prev,
                endDate: dateString,
              }))
            }
          />
        </div>
        <Button type="primary" size="small" className="font-bold">
          + Add a filter
        </Button>
      </div>
    </div>
  );
}

export default InsightFilter;
