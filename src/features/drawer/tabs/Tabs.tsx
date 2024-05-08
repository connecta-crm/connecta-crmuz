import type { TabsProps } from 'antd';
import { Button, Flex, Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import TabEmail from './TabEmail';
import TabFiles from './TabFiles';
import Notes from './TabNotes';

const tabData = [
  {
    key: '1',
    label: 'Notes',
    value: 'notes',
    icon: (
      <>
        <img
          className="tab-icon default-icon"
          src="./img/drawer/tab/notes.svg"
          alt=""
        />
        <img
          className="tab-icon active-icon"
          src="./img/drawer/tab/notes_a.svg"
          alt=""
        />
      </>
    ),
    children: (
      <div>
        <Notes />
        <Flex className="p-5" gap="small" wrap="wrap">
          <Button size="small">Cancel</Button>
          <Button type="primary" size="small">
            Save
          </Button>
        </Flex>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Task',
    value: 'task',
    icon: (
      <>
        <img
          className="tab-icon default-icon"
          src="./img/drawer/tab/task.svg"
          alt=""
        />
        <img
          className="tab-icon active-icon"
          src="./img/drawer/tab/task.svg"
          alt=""
        />
      </>
    ),
    children: <p>tab content 2</p>,
  },
  {
    key: '3',
    label: 'Phone',
    value: 'phone',
    icon: (
      <>
        <img
          className="tab-icon default-icon"
          src="./img/drawer/tab/phone.svg"
          alt=""
        />
        <img
          className="tab-icon active-icon"
          src="./img/drawer/tab/phone.svg"
          alt=""
        />
      </>
    ),
    children: <p>tab content 3</p>,
  },
  {
    key: '4',
    label: 'Email',
    value: 'email',
    icon: (
      <>
        <img
          className="tab-icon default-icon"
          src="./img/drawer/tab/email.svg"
          alt=""
        />
        <img
          className="tab-icon active-icon"
          src="./img/drawer/tab/email.svg"
          alt=""
        />
      </>
    ),
    children: <TabEmail />,
  },
  {
    key: '5',
    label: 'Files',
    value: 'files',
    icon: (
      <>
        <img
          className="tab-icon default-icon"
          src="./img/drawer/tab/files.svg"
          alt=""
        />
        <img
          className="tab-icon active-icon"
          src="./img/drawer/tab/files.svg"
          alt=""
        />
      </>
    ),
    children: <TabFiles />,
  },
];

const items = tabData.map(({ key, label, value, icon, children }) => {
  return {
    label,
    key,
    children,
    // style: i === 0 ? { height: 200 } : undefined,
    icon,
    value,
  };
});

function TabsApp() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );
  return (
    <div className="tabs">
      <Tabs
        defaultActiveKey="1"
        type="card"
        renderTabBar={renderTabBar}
        items={items}
      />
    </div>
  );
}

export default TabsApp;
