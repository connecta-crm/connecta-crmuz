import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import { CONDITION_TYPES } from '../../utils/constants';
import { getOrderData } from '../orders/orderSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';

function DrawerFeaturePaymentContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const orderData = useAppSelector(getOrderData);
  let selectedData = null;

  switch (sourceType) {
    case 'order':
      selectedData = orderData;
      break;
  }

  if (!selectedData) {
    return;
  }

  const { condition } = selectedData;

  switch (sourceType) {
    case 'order':
      break;
  }

  const items: CollapseProps['items'] = [
    {
      key: '30',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Condition" icon="dvigatel" />
            {openInnerPanels?.includes('30') ? (
              <FeatItemOpen
                keyValue="30"
                feature={sourceType}
                featureItemField="condition"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="30"
                textWithBg={true}
                feature={sourceType}
                label={
                  CONDITION_TYPES.find((type) => type.value === condition)
                    ?.label || undefined
                }
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatConditionInner feature={sourceType} keyValue="2" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
      className: 'mb-12',
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

export default DrawerFeaturePaymentContent;
