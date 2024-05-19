import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { DrawerSourceType } from '../../ui/Drawer';
import DrawerArrowIcon from './DrawerArrowIcon';
import DrawerFeatureDetailsContent from './DrawerFeatureDetailsContent';
import DrawerFeatureHeader from './DrawerFeatureHeader';
import DrawerFeatureNotesContent from './DrawerFeatureNotesContent';
import DrawerFeaturePersonContent from './DrawerFeaturePersonContent';
import FeatPersonInner from './feature-details/FeatPersonInner';

function DrawerLeft({ sourceType }: DrawerSourceType) {
  const { isEditPerson, isEditNotes, openMainPanels, onChangeMainCollapse } =
    useDrawerFeature();

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
    },
  ];

  return (
    <>
      <Collapse
        activeKey={openMainPanels}
        onChange={onChangeMainCollapse}
        defaultActiveKey={['100', '200']}
        ghost
        collapsible="header"
        expandIcon={DrawerArrowIcon}
        items={items}
      />
      <br />
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
    </>
  );
}

export default DrawerLeft;
