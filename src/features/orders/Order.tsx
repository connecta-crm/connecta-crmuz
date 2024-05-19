import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import { setLeadData } from '../leads/leadSlice';
import { useQuote } from '../quotes/useQuote';
import { useOrders } from './useOrders';
import OrdersTable from './OrdersTable';
import OrdersModal from '../../ui/modal/OrderModal';
function Orders() {
  const [guid, setGuid] = useState<string | null>(null);
  const { orders, count, isLoadingOrders } = useOrders();
  const { quote, isLoading: isLoadingQuote, error } = useQuote(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);

  const { openDrawer } = useDrawerFeature();

  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  useEffect(() => {
    if (!isLoadingQuote && !error && guid && quote) {
      dispatch(setLeadData(quote));
      openDrawer();
    }
  }, [isLoadingQuote, error, dispatch, guid, quote]);

  return (
    <div className="orders">
      <OrdersTable
        sourceType="order"
        guid={guid}
        count={count}
        dataSource={orders}
        loadingList={isLoadingOrders}
        loadingItem={isLoadingQuote}
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
        loadingItem={isLoadingQuote}
        onOpenDrawer={handleOpenDrawer}
      />
    </div>
  );
}

export default Orders;
