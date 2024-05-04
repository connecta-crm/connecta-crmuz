import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen from './FeatItemOpen';

type FeatConditionHeaderProps = {
  keyValue: string;
  label: string;
};

function FeatOriginHeader({ keyValue, label }: FeatConditionHeaderProps) {
  const { openInnerPanels } = useDrawerFeature();

  return (
    <div className="detail detail-origin">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label="Origin" icon="origin" />
        {openInnerPanels?.includes(keyValue) ? (
          <FeatItemOpen
            keyValue={keyValue}
            feature="origin"
            hasAddAction={false}
          />
        ) : (
          <FeatItemClose keyValue={keyValue} textWithBg={false} label={label} />
        )}
        <ArrowIcon keyValue={keyValue} />
      </div>
    </div>
  );
}

export default FeatOriginHeader;
