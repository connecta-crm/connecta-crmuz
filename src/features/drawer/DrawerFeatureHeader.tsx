import { Button } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';

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
    onEditPerson,
    onChangeMainCollapse,
  } = useDrawerFeature();

  // !DETAILS
  const handleEditDetails = (keyValue: string) => {
    onEditDetails(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
  };
  const handleSaveDetails = () => {
    // some locig to save the data in DB and update UI
    onEditDetails(false);
  };
  const handleCancelDetails = () => {
    onEditDetails(false);
  };
  // !PERSON
  const handleEditPerson = (keyValue: string) => {
    onEditPerson(true);
    if (!openMainPanels.includes(keyValue)) {
      onChangeMainCollapse(keyValue);
    }
  };
  const handleSavePerson = () => {
    // some locig to save the data in DB and update UI
    onEditPerson(false);
  };
  const handleCancelPerson = () => {
    onEditPerson(false);
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
            >
              Cancel
            </Button>
            <Button
              className="ml-10"
              type="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleSavePerson();
              }}
            >
              Save
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
      case 'other':
        element = 'other';
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
