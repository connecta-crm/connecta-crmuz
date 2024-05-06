import { Select } from 'antd';
import FormControl from '../../ui/Form/FormControl';
import { useSource } from '../leads/useLeadDetails';
export default function Source({
  setSource,
}: {
  setSource: (a: string) => void;
}) {
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
