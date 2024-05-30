import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { DispatchData } from '../../models';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import { getOrderData } from '../orders/orderSlice';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';

function DrawerFeatureCarrierInfoContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const { dispatchData: dispatchDataOrder } = useAppSelector(getOrderData);

  let dispatchData: DispatchData | undefined;

  switch (sourceType) {
    case 'order':
      dispatchData = dispatchDataOrder;
      break;
    default:
      break;
  }

  if (!dispatchData) {
    return;
  }

  const {
    carrierData,
    dispatchCodMethod,
    dispatchPaidBy,
    dispatchPaymentTerm,
    dispatchPaymentType,
    dispatchTermBegins,
  } = dispatchData;

  const { phone, phone2, email, location, name: companyName } = carrierData;

  const items: CollapseProps['items'] = [
    {
      key: '610',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Company" icon="none" />
            {openInnerPanels?.includes('610') ? (
              <FeatItemOpen
                keyValue="610"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="610"
                label={String(companyName)}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '611',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Location" icon="none" />
            {openInnerPanels?.includes('611') ? (
              <FeatItemOpen
                keyValue="611"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="611"
                label={String(location)}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '612',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Phone" icon="none" />
            {openInnerPanels?.includes('612') ? (
              <FeatItemOpen
                keyValue="612"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="612"
                label={String(phone)}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '6012',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Phone" icon="none" />
            {openInnerPanels?.includes('6012') ? (
              <FeatItemOpen
                keyValue="6012"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="6012"
                label={String(phone2)}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '613',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Email" icon="none" />
            {openInnerPanels?.includes('613') ? (
              <FeatItemOpen
                keyValue="613"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="613"
                label={String(email)}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
      className: 'mb-12',
    },
    // * PAYMENT FEATURES
    {
      key: '614',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Will be paid by" icon="none" />
            {openInnerPanels?.includes('614') ? (
              <FeatItemOpen
                keyValue="614"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="614"
                label={String(dispatchPaidBy || '-')}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '615',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Payment Term" icon="none" />
            {openInnerPanels?.includes('615') ? (
              <FeatItemOpen
                keyValue="615"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="615"
                label={String(dispatchPaymentTerm || '-')}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '616',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Term begins" icon="none" />
            {openInnerPanels?.includes('616') ? (
              <FeatItemOpen
                keyValue="616"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="616"
                label={String(dispatchTermBegins || '-')}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '617',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="COD method" icon="none" />
            {openInnerPanels?.includes('617') ? (
              <FeatItemOpen
                keyValue="617"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="617"
                label={String(dispatchCodMethod || '-')}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '618',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Payment type" icon="none" />
            {openInnerPanels?.includes('618') ? (
              <FeatItemOpen
                keyValue="618"
                feature={sourceType}
                featureItemField="dispatchData"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="618"
                label={String(dispatchPaymentType || '-')}
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

export default DrawerFeatureCarrierInfoContent;
