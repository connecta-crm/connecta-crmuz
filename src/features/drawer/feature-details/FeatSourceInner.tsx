import { Select, Spin } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';
import { useProviders } from '../../providers/useProviders';
import { type Record } from './FeatDestinationInner';

function FeatSourceInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [select, setSelect] = useState(false);

  const { providers, isFetching: isLoading } = useProviders(select);

  const handleChange = (_: number | string, option: Record | Record[]) => {
    if (!Array.isArray(option)) {
      dispatch(updateField({ field: 'source', value: option?.data }));
    }
  };

  return (
    <div className="d-flex justify-between">
      <div className="form-label">Source</div>
      <Select
        size="small"
        filterOption={false}
        placeholder="Search city"
        defaultValue={leadData.source.name}
        value={leadData.source.name}
        onChange={handleChange}
        onFocus={() => setSelect(true)}
        style={{ width: 200 }}
        loading={isLoading}
        notFoundContent={isLoading ? <Spin size="small" /> : 'No such source'}
        options={(providers || []).map((d: { id: number; name: string }) => ({
          value: d.id,
          data: d,
          label: d.name,
        }))}
      />
    </div>
  );
}

export default FeatSourceInner;
