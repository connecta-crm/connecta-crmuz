import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import Modal from '../../ui/Modal';
import { ModalProps } from '../orders/OrderDispatchModal';
import QuoteConvertModalContent from './QuoteConvertModalContent';
import { getQuoteConvertData } from './quoteConvertSlice';
import { getQuoteData } from './quoteSlice';
import { useConvertToQuote } from './useConvertToQuote';

type VehicleWithId = {
  id: number;
  vehicle: number;
  vehicleYear: number;
  lot: string;
  vin: string;
  color: string;
  plate: string;
};

type VehicleWithoutId = Omit<VehicleWithId, 'id'>;

function QuotesConvertModal({ isOpenModal, onOpenModal }: ModalProps) {
  const { closeDrawer } = useDrawerFeature();

  const { convertToOrder, isLoadingConvertToOrder, isSuccessConvertToOrder } =
    useConvertToQuote();

  const quoteConvertData = useAppSelector(getQuoteConvertData);
  const { id: currentQuoteId } = useAppSelector(getQuoteData);

  const removeId = (vehicles: VehicleWithId[]): VehicleWithoutId[] => {
    return vehicles.map(({ id, vehicle, ...rest }) => {
      console.log(id);
      return { ...rest, vehicle: vehicle?.id };
    });
  };

  const handleSaveConvert = () => {
    const model = {
      ...quoteConvertData,
      status: 'orders',
      vehicles: removeId(quoteConvertData.quoteVehicles),

      originAddress: quoteConvertData.originAddress,
      destinationAddress: quoteConvertData.originAddress,
      paymentPaidReservation: 0,
      paymentCodToCarrier: 0,
      paymentPaidToCarrier: 0,
      customer: quoteConvertData.customer.id,
      user: quoteConvertData.user.id,
      origin: quoteConvertData.origin.id,
      destination: quoteConvertData.destination.id,
    };
    convertToOrder({ id: currentQuoteId, model });
  };

  useEffect(() => {
    if (!isLoadingConvertToOrder && isSuccessConvertToOrder) {
      onOpenModal(false);
      closeDrawer();
    }
  }, [isLoadingConvertToOrder, isSuccessConvertToOrder]);

  return (
    <Modal
      title="Converting to order"
      width="middle"
      padding="0"
      loading={isLoadingConvertToOrder}
      open={isOpenModal}
      onCancel={() => {
        onOpenModal(false);
      }}
      onSave={handleSaveConvert}
    >
      <QuoteConvertModalContent />
    </Modal>
  );
}

export default QuotesConvertModal;
