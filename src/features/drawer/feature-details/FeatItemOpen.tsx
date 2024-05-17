import { LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppSelector } from '../../../store/hooks';
import { LeadData, LeadVehicle, getLeadData } from '../../leads/leadSlice';
import { useLeadVehicleCreate } from '../../leads/useLeadVehicleCreate';
import { useLeadVehicleDelete } from '../../leads/useLeadVehicleDelete';
import { useUpdateLeadData } from '../../leads/useUpdateLeadData';

export type FeatItemOpenProps = {
  keyValue: string;
  feature: 'lead' | 'quote' | 'order';
  featureItemField: keyof LeadData; // keyof LeadData | QuoteData
  addRemoveBtn?: 'add' | 'remove' | 'none';
  featureItemData?: LeadVehicle;
  classNames?: string;
  series?: boolean;
};

const text = 'Are you sure to delete this vehicle?';
const description = 'Delete the vehicle';

function FeatItemOpen({
  keyValue,
  feature,
  featureItemField: field,
  addRemoveBtn = 'none',
  featureItemData,
  series = true,
}: FeatItemOpenProps) {
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const { isEditDetails } = useDrawerFeature();

  const [isleadUpdated, setLeadUpdated] = useState(false);

  const leadData = useAppSelector(getLeadData);

  const {
    onCancelFeature,
    onSaveFeature,
    isLoading,
    isLoadingLeadVehicleEdit,
  } = useUpdateLeadData({
    keyValue,
    feature,
    field,
    featureItemData,
    isleadUpdated,
    setLeadUpdated,
  });

  const { deleteLeadVehicle, isLoading: isLoadingLeadVehicleDelete } =
    useLeadVehicleDelete();

  const { createLeadVehicle } = useLeadVehicleCreate();

  const handleAddNewVehicle = () => {
    const lead = leadData.id;
    const vehicle = leadData.leadVehicles[0]?.vehicle.id || null;
    const vehicleYear = leadData.leadVehicles[0]?.vehicleYear || '';
    createLeadVehicle({ vehicle, vehicleYear, lead });
    setLeadUpdated(true);
  };

  const handleRemoveVehicle = () => {
    const id = featureItemData?.id;
    if (id) {
      deleteLeadVehicle(id);
      setLeadUpdated(true);
    }
  };

  return (
    <div className="detail__btns d-flex align-center">
      {series &&
        !isEditDetails &&
        !(field === 'price' || field === 'reservationPrice') && (
          <>
            <Button
              block
              size="small"
              disabled={isLoading || isLoadingLeadVehicleEdit}
              onClick={onCancelFeature}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading || isLoadingLeadVehicleEdit}
              onClick={onSaveFeature}
            >
              {isLoading || isLoadingLeadVehicleEdit ? (
                <LoadingOutlined />
              ) : (
                'Save'
              )}
            </Button>
          </>
        )}
      {addRemoveBtn === 'add' ? (
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
      ) : addRemoveBtn === 'remove' ? (
        <div className="d-flex ml-10">
          <Popconfirm
            placement="top"
            title={text}
            description={description}
            okText={isLoadingLeadVehicleDelete ? <LoadingOutlined /> : 'Yes'}
            cancelText="No"
            open={popconfirmOpen}
            onConfirm={handleRemoveVehicle}
            onCancel={() => setPopconfirmOpen(false)}
          >
            <div
              onClick={() => setPopconfirmOpen(true)}
              className="box-header__add"
            >
              <img src="./img/minus_bold.svg" alt="" />
            </div>
          </Popconfirm>
        </div>
      ) : null}
    </div>
  );
}

export default FeatItemOpen;
