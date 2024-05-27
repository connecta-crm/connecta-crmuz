import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { SourceType } from '../../../ui/Drawer';
import { isOrderData } from '../../leads/useCheckTypeData';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';
import {
  getInitialOrderData,
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import { FeatureData } from './FeatDestinationInner';

type FeatCDCMNotesProps = {
  keyValue: string | string[];
  sourceType: SourceType;
};

function FeatCDCMNotes({ keyValue, sourceType }: FeatCDCMNotesProps) {
  const orderData = useAppSelector(getOrderData);
  const initialOrderData = useAppSelector(getInitialOrderData);

  const dispatch = useAppDispatch();

  const [isDataUpdated, setDataUpdated] = useState(false);
  const [loading, setLoading] = useState({
    cdLoading: false,
    cmLoading: false,
  });

  let featureData: FeatureData | undefined;

  switch (sourceType) {
    case 'order':
      featureData = orderData;
      break;
    default:
      break;
  }

  const { onSaveFeature, isLoading, updatedOrderData } = useUpdateFeatureData({
    keyValue,
    feature: sourceType,
    field: 'cdNote', // optional, in this case it won't affect to the function
    isDataUpdated,
    setDataUpdated,
  });

  const handleChange = (field: string, value: string) => {
    switch (sourceType) {
      case 'order':
        dispatch(updateOrderField({ field, value }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (updatedOrderData && !isLoading) {
      setLoading({
        cdLoading: false,
        cmLoading: false,
      });
      console.log('Loaded');
    }
  }, [updatedOrderData, isLoading]);

  if (!featureData) {
    return;
  }

  return (
    isOrderData(featureData) && (
      <div className="detail detail-origin mt-5">
        <div className="detail__header d-flex flex-column ">
          <div className="d-flex justify-between mb-5">
            <div className="form-label pl-0 mr-5">CD note</div>
            <Input
              value={featureData.cdNote}
              style={{ width: 258, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChange('cdNote', e.target.value)}
            />
            <Button
              className="ml-5"
              size="small"
              disabled={
                (isLoading && loading.cdLoading) ||
                featureData.cdNote.trim() === initialOrderData.cdNote.trim()
              }
              onClick={() => {
                setLoading({ ...loading, cdLoading: true });
                onSaveFeature();
              }}
            >
              {isLoading && loading.cdLoading ? (
                <LoadingOutlined />
              ) : (
                <SaveOutlined />
              )}
            </Button>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="form-label pl-0 mr-5">CM note</div>
            <Input
              value={featureData.cmNote}
              style={{ width: 258, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChange('cmNote', e.target.value)}
            />
            <Button
              className="ml-5"
              size="small"
              disabled={
                (isLoading && loading.cmLoading) ||
                featureData.cmNote.trim() === initialOrderData.cmNote.trim()
              }
              onClick={() => {
                setLoading({ ...loading, cmLoading: true });
                onSaveFeature();
              }}
            >
              {isLoading && loading.cmLoading ? (
                <LoadingOutlined />
              ) : (
                <SaveOutlined />
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default FeatCDCMNotes;
