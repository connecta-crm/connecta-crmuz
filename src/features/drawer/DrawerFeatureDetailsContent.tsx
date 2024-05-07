import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { getLeadData } from '../leads/leadSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatItemHeader from './feature-details/FeatItemHeader';
import FeatOriginInner from './feature-details/FeatOriginInner';
import FeatVehicleInner from './feature-details/FeatVehicleInner';
import FeatDestinationInner from './feature-details/FeatDestinationInner';

function DrawerFeatureDetailsContent() {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  /* eslint-disable @typescript-eslint/no-unused-vars */

  const data = useAppSelector(getLeadData);
  // ? label'ni har FeatCtHeader ichida chaqirmasdan, shu yerda hammasini bitta qilib chaqirib qoygan yaxshi
  const { condition, originName, destinationName } = data;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <FeatItemHeader
          keyValue={'1'}
          valueLabel={condition}
          itemLabel="Vehicle"
          icon="car"
          feature="lead_vehicle"
          hasAddAction={true}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatVehicleInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '2',
      label: (
        <FeatItemHeader
          keyValue={'2'}
          valueLabel={condition}
          itemLabel="Condition"
          icon="dvigatel"
          feature="lead_condition"
          textWithBg={true}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatConditionInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '3',
      label: (
        <FeatItemHeader
          keyValue={'3'}
          valueLabel={originName}
          itemLabel="Origin"
          icon="origin"
          feature="lead_origin"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatOriginInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '4',
      label: (
        <FeatItemHeader
          keyValue={'4'}
          valueLabel={destinationName}
          itemLabel="Destination"
          icon="destination"
          feature="lead_destination"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatDestinationInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
  ];

  const updatedItems = items.filter((item) => {
    if (!condition) {
      return item.key !== '2';
    }
    return item;
  });

  return (
    <div className="box-header-inner">
      <Collapse
        activeKey={openInnerPanels}
        ghost
        collapsible="icon"
        onChange={onChangeInnerCollapse}
        items={updatedItems}
      />
    </div>
  );
}

export default DrawerFeatureDetailsContent;
