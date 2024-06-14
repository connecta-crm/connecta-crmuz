import { useEffect, useState } from 'react';
import PaymentModal from '../../ui/modal/PaymentModal';
import PaymentTable from './PaymentTable';
import { usePayment } from './usePayment';
import { usePaymentDetails } from './usePaymentDetails';
export default function Payment() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { payment, isLoadingTeam } = usePaymentDetails(editId);
  const { payments, isLoading } = usePayment(true);

  useEffect(() => {
    if (payment) {
      setOpenModal(true);
    }
  }, [payment]);

  return (
    <>
      <div className="payment">
        <PaymentTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={payments}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={payments?.length}
        />
        <PaymentModal
          setEditId={setEditId}
          payment={payment}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
