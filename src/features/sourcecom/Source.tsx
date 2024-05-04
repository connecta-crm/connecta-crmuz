import { Select } from 'antd';
import { useState } from 'react';
import FormControl from '../../ui/Form/FormControl';
import { useSource } from '../leads/useLeadDetails';
export default function Source() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [source, setSource] = useState<string | null>('');
  const sources = useSource();
  return (
    <FormControl title="Source">
      <Select
        defaultValue=""
        style={{ width: '100%' }}
        onChange={(a) => setSource(a)}
        options={(sources || []).map((d: { id: number; name: string }) => ({
          value: d.id,
          label: d.name,
        }))}
      />
    </FormControl>
  );
}
