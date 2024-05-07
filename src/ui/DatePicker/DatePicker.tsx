// import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

export default function UseDatePicker({
  type,
  name,
}: {
  type: "year"|"date"|"time";
  name: string;
}) {
  return <DatePicker picker={type} name={name}  />;
}
