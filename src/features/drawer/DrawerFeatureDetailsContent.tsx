import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import FeatCondition from './feature-details/FeatCondition';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatVehicle from './feature-details/FeatVehicle';
import FeatVehicleInner from './feature-details/FeatVehicleInner';

function DrawerFeatureDetailsContent() {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <FeatVehicle keyValue={'1'} />,
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
      label: <FeatCondition keyValue={'2'} />,
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
        activeKey={openInnerPanels}
        ghost
        collapsible="icon"
        onChange={onChangeInnerCollapse}
        items={items}
      />
    </div>
  );
}

export default DrawerFeatureDetailsContent;
