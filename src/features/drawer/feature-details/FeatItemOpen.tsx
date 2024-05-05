import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { merge } from 'lodash';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, resetField, setLeadData } from '../../leads/leadSlice';
import { useEditLead } from '../useEditLead';
import { useEditVehicle } from '../useEditVehicle';

type FeatItemOpenProps = {
  keyValue: string;
  feature: string;
  hasAddAction?: boolean;
};

function FeatItemOpen({
  keyValue,
  feature,
  hasAddAction = false,
}: FeatItemOpenProps) {
  const { isEditDetails, onChangeInnerCollapse } = useDrawerFeature();

  const formData = useAppSelector((state) => state.vehicle.formData);
  const leadData = useAppSelector(getLeadData);
  const dispatch = useAppDispatch();

  const { editVehicle } = useEditVehicle();
  const { editLead, updatedLeadData, isLoading, error } = useEditLead();

  const updateLeadData = {
    ...leadData,
    customer: leadData.customer.id,
    source: leadData.source.id,
    origin: leadData.origin.id,
    destination: leadData.destination.id,
    user: leadData.user.id,
    extraUser: leadData.extraUser,
  };

  const handleSave = () => {
    switch (feature) {
      case 'lead_vehicle':
        editVehicle(formData);
        break;
      case 'lead_condition':
        editLead({ guid: leadData.guid, updateLeadData });
        break;
    }
  };

  useEffect(() => {
    if (!isLoading && !error) {
      const merged = merge({}, leadData, updatedLeadData);
      dispatch(setLeadData(merged));
      onChangeInnerCollapse(keyValue);
    }
  }, [isLoading, keyValue, error]);

  const handleCancel = () => {
    dispatch(resetField({ field: 'condition' }));
    onChangeInnerCollapse(keyValue);
  };

  const handleAddNewVehicle = () => {
    // onAddNewVehicle('newvehicle-');
  };
  return (
    <div className="detail__btns d-flex align-center">
      {!isEditDetails && (
        <>
          <Button
            block
            size="small"
            disabled={isLoading}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="ml-10"
            type="primary"
            size="small"
            disabled={isLoading}
            onClick={handleSave}
          >
            {isLoading ? <LoadingOutlined /> : 'Save'}
          </Button>{' '}
        </>
      )}
      {hasAddAction && (
        <div className="d-flex ml-10">
          <div
            onClick={() => {
              handleAddNewVehicle();
            }}
            className="box-header__add"
          >
            <img src="./img/plus_bold.svg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FeatItemOpen;
