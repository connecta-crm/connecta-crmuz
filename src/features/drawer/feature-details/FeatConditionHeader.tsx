import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen from './FeatItemOpen';

type FeatConditionHeaderProps = {
  keyValue: string;
  label: string;
};

function FeatConditionHeader({ keyValue, label }: FeatConditionHeaderProps) {
  const { openInnerPanels } = useDrawerFeature();

  return (
    <div className="detail detail-condition">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label="Condition" icon="dvigatel" />
        {openInnerPanels?.includes(keyValue) ? (
          <FeatItemOpen
            keyValue={keyValue}
            feature="lead"
            addRemoveBtn="none"
            featureItemField="condition"
          />
        ) : (
          <FeatItemClose keyValue={keyValue} textWithBg={true} label={label} />
        )}
        <ArrowIcon keyValue={keyValue} />
      </div>
    </div>
  );
}

export default FeatConditionHeader;
