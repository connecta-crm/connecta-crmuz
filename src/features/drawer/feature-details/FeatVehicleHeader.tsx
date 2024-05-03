import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen from './FeatItemOpen';

type FeatVehicleProps = {
  keyValue: string;
};

function FeatVehicleHeader({ keyValue }: FeatVehicleProps) {
  const { openInnerPanels } = useDrawerFeature();
  return (
    <div className="detail detail-vehicle">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label="Vehicle" icon="car" />
        {openInnerPanels?.includes(keyValue) ? (
          <FeatItemOpen keyValue={keyValue} hasAddAction={true} />
        ) : (
          <FeatItemClose
            keyValue={keyValue}
            data={{ label: '2022 Toyota Camry' }}
          />
        )}
        <ArrowIcon keyValue={keyValue} />
      </div>
    </div>
  );
}

export default FeatVehicleHeader;
