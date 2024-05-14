import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { merge } from 'lodash';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getLeadData,
  resetField as resetLeadField,
  setLeadData,
} from '../leads/leadSlice';
import { useLeadEdit } from '../leads/useLeadEdit';

type DrawerFeatureHeaderProps = {
  keyValue: string;
  label: string;
  value: string;
};

function DrawerFeatureHeader({
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

  const leadData = useAppSelector(getLeadData);
  const dispatch = useAppDispatch();
  const { editLead, updatedLeadData, isLoading, error } = useLeadEdit();

  const updateLeadModel = {
    ...leadData,
    customer: leadData.customer?.id,
    source: leadData.source?.id,
    origin: leadData.origin?.id,
    destination: leadData.destination?.id,
    user: leadData.user?.id,
    extraUser: leadData?.extraUser,
  };

  useEffect(() => {
    if (!isLoading && !error) {
      const merged = merge({}, leadData, updatedLeadData);
      dispatch(setLeadData(merged));
      // onChangeInnerCollapse(keyValue);
      onEditPerson(false);
      onEditNotes(false);
    }
  }, [isLoading, keyValue, error]);

  // * DETAILS

  const handleEditDetails = (keyValue: string) => {
    onEditDetails(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
    onChangeInnerCollapse(['1', '2', '3']);
  };
  const handleSaveDetails = () => {
    // some locig to save the data in DB and update UI
    onEditDetails(false);
    onChangeInnerCollapse([]);
  };
  const handleCancelDetails = () => {
    onEditDetails(false);
    onChangeInnerCollapse([]);
  };

  // * PERSON

  const handleEditPerson = (keyValue: string) => {
    onEditPerson(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
  };
  const handleSavePerson = () => {
    editLead({ guid: leadData.guid, updateLeadModel });
  };
  const handleCancelPerson = () => {
    dispatch(resetLeadField({ field: 'customer' }));
    // dispatch(resetQuoteField({ field }));
    onEditPerson(false);
  };

  // * NOTES

  const handleEditNotes = () => {
    onEditNotes(true);
    console.log(keyValue);
  };
  const handleSaveNotes = () => {
    editLead({ guid: leadData.guid, updateLeadModel });
  };
  const handleCancelNotes = () => {
    dispatch(resetLeadField({ field: 'notes' }));
    onEditNotes(false);
  };

  function Content() {
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
                handleCancelPerson();
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
                handleSavePerson();
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
  }

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
