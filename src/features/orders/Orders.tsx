import { LoadingOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import Modal from '../../ui/Modal';
import OrdersModal from '../../ui/modal/OrderModal';
import OrderDispatchModalContent from './OrderDispatchModalContent';
import OrdersTable from './OrderTable';
import { setOrderData } from './orderSlice';
import { useOrder } from './useOrder';
import { useOrders } from './useOrders';

function Orders() {
  const [guid, setGuid] = useState<string | null>(null);
  const { orders, count, isLoadingOrders } = useOrders();
  const { order, isLoading: isLoadingOrder, error } = useOrder(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [openCarrierModal, setOpenCarrierModal] = useState(false);

  const { openDrawer } = useDrawerFeature();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

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
      setTimeout(
        () => queryClient.invalidateQueries({ queryKey: [`orderAttachments`] }),
        0,
      );
    }
  }, [isLoadingOrder, error, dispatch, guid, order]);

  // * CARRIER MODAL FUNCTIONS

  const [form] = Form.useForm();

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
          <OrderDispatchModalContent />
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
