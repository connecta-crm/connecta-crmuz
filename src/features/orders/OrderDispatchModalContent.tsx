import { Button, Collapse, CollapseProps } from 'antd';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import FeatCarrierInfoInner from '../drawer/feature-date/FeatCarrierInfoInner';
import FeatDateInner from '../drawer/feature-date/FeatDateInner';

function OrderDispatchModalContent() {
  const itemsForCarrierInfo: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Carrier company info</span>
          <div className="d-flex align-center">
            <div className="detail__btns d-flex align-center pr-0">
              <Button
                className="ml-10"
                type="primary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled
              >
                Import from CD
              </Button>
              <div
                onClick={(e) => e.stopPropagation()}
                className="box-header__more ml-10"
              >
                <img src="./img/drawer/more-2.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      ),
      // children: <OrderDispatchModalCarrierItem />,
      children: <FeatCarrierInfoInner sourceType="order" />,
    },
  ];

  const itemsForCarrierDate: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Date</span>
        </div>
      ),
      children: <FeatDateInner sourceType="order" />,
      className: 'feature-drawer__item',
    },
  ];

  const itemsForCarrierPayment: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Payment</span>
        </div>
      ),
      children: <FeatDateInner sourceType="order" />,
      className: 'feature-drawer__item',
    },
  ];

  return (
    <div className="modal__row">
      <div className="modal__col p-0">
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForCarrierInfo}
        />
      </div>
      <div className="modal__col p-0">
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForCarrierDate}
        />
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForCarrierPayment}
        />
      </div>
    </div>
  );
}

export default OrderDispatchModalContent;
