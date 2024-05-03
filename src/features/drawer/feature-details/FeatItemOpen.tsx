import { Button } from 'antd';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppSelector } from '../../../store/hooks';
import { useEditVehicle } from '../useEditVehicle';

type FeatItemOpenProps = {
  keyValue: string;
  hasAddAction?: boolean;
};

function FeatItemOpen({ keyValue, hasAddAction = false }: FeatItemOpenProps) {
  const { onChangeInnerCollapse } = useDrawerFeature();

  const formData = useAppSelector((state) => state.vehicle.formData);
  const { editVehicle } = useEditVehicle();

  function handleSaveClick() {
    editVehicle(formData);
    onChangeInnerCollapse(keyValue);
  }

  return (
    <div className="detail__btns d-flex align-center">
      <Button block size="small">
        Cancel
      </Button>
      <Button
        className="ml-10"
        type="primary"
        size="small"
        onClick={handleSaveClick}
      >
        Save
      </Button>
      {hasAddAction && (
        <div className="d-flex ml-10">
          <div className="box-header__add">
            <img src="./img/plus_bold.svg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FeatItemOpen;
