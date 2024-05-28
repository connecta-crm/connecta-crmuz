import type { TransferProps } from 'antd';
import { Transfer } from 'antd';
import React, { useState } from 'react';
import { useFeature } from './useFeature';

interface RecordType {
  key: string | number;
  title: string;
}

const RoleDnd = ({
  includedFeatures,
}: {
  includedFeatures: (a: React.Key[]) => void;
}) => {
  const { features } = useFeature(true);

  const mockData: RecordType[] = Array.from<{ id: number; name: string }>(
    features ? features : [],
  ).map((item) => ({
    key: item.id,
    title: item.name,
  }));

  const initialTargetKeys = mockData
    .filter((item) => Number(item.key) > 10)
    .map((item) => item.key);

  const [targetKeys, setTargetKeys] =
    useState<TransferProps['targetKeys']>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>(
    [],
  );

  const onChange: TransferProps['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys,
  ) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    includedFeatures(moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll: TransferProps['onScroll'] = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  return (
    <Transfer
      listStyle={{ height: 250 }}
      oneWay={false}
      dataSource={mockData}
      titles={['Available', 'Included']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item) => item.title}
    />
  );
};

export default RoleDnd;
