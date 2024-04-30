import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useState } from 'react';
import FeatPerson from './feature-person/FeatPerson';

function DrawerFeaturePersonContent() {
  const [openPanels, setOpenPanels] = useState<string[]>([]);

  const onChange = (key: string | string[]) => {
    const keyString = Array.isArray(key) ? key[0] : key;
    setOpenPanels(
      openPanels.includes(keyString)
        ? openPanels.filter((item) => item !== keyString)
        : [...openPanels, keyString],
    );
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <FeatPerson
          keyValue={'1'}
          openPanels={openPanels}
          onChange={onChange}
        />
      ),
      children: null,
      showArrow: false,
    },
  ];

  return (
    <div className="box-header-inner">
      <Collapse
        activeKey={openPanels}
        ghost
        collapsible="icon"
        onChange={onChange}
        items={items}
      />
    </div>
  );
}

export default DrawerFeaturePersonContent;
