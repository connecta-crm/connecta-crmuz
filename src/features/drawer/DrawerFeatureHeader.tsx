/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { LeadData, OrderData, QuoteData } from '../../models';
import { useAppDispatch } from '../../store/hooks';
import { SourceType } from '../../ui/Drawer';
import { resetToInitialData as resetToInitialLeadData } from '../leads/leadSlice';
import { useUpdateFeatureData } from '../leads/useUpdateFeatureData';
import { resetToInitialData as resetToInitialOrderData } from '../orders/orderSlice';
import { resetToInitialData as resetToInitialQuoteData } from '../quotes/quoteSlice';

type ValueType =
  | 'detail'
  | 'person'
  | 'payment'
  | 'date'
  | 'notes'
  | 'carrier-company';

type DrawerFeatureHeaderProps = {
  keyValue: string;
  label: string;
  value: ValueType;
  sourceType: SourceType;
};

function DrawerFeatureHeader({
  sourceType: feature,
  keyValue,
  label,
  value,
}: DrawerFeatureHeaderProps) {
  const {
    openMainPanels,
    isEditDetails,
    onEditDetails,
    isEditPerson,
    isEditNotes,
    isEditPayment,
    isEditDate,
    isEditCarrierInfo,
    onEditPerson,
    onEditNotes,
    onEditPayment,
    onEditDate,
    onEditCarrierInfo,
    onChangeMainCollapse,
    onChangeInnerCollapse,
    onOpenCDPrice,
  } = useDrawerFeature();

  const [fieldType, setFieldType] = useState<
    keyof LeadData | keyof QuoteData | keyof OrderData
  >('customer');
  const [isUpdatedBulkEdit, setUpdatedBulkEdit] = useState(false);
  const dispatch = useAppDispatch();

  // * DETAILS (MAIN COLLAPSE)

  const handleEditDetails = (keyValue: string) => {
    onEditDetails(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
    onChangeInnerCollapse([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
    ]);
  };

  const handleSaveDetails = () => {
    // ? BULK EDIT SAVE operations. Some logic to save the data in DB and update UI
    onSaveFeature();
    setUpdatedBulkEdit(true);
  };

  const handleCancelDetails = () => {
    onEditDetails(false);
    onChangeInnerCollapse([]);
    switch (feature) {
      case 'lead':
        dispatch(resetToInitialLeadData());
        break;
      case 'quote':
        dispatch(resetToInitialQuoteData());
        break;
      case 'order':
        dispatch(resetToInitialOrderData());
        break;
      default:
        return null;
    }
  };

  // * PERSON (MAIN COLLAPSE)

  const handleEditPerson = (keyValue: string) => {
    setFieldType('customer');
    onEditPerson(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
  };

  // * PAYMENT (MAIN COLLAPSE)

  const handleEditPayment = (keyValue: string) => {
    setFieldType('payments');
    onEditPayment(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
    onChangeInnerCollapse(['30', '31', '32', '33', '34', '35']);
  };

  // * DATE (MAIN COLLAPSE)

  const handleEditDate = (keyValue: string) => {
    setFieldType('dates');
    onEditDate(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
  };

  // * CARRIER INFO (MAIN COLLAPSE)

  const handleEditCarrierInfo = (keyValue: string) => {
    setFieldType('dispatchData');
    onEditCarrierInfo(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
  };

  const [isDataUpdated, setDataUpdated] = useState(false);

  const {
    onSaveFeature,
    onCancelFeature,
    isLoading,
    error,
    updatedLeadData,
    updatedQuoteData,
    updatedOrderData,
  } = useUpdateFeatureData({
    keyValue,
    feature,
    field: fieldType,
    isDataUpdated,
    setDataUpdated,
  });

  // * NOTES

  const handleEditNotes = () => {
    setFieldType('notes');
    onEditNotes(true);
  };
  const handleSaveNotes = () => {
    setFieldType('notes');
    onSaveFeature();
  };
  const handleCancelNotes = () => {
    setFieldType('notes');
    onCancelFeature();
    onEditNotes(false);
  };

  useEffect(() => {
    if (
      (updatedLeadData || updatedQuoteData || updatedOrderData) &&
      isDataUpdated &&
      !isLoading &&
      !error
    ) {
      onEditPerson(false);
      onEditDate(false);
      onEditNotes(false);
      onEditCarrierInfo(false);
      if (isUpdatedBulkEdit) {
        onEditDetails(false);
        onChangeInnerCollapse([]);
        setUpdatedBulkEdit(false);
        console.log('BULKED');
      }
    }
  }, [
    isDataUpdated,
    isLoading,
    keyValue,
    error,
    updatedLeadData,
    updatedQuoteData,
    updatedOrderData,
    isUpdatedBulkEdit,
  ]);

  const Content = () => {
    let element = null;
    switch (value) {
      case 'detail':
        element = isEditDetails ? (
          <div className="detail__btns d-flex align-center pr-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCancelDetails();
              }}
              block
              size="small"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              loading={isLoading}
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleSaveDetails();
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCDPrice();
              }}
              type="primary"
              size="small"
              danger
            >
              CD Price
            </Button>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleEditDetails(keyValue);
              }}
              className="box-header__edit ml-10"
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
          </>
        );
        break;
      case 'person':
        element = isEditPerson ? (
          <div className="detail__btns d-flex align-center pr-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCancelFeature();
                onEditPerson(false);
              }}
              block
              size="small"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onSaveFeature();
                setDataUpdated(true);
              }}
            >
              {isLoading ? <LoadingOutlined /> : 'Save'}
            </Button>
          </div>
        ) : (
          <>
            <div
              className="box-header__edit ml-10"
              onClick={(e) => {
                e.stopPropagation();
                handleEditPerson(keyValue);
              }}
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="box-header__more ml-10"
            >
              <img src="./img/drawer/more-2.svg" alt="" />
            </div>
          </>
        );
        break;
      case 'notes':
        element = isEditNotes ? (
          <div className="detail__btns d-flex align-center pr-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCancelNotes();
              }}
              block
              size="small"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleSaveNotes();
              }}
            >
              {isLoading ? <LoadingOutlined /> : 'Save'}
            </Button>
          </div>
        ) : (
          <>
            <div
              className="box-header__edit ml-10"
              onClick={(e) => {
                e.stopPropagation();
                handleEditNotes();
              }}
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
          </>
        );
        break;
      case 'payment':
        element = isEditPayment ? (
          <div className="detail__btns d-flex align-center pr-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCancelFeature();
                onChangeInnerCollapse([]);
                setTimeout(() => {
                  onEditPayment(false);
                }, 300);
              }}
              block
              size="small"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onSaveFeature();
                setDataUpdated(true);
              }}
            >
              {isLoading ? <LoadingOutlined /> : 'Save'}
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCDPrice();
              }}
              type="primary"
              size="small"
              danger
            >
              CD Price
            </Button>
            <div
              className="box-header__edit ml-10"
              onClick={(e) => {
                e.stopPropagation();
                handleEditPayment(keyValue);
              }}
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="box-header__more ml-10"
            >
              <img src="./img/drawer/more-2.svg" alt="" />
            </div>
          </>
        );
        break;
      case 'date':
        element = isEditDate ? (
          <div className="detail__btns d-flex align-center pr-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCancelFeature();
                onEditDate(false);
              }}
              block
              size="small"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onSaveFeature();
                setDataUpdated(true);
              }}
            >
              {isLoading ? <LoadingOutlined /> : 'Save'}
            </Button>
          </div>
        ) : (
          <>
            <div
              className="box-header__edit ml-10"
              onClick={(e) => {
                e.stopPropagation();
                handleEditDate(keyValue);
              }}
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
          </>
        );
        break;
      case 'carrier-company':
        element = isEditCarrierInfo ? (
          <div className="detail__btns d-flex align-center pr-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCancelFeature();
                onEditCarrierInfo(false);
              }}
              block
              size="small"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onSaveFeature();
                setDataUpdated(true);
              }}
            >
              {isLoading ? <LoadingOutlined /> : 'Save'}
            </Button>
          </div>
        ) : (
          <>
            <div
              className="box-header__edit ml-10"
              onClick={(e) => {
                e.stopPropagation();
                handleEditCarrierInfo(keyValue);
              }}
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
          </>
        );
        break;
    }

    return element;
  };

  return (
    <div className="box-header d-flex align-center justify-between">
      <span className="box-header__label">{label}</span>
      <div className="d-flex align-center">
        <Content />
      </div>
    </div>
  );
}

export default DrawerFeatureHeader;
