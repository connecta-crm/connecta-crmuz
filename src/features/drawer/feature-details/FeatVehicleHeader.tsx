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
  const arr = [
    {
      id: 54,
      vehicle: {
        id: 218,
        mark: {
          id: 35,
          name: 'Mercedes-Benz',
        },
        name: 'A-Class',
        vehicleType: 'Car',
      },
      vehicleYear: 2024,
      lead: 84,
    },
  ];
  const label =
    arr[0].vehicleYear.toString() +
    ' ' +
    arr[0].vehicle.mark.name +
    ' ' +
    arr[0].vehicle.name;
  return (
    <div className="detail detail-vehicle">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label="Vehicle" icon="car" />
        {openInnerPanels?.includes(keyValue) ? (
          <FeatItemOpen
            keyValue={keyValue}
            feature="lead"
            addRemoveBtn="add"
            featureItemField="leadVehicles"
          />
        ) : (
          <FeatItemClose keyValue={keyValue} label={label} />
        )}
        <ArrowIcon keyValue={keyValue} />
      </div>
    </div>
  );
}

export default FeatVehicleHeader;
