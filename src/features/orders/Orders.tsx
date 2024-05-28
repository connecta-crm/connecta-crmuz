import { LoadingOutlined } from '@ant-design/icons';
import { Button, Collapse, CollapseProps, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import Modal from '../../ui/Modal';
import OrdersModal from '../../ui/modal/OrderModal';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import FeatCarrierInfoInner from '../drawer/feature-date/FeatCarrierInfoInner';
import OrdersTable from './OrderTable';
import { setOrderData } from './orderSlice';
import { useOrder } from './useOrder';
import { useOrders } from './useOrders';
import FeatDateInner from '../drawer/feature-date/FeatDateInner';

function Orders() {
  const [guid, setGuid] = useState<string | null>(null);
  const { orders, count, isLoadingOrders } = useOrders();
  const { order, isLoading: isLoadingOrder, error } = useOrder(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [openCarrierModal, setOpenCarrierModal] = useState(false);

  const { openDrawer } = useDrawerFeature();
  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  const handleOpenCarrier = () => {
    setOpenCarrierModal(true);
  };

  useEffect(() => {
    if (!isLoadingOrder && !error && guid && order) {
      dispatch(setOrderData(order));
      console.log('ORDER', order);
      openDrawer();
    }
  }, [isLoadingOrder, error, dispatch, guid, order]);

  // * CARRIER MODAL FUNCTIONS

  const [form] = Form.useForm();

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
          <span className="box-header__label">Date</span>
        </div>
      ),
      children: <FeatDateInner sourceType="order" />,
      className: 'feature-drawer__item',
    },
  ];

  return (
    <div className="orders">
      <Modal
        form={form}
        title="Dispatching to a carrier"
        width="middle"
        padding="0"
        open={openCarrierModal}
        onCancel={() => setOpenCarrierModal(false)}
        extraBtnToHeader={
          <Button
            size="small"
            type="primary"
            className="ml-10"
            style={{ backgroundColor: '#427d9d' }}
            disabled={false}
            onClick={() => {}}
          >
            {isLoadingOrder ? (
              'Dispatch'
            ) : (
              <>
                Dispatch <LoadingOutlined />
              </>
            )}
          </Button>
        }
      >
        <Form form={form} onFinish={() => {}}>
          <div className="modal__row">
            <div className="modal__col p-0">
              <Collapse
                defaultActiveKey={['1']}
                ghost
                collapsible="header"
                expandIcon={DrawerArrowIcon}
                items={itemsForCarrierInfo}
              />
            </div>
            <div className="modal__col p-0">
              <Collapse
                defaultActiveKey={['1']}
                ghost
                collapsible="header"
                expandIcon={DrawerArrowIcon}
                items={itemsForCarrierDate}
              />
              <Collapse
                defaultActiveKey={['1']}
                ghost
                collapsible="header"
                expandIcon={DrawerArrowIcon}
                items={itemsForCarrierPayment}
              />
            </div>
          </div>
        </Form>
      </Modal>
      <OrdersTable
        guid={guid}
        count={count}
        sourceType="order"
        dataSource={orders}
        loadingList={isLoadingOrders}
        loadingItem={isLoadingOrder}
        onOpenModal={setOpenLeadModal}
        onOpenDrawer={handleOpenDrawer}
      />
      <OrdersModal
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
      />
      <DrawerApp
        sourceType="order"
        dataSource={orders}
        loadingItem={isLoadingOrder}
        onOpenDrawer={handleOpenDrawer}
        onOpenCarrier={handleOpenCarrier}
      />
    </div>
  );
}

export default Orders;
