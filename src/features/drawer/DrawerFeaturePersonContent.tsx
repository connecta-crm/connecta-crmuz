import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { getLeadData } from '../leads/leadSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import FeatItemHeader from './feature-details/FeatItemHeader';
import FeatPersonEmailInner from './feature-details/FeatPersonEmailInner';
import FeatPersonNameInner from './feature-details/FeatPersonNameInner';
import FeatPersonPhoneInner from './feature-details/FeatPersonPhoneInner';

function DrawerFeaturePersonContent() {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const {
    customerName,
    customerPhone,
    customer: { email: customerEmail },
  } = useAppSelector(getLeadData);

  const items: CollapseProps['items'] = [
    {
      key: '10',
      label: (
        <FeatItemHeader
          keyValue="10"
          itemCloseLabel={customerName}
          itemLabel="Name"
          icon="user"
          feature="lead"
          featureItemField="customer"
          editable={false}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPersonNameInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '11',
      label: (
        <FeatItemHeader
          keyValue="11"
          itemCloseLabel={customerEmail}
          itemLabel="Email"
          icon="mail"
          feature="lead"
          featureItemField="customer"
          editable={false}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPersonEmailInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '12',
      label: (
        <FeatItemHeader
          keyValue="12"
          itemCloseLabel={customerPhone}
          itemLabel="Phone"
          icon="phone"
          feature="lead"
          featureItemField="customer"
          editable={false}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPersonPhoneInner />
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
