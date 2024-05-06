import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useState } from 'react';
import DrawerArrowIcon from './DrawerArrowIcon';
import DrawerFeatureDetailsContent from './DrawerFeatureDetailsContent';
import DrawerFeatureHeader from './DrawerFeatureHeader';
import DrawerFeaturePersonContent from './DrawerFeaturePersonContent';

function DrawerLeft() {
  const [openPanels, setOpenPanels] = useState<string[]>([]);
  const [isEditDetails, setEditDetails] = useState(false);

  const onEditDetails = (value: boolean) => {
    setEditDetails(value);
  };

  const onChangeDetails = (key: string | string[]) => {
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

  const onChangePerson = (key: string) => {
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
        <DrawerFeatureHeader
          keyValue={'1'}
          label="Details"
          value="detail"
          openPanels={openPanels}
          isEditDetails={isEditDetails}
          onEditDetails={onEditDetails}
          onChange={onChangeDetails}
        />
      ),
      children: <DrawerFeatureDetailsContent isEditDetails={isEditDetails} />,
    },
    {
      key: '2',
      label: (
        <DrawerFeatureHeader
          keyValue={'2'}
          label="Person"
          value="person"
          openPanels={openPanels}
          isEditDetails={isEditDetails}
          onEditDetails={onEditDetails}
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
