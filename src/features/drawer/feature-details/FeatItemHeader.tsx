import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen from './FeatItemOpen';

type FeatConditionHeaderProps = {
  keyValue: string;
  itemLabel: string;
  valueLabel: string;
  icon: string;
  feature: string;
  hasAddAction?: boolean;
  textWithBg?: boolean;
};

function FeatItemHeader({
  keyValue,
  itemLabel,
  valueLabel,
  icon,
  feature,
  hasAddAction = false,
  textWithBg = false,
}: FeatConditionHeaderProps) {
  const { openInnerPanels } = useDrawerFeature();

  return (
    <div className="detail detail-origin">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label={itemLabel} icon={icon} />
        {openInnerPanels?.includes(keyValue) ? (
          <FeatItemOpen
            keyValue={keyValue}
            feature={feature}
            hasAddAction={hasAddAction}
          />
        ) : (
          <FeatItemClose
            keyValue={keyValue}
            textWithBg={textWithBg}
            label={valueLabel}
          />
        )}
        <ArrowIcon keyValue={keyValue} />
      </div>
    </div>
  );
}

export default FeatItemHeader;
