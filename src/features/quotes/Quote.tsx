import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import LeadModal from '../../ui/modal/LeadModal';
import QuotesModal from '../../ui/modal/QuotesModal';
import QuotesTable from './QuoteTable';

function Quote() {
  const [openLeadModal, setOpenLeadModal] = useState(false);
  const { show, status, hideModal } = useModal();
  useEffect(() => {
    hideModal();
  }, []);
  // const [open, setOpen] = useState(false);
  // const [isFullScreen, setFullScreen] = useState(false);

  // function openDrawer(data: QuotesTableDataType) {
  //   console.log(data);
  //   setOpen(true);
  // }
  // function onClose() {
  //   console.log('close');
  //   setOpen(false);
  //   setFullScreen(false);
  // }
  // function onDrawerFull(value: boolean) {
  //   setFullScreen(value);
  // }

  const openDrawer = () => {
    console.log('');
  };
  return (
    <div className="quotes">
      <QuotesTable
        setOpenLeadModal={setOpenLeadModal}
        openDrawer={openDrawer}
      />
      <QuotesModal
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
      />
      {show && status == 'lead' && (
        <LeadModal openLeadModal={show} setOpenLeadModa={hideModal} />
      )}
      {/* <DrawerApp
        open={open}
        isFullScreen={isFullScreen}
        onClose={onClose}
        onFullScreen={onDrawerFull}
      /> */}
    </div>
  );
}

export default Quote;
