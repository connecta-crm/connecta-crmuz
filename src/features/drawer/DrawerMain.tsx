import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import DrawerArrowIcon from './DrawerArrowIcon.tsx';
import DrawerMainHeader from './DrawerMainHeader.tsx';
import History from './history/History.tsx';
import Map from './map/Map.tsx';
import Tabs from './tabs/Tabs.tsx';
import Task from './task/Task.tsx';
function DrawerMain() {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <DrawerMainHeader label="Map" />,
      children: <Map />,
    },
    {
      key: '2',
      label: <DrawerMainHeader label="Task" />,
      children: <Task />,
    },
    {
      key: '3',
      label: <DrawerMainHeader label="History" />,
      children: <History />,
    },
  ];
  return (
    <>
      <Tabs />
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
