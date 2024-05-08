import { Select } from 'antd';
import sourceImg from "../../../public/img/drawer/source.svg"
import FormControl from '../../ui/Form/FormControl';
import { useSource } from '../leads/useLeadDetails';
export default function Source({
  setSource,
}: {
  setSource: (a: string) => void;
}) {
  const sources = useSource();
  return (
    <FormControl title="Source" img={sourceImg}>
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
