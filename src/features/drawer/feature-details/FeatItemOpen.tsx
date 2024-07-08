import { LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import {
  CustomerData,
  LeadData,
  LeadVehicle,
  OrderData,
  OrderVehicle,
  QuoteData,
  QuoteVehicle,
} from '../../../models';
import { useAppSelector } from '../../../store/hooks';
import { SourceType } from '../../../ui/Drawer';
import { getCustomerData } from '../../customers/customerSlice';
import { getLeadData } from '../../leads/leadSlice';
import {
  isLeadData,
  isOrderData,
  isQuoteData,
} from '../../leads/useCheckTypeData';
import { useLeadVehicleCreate } from '../../leads/useLeadVehicleCreate';
import { useLeadVehicleDelete } from '../../leads/useLeadVehicleDelete';
import {
  UpdateLeadDataProps,
  useUpdateFeatureData,
} from '../../leads/useUpdateFeatureData';
import { getOrderData } from '../../orders/orderSlice';
import { useOrderVehicleCreate } from '../../orders/useOrderVehicleCreate';
import { useOrderVehicleDelete } from '../../orders/useOrderVehicleDelete';
import { getQuoteData } from '../../quotes/quoteSlice';
import { useQuoteVehicleCreate } from '../../quotes/useQuoteVehicleCreate';
import { useQuoteVehicleDelete } from '../../quotes/useQuoteVehicleDelete';

export type FeatItemOpenProps = {
  keyValue: string;
  feature: SourceType;
  featureItemField:
    | keyof LeadData
    | keyof QuoteData
    | keyof OrderData
    | keyof CustomerData;
  addRemoveBtn?: 'add' | 'remove' | 'none';
  featureItemData?: LeadVehicle | QuoteVehicle | OrderVehicle;
  classNames?: string;
  series?: boolean;
};

const text = 'Are you sure to delete this vehicle?';
const description = 'Delete the vehicle';

export function useFeatItemOpenData(
  type: SourceType,
  params: UpdateLeadDataProps,
) {
  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);
  const customerData = useAppSelector(getCustomerData);

  const updateLeadData = useUpdateFeatureData(params);
  const updateQuoteData = useUpdateFeatureData(params);
  const updateOrderData = useUpdateFeatureData(params);
  const updateCustomerData = useUpdateFeatureData(params);

  const { createLeadVehicle } = useLeadVehicleCreate();
  const { createQuoteVehicle } = useQuoteVehicleCreate();
  const { createOrderVehicle } = useOrderVehicleCreate();

  const { deleteLeadVehicle, isLoadingDeleteLeadVehicle } =
    useLeadVehicleDelete();
  const { deleteQuoteVehicle, isLoadingDeleteQuoteVehicle } =
    useQuoteVehicleDelete();
  const { deleteOrderVehicle, isLoadingDeleteOrderVehicle } =
    useOrderVehicleDelete();

  let data, updateData, createVehicle, deleteVehicle, isLoadingVehicleDelete;

  switch (type) {
    case 'lead':
      data = leadData;
      updateData = updateLeadData;
      createVehicle = createLeadVehicle;
      deleteVehicle = deleteLeadVehicle;
      isLoadingVehicleDelete = isLoadingDeleteLeadVehicle;
      break;
    case 'quote':
      data = quoteData;
      updateData = updateQuoteData;
      createVehicle = createQuoteVehicle;
      deleteVehicle = deleteQuoteVehicle;
      isLoadingVehicleDelete = isLoadingDeleteQuoteVehicle;
      break;
    case 'order':
      data = orderData;
      updateData = updateOrderData;
      createVehicle = createOrderVehicle;
      deleteVehicle = deleteOrderVehicle;
      isLoadingVehicleDelete = isLoadingDeleteOrderVehicle;
      break;
    case 'customer':
      data = customerData;
      updateData = updateCustomerData;
      break;
    default:
      throw new Error('Invalid type');
  }

  return {
    data,
    updateData,
    createVehicle,
    deleteVehicle,
    isLoadingVehicleDelete,
  };
}

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
  const [isDataUpdated, setDataUpdated] = useState(false);

  const {
    data,
    updateData,
    createVehicle,
    deleteVehicle,
    isLoadingVehicleDelete,
  } = useFeatItemOpenData(feature, {
    keyValue,
    feature,
    field,
    featureItemData,
    isDataUpdated,
    setDataUpdated,
  });

  const { onCancelFeature, onSaveFeature, isLoading, isLoadingVehicleEdit } =
    updateData;

  const handleAddNewVehicle = () => {
    if (isLeadData(data) && data.leadVehicles.length && createVehicle) {
      const lead = data.id;
      const vehicle = data.leadVehicles[0]?.vehicle.id || null;
      const vehicleYear = data.leadVehicles[0]?.vehicleYear || '';
      createVehicle({ vehicle, vehicleYear, lead });
      setDataUpdated(true);
    }
    if (isQuoteData(data) && data.quoteVehicles.length && createVehicle) {
      const quote = data.id;
      const vehicle = data.quoteVehicles[0]?.vehicle.id || null;
      const vehicleYear = data.quoteVehicles[0]?.vehicleYear || '';
      createVehicle({ vehicle, vehicleYear, quote });
      setDataUpdated(true);
    }
    if (isOrderData(data) && data.orderVehicles.length && createVehicle) {
      const order = data.id;
      const vehicle = data.orderVehicles[0]?.vehicle.id || null;
      const vehicleYear = data.orderVehicles[0]?.vehicleYear || '';
      const lot = data.orderVehicles[0]?.lot;
      const vin = data.orderVehicles[0]?.vin;
      const color = data.orderVehicles[0]?.color;
      const plate = data.orderVehicles[0]?.plate;
      createVehicle({ vehicle, vehicleYear, order, lot, vin, color, plate });
      setDataUpdated(true);
    }
  };

  const handleRemoveVehicle = () => {
    const id = featureItemData?.id;
    if (id && deleteVehicle) {
      deleteVehicle(id);
      setDataUpdated(true);
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
              disabled={isLoading || isLoadingVehicleEdit}
              onClick={onCancelFeature}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading || isLoadingVehicleEdit}
              loading={isLoading || isLoadingVehicleEdit}
              onClick={onSaveFeature}
            >
              Save
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
            okText={isLoadingVehicleDelete ? <LoadingOutlined /> : 'Yes'}
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
