import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { useState } from 'react';

export default function RadioButton({ item }: { item: string }) {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={item} />
    </Radio.Group>
  );
}
