/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import OrdersModal from '../../ui/modal/OrderModal';
import OrderDirectDispatchModal from './OrderDirectDispatchModal';
import OrderDispatchModal from './OrderDispatchModal';
import OrdersTable from './OrderTable';
import { setOrderData } from './orderSlice';
import { useOrder } from './useOrder';
import { useOrders } from './useOrders';

function Orders() {
  const [guid, setGuid] = useState<string | null>(null);
  const { orders, count, isLoadingOrders } = useOrders();
  const { order, isLoading: isLoadingOrder, error } = useOrder(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);

  const [isOpenDispatchModal, setOpenDispatchModal] = useState(false);
  const [isOpenDirectDispatchModal, setOpenDirectDispatchModal] =
    useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { openDrawer } = useDrawerFeature();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
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

  return (
    <div className="orders">
      <OrderDispatchModal
        isOpenModal={isOpenDispatchModal}
        onOpenModal={setOpenDispatchModal}
      />
      <OrderDirectDispatchModal
        isOpenModal={isOpenDirectDispatchModal}
        onOpenModal={setOpenDirectDispatchModal}
      />
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
        onOpenDispatch={() => {
          setOpenDispatchModal(true);
        }}
        onOpenDirectDispatch={() => {
          setOpenDirectDispatchModal(true);
        }}
      />
    </div>
  );
}

export default Orders;
