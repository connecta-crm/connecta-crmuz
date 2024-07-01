import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { DrawerSourceType } from '../../ui/Drawer.tsx';
import { useLeadAttachments } from '../leads/useLeadAttachments.ts';
import { useOrderAttachments } from '../orders/useOrderAttachments.ts';
import { useQuoteAttachments } from '../quotes/useQuoteAttachments.ts';
import DrawerArrowIcon from './DrawerArrowIcon.tsx';
import DrawerMainHeader from './DrawerMainHeader.tsx';
import History from './history/History.tsx';
import Map from './map/Map.tsx';
import Tabs from './tabs/Tabs.tsx';
import Task from './task/Task.tsx';

function DrawerMain({ sourceType }: DrawerSourceType) {
  const { leadAttachments, isLoadingLeadAttachments } = useLeadAttachments(
    sourceType === 'lead',
  );
  const { quoteAttachments, isLoadingQuoteAttachments } = useQuoteAttachments(
    sourceType === 'quote',
  );
  const { orderAttachments, isLoadingOrderAttachments } = useOrderAttachments(
    sourceType === 'order',
  );

  const [activeKey, setActiveKey] = useState<string[] | string>(['3']);

  let attachments, isLoadingAttachments: boolean | undefined;

  switch (sourceType) {
    case 'lead':
      attachments = leadAttachments;
      isLoadingAttachments = isLoadingLeadAttachments;
      break;
    case 'quote':
      attachments = quoteAttachments;
      isLoadingAttachments = isLoadingQuoteAttachments;
      break;
    case 'order':
      attachments = orderAttachments;
      isLoadingAttachments = isLoadingOrderAttachments;
      break;
    default:
      break;
  }

  const typeTaskData = useMemo(
    () =>
      attachments?.filter(({ type }: { type: string }) => type === 'task') ??
      [],
    [attachments],
  );

  useEffect(() => {
    setActiveKey((prevActiveKey) => {
      let newActiveKey = Array.isArray(prevActiveKey)
        ? [...prevActiveKey]
        : [prevActiveKey];

      newActiveKey = newActiveKey.filter((key) => key !== '1');
      if (typeTaskData.length && !newActiveKey.includes('2')) {
        newActiveKey.push('2');
      } else {
        newActiveKey = newActiveKey.filter((key) => key !== '2');
      }

      return newActiveKey;
    });
  }, [typeTaskData, isLoadingAttachments]);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <DrawerMainHeader label="Map" />,
      children: <Map sourceType={sourceType} />,
    },
    {
      key: '2',
      label: <DrawerMainHeader label="Task" />,
      children: (
        <Task
          sourceType={sourceType}
          attachments={typeTaskData}
          isLoadingAttachments={isLoadingAttachments || false}
        />
      ),
    },
    {
      key: '3',
      label: <DrawerMainHeader label="History" />,
      children: (
        <History
          sourceType={sourceType}
          attachments={attachments}
          isLoadingAttachments={isLoadingAttachments || false}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs sourceType={sourceType} />
      <br />
      <Collapse
        activeKey={activeKey}
        defaultActiveKey={['3']}
        ghost
        collapsible="header"
        expandIcon={DrawerArrowIcon}
        items={items}
        onChange={(key) => setActiveKey(Array.isArray(key) ? key : [key])}
      />
    </>
  );
}

export default DrawerMain;
