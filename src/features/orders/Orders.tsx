/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import OrderHistoryModal from '../../ui/HistoryModal';
import OrderCDPriceModal from '../../ui/modal/CDPriceModal';
import OrdersModal from '../../ui/modal/OrderModal';
import { useCDPrice } from '../leads/useCDPrice';
import OrderDirectDispatchModal from './OrderDirectDispatchModal';
import OrderDispatchModal from './OrderDispatchModal';
import OrdersTable from './OrderTable';
import { setOrderData } from './orderSlice';
import { useOrder } from './useOrder';
import { useOrderLogs } from './useOrderLogs';
import { useOrders } from './useOrders';

function Orders() {
  useSetStatusParam('orders');
  const [guid, setGuid] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number>(0);
  const { orders, count, isLoadingOrders } = useOrders();
  const { order, isLoading: isLoadingOrder, error } = useOrder(guid);
  const { orderLogs, isLoadingOrderLogs, isFetchingOrderLogs } =
    useOrderLogs(orderId);

  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [isOpenDispatchModal, setOpenDispatchModal] = useState(false);
  const [isOpenDirectDispatchModal, setOpenDirectDispatchModal] =
    useState(false);
  const [isOpenHistoryModal, setOpenHistoryModal] = useState(false);
  const [isOpenCDPriceModal, setOpenCDPriceModal] = useState(false);

  const { cdPrice, isFetchingCDPrice } = useCDPrice(
    'order',
    guid,
    isOpenCDPriceModal,
  );

  const { openDrawer } = useDrawerFeature();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  const handleOpenHistoryModal = (order: number) => {
    setOrderId(0);
    setTimeout(() => setOrderId(order), 0);
  };

  useEffect(() => {
    if (!isLoadingOrderLogs && orderId) {
      setOpenHistoryModal(true);
    }
  }, [isLoadingOrderLogs, orderId]);

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
      <OrderHistoryModal
        historyLogs={orderLogs}
        isOpenModal={isOpenHistoryModal}
        onOpenModal={setOpenHistoryModal}
      />
      <OrderCDPriceModal
        cdPrice={cdPrice}
        isFetchingCDPrice={isFetchingCDPrice}
        isOpenModal={isOpenCDPriceModal}
        onOpenModal={setOpenCDPriceModal}
      />
      <OrdersModal
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
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
      <DrawerApp
        sourceType="order"
        dataSource={orders}
        loadingItem={isLoadingOrder}
        isLoadingHistory={isFetchingOrderLogs}
        onOpenDrawer={handleOpenDrawer}
        onOpenDispatch={() => {
          setOpenDispatchModal(true);
        }}
        onOpenDirectDispatch={() => {
          setOpenDirectDispatchModal(true);
        }}
        onOpenHistory={handleOpenHistoryModal}
      />
    </div>
  );
}

export default Orders;
