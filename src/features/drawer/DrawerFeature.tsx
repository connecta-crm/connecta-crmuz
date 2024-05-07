import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import DrawerArrowIcon from './DrawerArrowIcon';
import DrawerFeatureDetailsContent from './DrawerFeatureDetailsContent';
import DrawerFeatureHeader from './DrawerFeatureHeader';
import DrawerFeaturePersonContent from './DrawerFeaturePersonContent';
import FeatPersonInner from './feature-details/FeatPersonInner';

function DrawerLeft() {
  const { isEditPerson, openMainPanels, onChangeMainCollapse } =
    useDrawerFeature();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <DrawerFeatureHeader keyValue={'1'} label="Details" value="detail" />
      ),
      children: <DrawerFeatureDetailsContent />,
    },
    {
      key: '2',
      label: (
        <DrawerFeatureHeader keyValue={'2'} label="Person" value="person" />
      ),
      children: isEditPerson ? (
        <div className="box-header-inner box-header-inner-single">
          <FeatPersonInner />
        </div>
      ) : (
        <DrawerFeaturePersonContent />
      ),
    },
  ];

  return (
    <Collapse
      activeKey={openMainPanels}
      onChange={onChangeMainCollapse}
      ghost
      collapsible="header"
      expandIcon={DrawerArrowIcon}
      items={items}
    />
  );
}

export default DrawerLeft;
