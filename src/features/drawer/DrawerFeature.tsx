import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { DrawerSourceType } from '../../ui/Drawer';
import DrawerArrowIcon from './DrawerArrowIcon';
import DrawerFeatureDateContent from './DrawerFeatureDateContent';
import DrawerFeatureDetailsContent from './DrawerFeatureDetailsContent';
import DrawerFeatureHeader from './DrawerFeatureHeader';
import DrawerFeatureNotesContent from './DrawerFeatureNotesContent';
import DrawerFeaturePaymentContent from './DrawerFeaturePaymentContent';
import DrawerFeaturePersonContent from './DrawerFeaturePersonContent';
import FeatDateInner from './feature-date/FeatDateInner';
import FeatPersonInner from './feature-details/FeatPersonInner';
import FeatCarrierInfoInner from './feature-date/FeatCarrierInfoInner';
import DrawerFeatureCarrierInfoContent from './DrawerFeatureCarrierInfoContent';

function DrawerLeft({ sourceType }: DrawerSourceType) {
  const {
    isEditPerson,
    isEditNotes,
    isEditDate,
    isEditCarrierInfo,
    openMainPanels,
    onChangeMainCollapse,
  } = useDrawerFeature();

  const items: CollapseProps['items'] = [
    {
      key: '100',
      label: (
        <DrawerFeatureHeader
          keyValue={'100'}
          sourceType={sourceType}
          label="Details"
          value="detail"
        />
      ),
      children: <DrawerFeatureDetailsContent sourceType={sourceType} />,
      className: 'feature-drawer__item',
    },
    {
      key: '200',
      label: (
        <DrawerFeatureHeader
          keyValue={'200'}
          sourceType={sourceType}
          label="Person"
          value="person"
        />
      ),
      children: isEditPerson ? (
        <div className="box-header-inner box-header-inner-single">
          <FeatPersonInner sourceType={sourceType} />
        </div>
      ) : (
        <DrawerFeaturePersonContent sourceType={sourceType} />
      ),
      className: sourceType === 'order' ? 'feature-drawer__item' : '',
    },
    {
      key: '400',
      label: (
        <DrawerFeatureHeader
          keyValue={'400'}
          sourceType={sourceType}
          label="Payment"
          value="payment"
        />
      ),
      children: <DrawerFeaturePaymentContent sourceType={sourceType} />,
      className: 'feature-drawer__item',
    },
    {
      key: '500',
      label: (
        <DrawerFeatureHeader
          keyValue={'500'}
          sourceType={sourceType}
          label="Date"
          value="date"
        />
      ),
      children: isEditDate ? (
        <div className="box-header-inner box-header-inner-single">
          <FeatDateInner sourceType={sourceType} />
        </div>
      ) : (
        <DrawerFeatureDateContent sourceType={sourceType} />
      ),
      className: 'feature-drawer__item',
    },
    {
      key: '600',
      label: (
        <DrawerFeatureHeader
          keyValue={'600'}
          sourceType={sourceType}
          label="Carrier company info"
          value="carrier-company"
        />
      ),
      children: isEditCarrierInfo ? (
        <div className="box-header-inner box-header-inner-single">
          <FeatCarrierInfoInner sourceType={sourceType} />
        </div>
      ) : (
        <DrawerFeatureCarrierInfoContent sourceType={sourceType} />
      ),
      className: 'feature-drawer__item',
    },
  ];

  const keysToFilterForOrder: string[] = ['400', '500', '600'];

  const filteredItems: CollapseProps['items'] = items.filter(
    (item) =>
      !(keysToFilterForOrder.includes(item.key) && sourceType !== 'order'),
  );

  return (
    <>
      <Collapse
        activeKey={openMainPanels}
        onChange={onChangeMainCollapse}
        defaultActiveKey={['100', '200']}
        ghost
        collapsible="header"
        expandIcon={DrawerArrowIcon}
        items={filteredItems}
      />
      <br />
      {sourceType !== 'order' && (
        <div className="px-10 drawer__feature-notes">
          <DrawerFeatureHeader
            keyValue={'300'}
            sourceType={sourceType}
            label="Notes from shipper"
            value="notes"
          />
          <DrawerFeatureNotesContent
            isEditNotes={isEditNotes}
            sourceType={sourceType}
          />
        </div>
      )}
    </>
  );
}

export default DrawerLeft;
