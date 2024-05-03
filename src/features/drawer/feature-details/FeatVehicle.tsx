import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen from './FeatItemOpen';

type FeatVehicleProps = {
  keyValue: string;
  openPanels: string[];
  isEditDetails: boolean;
  onChange: (val: string) => void;
};

function FeatVehicle({
  keyValue,
  openPanels,
  // isEditDetails,
  onChange,
}: FeatVehicleProps) {
  return (
    <div className="detail detail-vehicle">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label="Vehicle" icon="car" />
        {openPanels?.includes(keyValue) ? (
          <FeatItemOpen
            keyValue={keyValue}
            hasAddAction={true}
            onChange={onChange}
          />
        ) : (
          <FeatItemClose
            keyValue={keyValue}
            data={{ label: '2022 Toyota Camry' }}
            onChange={onChange}
          />
        )}
        <ArrowIcon keyValue={keyValue} openPanels={openPanels} />
      </div>
    </div>
  );
}

export default FeatVehicle;
