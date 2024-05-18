import { useState } from 'react';
import QuotesModal from '../../ui/modal/QuotesModal';
import QuotesTable from './QuoteTable';

function Quote() {
  const [openLeadModal,setOpenLeadModal] = useState(false)
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
      <QuotesTable  setOpenLeadModal={setOpenLeadModal} openDrawer={openDrawer} />
      <QuotesModal  openLeadModal={openLeadModal} setOpenLeadModa={setOpenLeadModal} />
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
