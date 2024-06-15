import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
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
  const { leadAttachments, isLoadingLeadAttachments } = useLeadAttachments();
  const { quoteAttachments, isLoadingQuoteAttachments } = useQuoteAttachments();
  const { orderAttachments, isLoadingOrderAttachments } = useOrderAttachments();

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

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <DrawerMainHeader label="Map" />,
      children: <Map sourceType={sourceType} />,
    },
    {
      key: '2',
      label: <DrawerMainHeader label="Task" />,
      children: <Task />,
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
        defaultActiveKey={['3']}
        ghost
        collapsible="header"
        expandIcon={DrawerArrowIcon}
        items={items}
      />
    </>
  );
}

export default DrawerMain;
