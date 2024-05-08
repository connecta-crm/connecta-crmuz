import { Select, Spin } from 'antd';
import sourceImg from "../../../public/img/drawer/source.svg"
import FormControl from '../../ui/Form/FormControl';
import { useSource } from '../leads/useLeadDetails';
import { useState } from 'react';

export default function Source({
  setSource,
}: {
  setSource: (a: string) => void;
}) {
  const [enabled,setEnabled] = useState(false)
  const {sources,isFetching} = useSource(enabled);
  return (
    <FormControl title="Source" img={sourceImg}>
      <Select
        defaultValue=""
        style={{ width: '100%' }}
        loading={isFetching}
        onFocus={()=>setEnabled(true)}
        onChange={(a) => setSource(a)}
        notFoundContent={isFetching?<Spin size='small'/> : "No data"}
        options={(sources || []).map((d: { id: number; name: string }) => ({
          value: d.id,
          label: d.name,
        }))}
      />
    </FormControl>
  );
}
