import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import { getLeadData } from '../leads/leadSlice';
import { getOrderData } from '../orders/orderSlice';
import { getQuoteData } from '../quotes/quoteSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';
import FeatPersonEmailInner from './feature-details/FeatPersonEmailInner';
import FeatPersonNameInner from './feature-details/FeatPersonNameInner';
import FeatPersonPhoneInner from './feature-details/FeatPersonPhoneInner';

function DrawerFeaturePersonContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const {
    customerName: customerNameLead,
    customerPhone: customerPhoneLead,
    customer: customerLead,
  } = useAppSelector(getLeadData);
  const {
    customerName: customerNameQuote,
    customerPhone: customerPhoneQuote,
    customer: customerQuote,
  } = useAppSelector(getQuoteData);
  const {
    customerName: customerNameOrder,
    customerPhone: customerPhoneOrder,
    customer: customerOrder,
  } = useAppSelector(getOrderData);

  let customerName, customerPhone, customer;

  switch (sourceType) {
    case 'lead':
      customerName = customerNameLead;
      customerPhone = customerPhoneLead;
      customer = customerLead;
      break;
    case 'quote':
      customerName = customerNameQuote;
      customerPhone = customerPhoneQuote;
      customer = customerQuote;
      break;
    case 'order':
      customerName = customerNameOrder;
      customerPhone = customerPhoneOrder;
      customer = customerOrder;
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
            <FeatItemLabel label="Name" icon="user" />
            {openInnerPanels?.includes('10') ? (
              <FeatItemOpen
                keyValue="10"
                feature={sourceType}
                featureItemField="customer"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="10"
                tooltip={true}
                label={customerName}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPersonNameInner keyValue="10" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '11',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Email" icon="mail" />
            {openInnerPanels?.includes('11') ? (
              <FeatItemOpen
                keyValue="11"
                feature={sourceType}
                featureItemField="customer"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="11"
                tooltip={true}
                label={customer?.email}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPersonEmailInner keyValue="11" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '12',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Phone" icon="phone" />
            {openInnerPanels?.includes('12') ? (
              <FeatItemOpen
                keyValue="12"
                feature={sourceType}
                featureItemField="customer"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="12"
                tooltip={true}
                label={customerPhone}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPersonPhoneInner keyValue="12" feature={sourceType} />
        </DrawerFeatureRow>
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

export default DrawerFeaturePersonContent;
