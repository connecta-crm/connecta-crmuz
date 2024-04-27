import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import HistoryCard from './HistoryCard';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'All',
    children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15].map((item) => (
      <HistoryCard key={item} type={'notes'} />
    )),
  },
  {
    key: '2',
    label: 'Notes (0)',
    children: <p className="text-center">Empty</p>,
  },
  {
    key: '3',
    label: 'Tasks (1)',
    children: <HistoryCard type={'task'} />,
  },
];
function History() {
  return (
    <div className="history">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default History;
