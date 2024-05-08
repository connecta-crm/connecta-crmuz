import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen, { FeatItemOpenProps } from './FeatItemOpen';

export type FeatConditionHeaderProps = {
  itemLabel: string;
  itemCloseLabel: string;
  icon: string;
  textWithBg?: boolean;
  editable?: boolean;
} & FeatItemOpenProps;

function FeatItemHeader({
  keyValue,
  itemLabel,
  itemCloseLabel,
  icon,
  feature,
  featureItemField,
  hasAddAction = false,
  editable = true,
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
            featureItemField={featureItemField}
            hasAddAction={hasAddAction}
          />
        ) : (
          <FeatItemClose
            keyValue={keyValue}
            textWithBg={textWithBg}
            label={itemCloseLabel}
            editable={editable}
          />
        )}
        {editable && <ArrowIcon keyValue={keyValue} />}
      </div>
    </div>
  );
}

export default FeatItemHeader;
