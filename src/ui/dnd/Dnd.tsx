import type { TransferProps } from 'antd';
import { Transfer } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFeature } from '../../features/rols/useFeature';
export type DndType = {
  firstName?: string;
  id: string;
  name: string;
};
export interface RecordType {
  id: string;
  name?: string;
  key?: string;
  title: string;
  firstName?: string;
}

const Dnd = ({
  setIncludedFeatures,
  available,
  included,
  disabled,
}: {
  setIncludedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  available?: DndType[];
  included?: DndType[];
  disabled?: boolean;
}) => {
  const { features } = useFeature(available ? false : true);
  const mockData: RecordType[] = (
    available ? available : features ? features : []
  ).map((item: RecordType) => ({
    key: item.id,
    title: item?.name || item?.firstName,
  }));

  const initialTargetKeys = included ? included.map((item) => item?.id) : [];

  useEffect(() => {
    if (included) {
      setIncludedFeatures(initialTargetKeys);
      setTargetKeys(initialTargetKeys);
    }
  }, [included]);

  const [targetKeys, setTargetKeys] =
    useState<TransferProps['targetKeys']>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>(
    [],
  );

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
    setIncludedFeatures(nextTargetKeys as string[]);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      disabled={disabled}
      dataSource={mockData}
      titles={['Available', 'Included']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={(item) => item.title}
    />
  );
};

export default Dnd;
