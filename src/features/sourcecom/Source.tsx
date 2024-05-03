import { useState } from 'react';
import FormControl from '../../ui/Form/FormControl';
import { Select } from 'antd';
import { useSource } from '../leads/useLeadDetails';
export default function Source() {
  const [source, setSource] = useState<string | null>('');
  const sources = useSource();
  console.log(source);
  return (
    <FormControl title="Source">
              <Select
                defaultValue=""
                style={{ width: '100%' }}
                onChange={(a) => setSource(a)}
                options={(sources || []).map(
                  (d: { id: number; name: string }) => ({
                    value: d.id,
                    label: d.name,
                  }),
                )}
              />
            </FormControl>
  );
}
