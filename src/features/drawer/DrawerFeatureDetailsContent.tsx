import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { getLeadData } from '../leads/leadSlice';
import FeatConditionHeader from './feature-details/FeatConditionHeader';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatOriginHeader from './feature-details/FeatOriginHeader';
import FeatOriginInner from './feature-details/FeatOriginInner';
import FeatVehicleHeader from './feature-details/FeatVehicleHeader';
import FeatVehicleInner from './feature-details/FeatVehicleInner';

function DrawerFeatureDetailsContent() {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  /* eslint-disable @typescript-eslint/no-unused-vars */

  const { leadVehicles } = useAppSelector(getLeadData);
  const data = useAppSelector(getLeadData);
  // ? label'ni har FeatCtHeader ichida chaqirmasdan, shu yerda hammasini bitta qilib chaqirib qoygan yaxshi
  const { condition, originName } = data;

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
    {
      key: '2',
      label: <FeatConditionHeader keyValue={'2'} label={condition} />,
      children: (
        <div className="detail-inner">
          <div className="detail-inner__form">
            <FeatConditionInner />
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '3',
      label: <FeatOriginHeader keyValue={'3'} label={originName} />,
      children: (
        <div className="detail-inner">
          <div className="detail-inner__form">
            <FeatOriginInner />
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
