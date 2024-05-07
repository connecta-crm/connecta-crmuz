import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';


export default function UseDatePicker({
  type,
  name,
  getYear
}: {
  type: 'year' | 'date' | 'time';
  name: string;
  getYear:(a:string)=>void
}) {

  const onChange: DatePickerProps['onChange'] = (t,date) => {
    if(type=="year"){
      getYear(t?.year()?.toString())
      return;
    }
    getYear(date.toString())
  };




  return <DatePicker 
  onChange={onChange}
   picker={type} 
   name={name} 
   allowClear={false}
    />;
}
