import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import { formatDate } from '../../utils/helpers';
import { getOrderData } from '../orders/orderSlice';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';

function DrawerFeatureDateContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const {
    dates: { dateEstDel: dateEstDelOrder },
    dates: { dateEstPu: dateEstPuOrder },
    dates: { dateEstShip: dateEstShipOrder },
  } = useAppSelector(getOrderData);

  let dateEstDel, dateEstPu, dateEstShip;

  switch (sourceType) {
    case 'order':
      dateEstDel = dateEstDelOrder;
      dateEstPu = dateEstPuOrder;
      dateEstShip = dateEstShipOrder;
      break;
    default:
      break;
  }

  const items: CollapseProps['items'] = [
    {
      key: '10',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Est. Ship Date" icon="none" />
            {openInnerPanels?.includes('510') ? (
              <FeatItemOpen
                keyValue="510"
                feature={sourceType}
                featureItemField="dates"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="510"
                label={formatDate(dateEstShip ? dateEstShip : '')}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '511',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Est. PU Date" icon="none" />
            {openInnerPanels?.includes('511') ? (
              <FeatItemOpen
                keyValue="511"
                feature={sourceType}
                featureItemField="dates"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="511"
                label={formatDate(dateEstPu ? dateEstPu : '')}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '512',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Est. DEL Date" icon="none" />
            {openInnerPanels?.includes('512') ? (
              <FeatItemOpen
                keyValue="512"
                feature={sourceType}
                featureItemField="dates"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="512"
                label={formatDate(dateEstDel ? dateEstDel : '')}
                editable={false}
              />
            )}
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

export default DrawerFeatureDateContent;
