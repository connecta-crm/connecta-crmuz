import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useState } from 'react';
import DrawerArrowIcon from './DrawerArrowIcon';
import DrawerFeatureDetailsContent from './DrawerFeatureDetailsContent';
import DrawerFeatureHeader from './DrawerFeatureHeader';
import DrawerFeaturePersonContent from './DrawerFeaturePersonContent';

function DrawerLeft() {
  const [openPanels, setOpenPanels] = useState<string[]>([]);

  const onChange = (key: string | string[]) => {
    const keyString = Array.isArray(key) ? key[0] : key;
    setOpenPanels(
      openPanels.includes(keyString)
        ? openPanels.filter((item) => item !== keyString)
        : [...openPanels, keyString],
    );
  };

  const onChangeCollapse = (panelKey: string[] | string) => {
    if (Array.isArray(panelKey)) {
      setOpenPanels(panelKey);
    } else {
      setOpenPanels((currentPanels) => {
        const currentSet = new Set(currentPanels);
        if (currentSet.has(panelKey)) {
          currentSet.delete(panelKey);
        } else {
          currentSet.add(panelKey);
        }
        return Array.from(currentSet);
      });
    }
  };

  const onChangePerson = () => {
    alert('casd');
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <DrawerFeatureHeader
          keyValue={'1'}
          label="Details"
          value="detail"
          onChange={onChange}
        />
      ),
      children: <DrawerFeatureDetailsContent />,
    },
    {
      key: '2',
      label: (
        <DrawerFeatureHeader
          keyValue={'2'}
          label="Person"
          value="person"
          onChange={onChangePerson}
        />
      ),
      children: <DrawerFeaturePersonContent />,
    },
  ];

  return (
    <Collapse
      activeKey={openPanels}
      onChange={onChangeCollapse}
      ghost
      collapsible="header"
      expandIcon={DrawerArrowIcon}
      items={items}
    />
  );
}

export default DrawerLeft;
