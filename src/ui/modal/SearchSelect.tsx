import { Select } from 'antd';

type ItemsType={
    id:number,
    name:string
}

export default function SearchSelect({items,handleSearch,handleChange}:{
    items:ItemsType[]
        
}) {
  return (
    <Select
      showSearch
      // value={value}
      placeholder={"Empty"}
      style={{ width: '100%' }}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={(data) => handleChange(data)}
      notFoundContent={null}
      options={(items || []).map((d: { id: number; name: string }) => ({
        value: d.id,
        label: d.name,
      }))}
    />
  );
}
