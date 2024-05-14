import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useLeadAttachments } from '../../leads/useLeadAttachments';
import HistoryCard from './HistoryCard';

export type NoteItemType = {
  createdAt: string;
  id: number;
  lead: number;
  link: number;
  marked: boolean;
  secondTitle: null;
  title: string;
  type: string;
  user: number;
};

function History() {
  const { leadAttachments } = useLeadAttachments();

  const notes =
    leadAttachments?.filter(({ type }: { type: string }) => type === 'note') ??
    [];

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children:
        leadAttachments?.length &&
        leadAttachments.map((item: NoteItemType) => (
          <HistoryCard key={item.id} type={'note'} item={item} />
        )),
    },
    {
      key: '2',
      label: `Notes (${notes.length})`,
      children: notes.map((item: NoteItemType) => (
        <HistoryCard key={item.id} type={'note'} item={item} />
      )),
    },
    {
      key: '3',
      label: 'Tasks (1)',
      children: <HistoryCard type={'task'} />,
    },
  ];
  return (
    <div className="history">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default History;
