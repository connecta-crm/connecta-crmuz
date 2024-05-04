import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { getLeadData } from '../leads/leadSlice';
import FeatConditionHeader from './feature-details/FeatConditionHeader';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatVehicleHeader from './feature-details/FeatVehicleHeader';
import FeatVehicleInner from './feature-details/FeatVehicleInner';

function DrawerFeatureDetailsContent() {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const { leadVehicles } = useAppSelector(getLeadData);

  console.log('leadVehicle', leadVehicles);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <FeatVehicleHeader keyValue={'1'} />,
      children: (
        <div className="detail-inner">
          <div className="detail-inner__form">
            <FeatVehicleInner />
          </div>
        </div>
      ),
      showArrow: false,
    },
    // {
    //   key: '11',
    //   label: <FeatVehicleHeader keyValue={'11'} />,
    //   children: (
    //     <div className="detail-inner">
    //       <div className="detail-inner__form">
    //         <FeatVehicleInner />
    //       </div>
    //     </div>
    //   ),
    //   showArrow: false,
    // },
    {
      key: '2',
      label: <FeatConditionHeader keyValue={'2'} />,
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
