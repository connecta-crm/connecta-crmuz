import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function UseDatePicker({
  type,
  name,
  getYear,
  defaultValue,
}: {
  type: 'year' | 'date' | 'time';
  name?: string;
  getYear?: (a: string) => void;
  defaultValue?: string;
}) {
  const onChange: DatePickerProps['onChange'] = (t, date) => {
    if (type == 'year') {
      getYear && getYear(t?.year()?.toString());
      return;
    }
    getYear && getYear(date.toString());
  };

  return (
    <DatePicker
      defaultValue={defaultValue ? dayjs(defaultValue, 'HH:mm') : undefined}
      onChange={onChange}
      format={type == 'date' ? 'MM-DD-YYYY' : type == 'time' ? 'HH:mm' : 'YYYY'}
      picker={type}
      name={name}
      allowClear={false}
    />
  );
}
