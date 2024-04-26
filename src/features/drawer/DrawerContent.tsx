import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import DetailBox from './DrawerDetail';
import { DrawerContentHead, IconArrow } from './DrawerFeatures';
import History from './history/History.tsx';
import Map from './map/Map';
import Tabs from './tabs/Tabs.tsx';
import Task from './task/Task.tsx';

function DrawerContent() {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <DrawerContentHead label="Map" />,
      children: <Map />,
    },
    {
      key: '2',
      label: <DrawerContentHead label="Task" />,
      children: <Task />,
    },
    {
      key: '3',
      label: <DrawerContentHead label="History" />,
      children: <History />,
    },
  ];

  return (
    <div className="drawer-content d-flex">
      {/* <div className="drawer-content__container "> */}
      <div className="drawer-content__left">
        <DetailBox />
      </div>
      <div className="drawer-content__right p-20">
        <Tabs />
        <br />
        <Collapse
          defaultActiveKey={['3']}
          ghost
          collapsible="header"
          expandIcon={IconArrow}
          items={items}
        />
      </div>
    </div>
  );
}

export default DrawerContent;
