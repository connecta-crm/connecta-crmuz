import type { TransferProps } from 'antd';
import { Transfer } from 'antd';
import React, { useEffect, useState } from 'react';
import { RolsTableDataType } from './rolsTableDataType';
import { useFeature } from './useFeature';

interface RecordType {
  key: string | number;
  title: string;
}

const RoleDnd = ({
  includedFeatures,
  role,
  disabled,
}: {
  includedFeatures: (a: React.Key[]) => void;
  role: RolsTableDataType;
  disabled: boolean;
}) => {
  const { features } = useFeature(role ? false : true);

  const mockData: RecordType[] = Array.from<{ id: number; name: string }>(
    role
      ? [...role.availableFeatures, ...role.includedFeatures]
      : features
        ? features
        : [],
  ).map((item) => ({
    key: item.id,
    title: item.name,
  }));

  const d = role?.includedFeatures.map((item) => item.id as React.Key);

  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>(d);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>(
    [],
  );
  useEffect(() => {
    if (role) {
      includedFeatures(d);
      setTargetKeys(d);
    }
  }, [role]);
  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    includedFeatures(nextTargetKeys);
    setTargetKeys(nextTargetKeys);
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
      listStyle={{ height: 250 }}
      oneWay={false}
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

export default RoleDnd;
