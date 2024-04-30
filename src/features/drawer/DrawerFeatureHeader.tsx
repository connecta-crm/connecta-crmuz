import { Button } from 'antd';

type DrawerFeatureHeaderProps = {
  keyValue: string;
  label: string;
  value: string;
  onChange: (e: string) => void;
};

function DrawerFeatureHeader({
  keyValue,
  label,
  value,
  onChange,
}: DrawerFeatureHeaderProps) {
  function Content() {
    let element = null;
    switch (value) {
      case 'detail':
        element = (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                console.log('CD Price');
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
                onChange(keyValue);
                console.log('Edit');
              }}
              className="box-header__edit ml-10"
            >
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
          </>
        );
        break;
      case 'person':
        element = (
          <>
            <div className="box-header__edit ml-10" onClick={() => {}}>
              <img src="./img/drawer/pen.svg" alt="" />
            </div>
            <div className="box-header__more ml-10">
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
