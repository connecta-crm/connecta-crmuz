import { LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  LeadData,
  LeadVehicle,
  getLeadData,
  resetField as resetLeadField,
  setLeadData,
} from '../../leads/leadSlice';
import { useLeadEdit } from '../../leads/useLeadEdit';
import { useLeadVehicleCreate } from '../../leads/useLeadVehicleCreate';
import { useLeadVehicleDelete } from '../../leads/useLeadVehicleDelete';
import { useLeadVehicleEdit } from '../../leads/useLeadVehicleEdit';

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
  const { isEditDetails, onChangeInnerCollapse } = useDrawerFeature();

  const [leadUpdated, setLeadUpdated] = useState(false);

  const updateLead = () => {
    setLeadUpdated(true);
  };

  const leadData = useAppSelector(getLeadData);
  const dispatch = useAppDispatch();

  const { editLead, updatedLeadData, isLoading, error } = useLeadEdit();

  const { editLeadVehicle, isLoading: isLoadingLeadVehicleEdit } =
    useLeadVehicleEdit();

  const { deleteLeadVehicle, isLoading: isLoadingLeadVehicleDelete } =
    useLeadVehicleDelete();

  const { createLeadVehicle } = useLeadVehicleCreate();

  const updateLeadModel = {
    ...leadData,
    customer: leadData.customer?.id,
    source: leadData.source?.id,
    origin: leadData.origin?.id,
    destination: leadData.destination?.id,
    user: leadData.user?.id,
    extraUser: leadData?.extraUser,
  };

  const handleSave = () => {
    switch (feature) {
      case 'lead':
        if (field === 'leadVehicles') {
          if (
            featureItemData?.id &&
            featureItemData?.vehicle.id &&
            featureItemData?.vehicleYear
          ) {
            editLeadVehicle({
              id: featureItemData?.id,
              vehicle: featureItemData?.vehicle.id,
              lead: leadData.id,
              vehicleYear: featureItemData?.vehicleYear,
            });
            updateLead();
          }
          return;
        }
        editLead({ guid: leadData.guid, updateLeadModel });
        updateLead();
        break;
      case 'quote':
        // editQuote({ guid: leadData.guid, updateLeadData });
        break;
    }
  };

  const handleCancel = () => {
    switch (feature) {
      case 'lead':
        dispatch(resetLeadField({ field }));
        break;
      case 'quote':
        // dispatch(resetQuoteField({ field }));
        break;
    }
    onChangeInnerCollapse(keyValue);
  };

  const handleAddNewVehicle = () => {
    const lead = leadData.id;
    const vehicle = leadData.leadVehicles[0]?.vehicle.id || null;
    const vehicleYear = leadData.leadVehicles[0]?.vehicleYear || '';
    createLeadVehicle({ vehicle, vehicleYear, lead });
    updateLead();
  };

  const handleRemoveVehicle = () => {
    const id = featureItemData?.id;
    if (id) {
      deleteLeadVehicle(id);
      updateLead();
    }
  };

  useEffect(() => {
    if (leadUpdated && !isLoading && !error) {
      const merged = merge({}, leadData, updatedLeadData);
      dispatch(setLeadData(merged));
      onChangeInnerCollapse(keyValue);
      setLeadUpdated(false);
      console.log('MERGE FeatItemOpen');
    }
  }, [setLeadUpdated, leadUpdated, isLoading, error, dispatch]);

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
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading || isLoadingLeadVehicleEdit}
              onClick={handleSave}
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
