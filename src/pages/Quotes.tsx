import QuotesTable from '../features/quotes/QuoteTable';
import QuotesModal from '../ui/modal/QuotesModal';
function Quotes() {
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
      <QuotesTable openDrawer={openDrawer} />
      <QuotesModal />
      {/* <DrawerApp
        open={open}
        isFullScreen={isFullScreen}
        onClose={onClose}
        onFullScreen={onDrawerFull}
      /> */}
    </div>
  );
}

export default Quotes;
