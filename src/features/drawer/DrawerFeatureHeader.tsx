/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { LeadData, QuoteData } from '../../models';
import { SourceType } from '../../ui/Drawer';
import { useUpdateFeatureData } from '../leads/useUpdateFeatureData';

type DrawerFeatureHeaderProps = {
  keyValue: string;
  label: string;
  value: string;
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
    onEditPerson,
    onEditNotes,
    onChangeMainCollapse,
    onChangeInnerCollapse,
  } = useDrawerFeature();

  const [fieldType, setFieldType] = useState<keyof LeadData | keyof QuoteData>(
    'customer',
  );

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
    onEditDetails(false);
    onChangeInnerCollapse([]);
  };

  const handleCancelDetails = () => {
    onEditDetails(false);
    onChangeInnerCollapse([]);
  };

  // * PERSON (MAIN COLLAPSE)

  const handleEditPerson = (keyValue: string) => {
    setFieldType('customer');
    onEditPerson(true);
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
      (updatedLeadData || updatedQuoteData) &&
      isDataUpdated &&
      !isLoading &&
      !error
    ) {
      console.log('CLOSED');
      onEditPerson(false);
      onEditNotes(false);
    }
  }, [
    isDataUpdated,
    isLoading,
    keyValue,
    error,
    updatedLeadData,
    updatedQuoteData,
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
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
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
