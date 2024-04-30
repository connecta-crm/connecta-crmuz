import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useState } from 'react';
import FeatCondition from './feature-details/FeatCondition';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatVehicle from './feature-details/FeatVehicle';
import FeatVehicleInner from './feature-details/FeatVehicleInner';

function DrawerFeatureDetailsContent() {
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
        <FeatVehicle
          keyValue={'1'}
          openPanels={openPanels}
          onChange={onChange}
        />
      ),
      children: (
        <div className="detail-inner">
          <div className="detail-inner__form">
            <FeatVehicleInner />
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '2',
      label: (
        <FeatCondition
          keyValue={'2'}
          openPanels={openPanels}
          onChange={onChange}
        />
      ),
      children: (
        <div className="detail-inner">
          <div className="detail-inner__form">
            <FeatConditionInner />
          </div>
        </div>
      ),
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

export default DrawerFeatureDetailsContent;
