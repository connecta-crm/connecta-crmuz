import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type DrawerFeatureContextType = {
  openMainPanels: string[] | string;
  toolbarTabActiveKey: undefined | string;
  setOpenMainPanels: (e: SetStateAction<string[]>) => void;
  openInnerPanels: string[] | string;
  setOpenInnerPanels: (e: SetStateAction<string[]>) => void;

  isOpenDrawer: boolean;
  isFullScreen: boolean;
  isDrawerFull: string;
  makeDrawerFull: (e: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  onOpenCDPrice: () => void;
  onCloseCDPrice: () => void;
  // setEditDetails: (e: SetStateAction<boolean>) => void;
  // onChangePerson: (e: string) => void;
  // onChangeDetails: (e: string | string[]) => void;
  // onChange: (e: string, b?: boolean | undefined) => void;
  isOpenCDPrice: boolean;
  isEditDetails: boolean;
  isEditPerson: boolean;
  isEditTab: boolean;
  isEditNotes: boolean;
  isEditPayment: boolean;
  isEditDate: boolean;
  isEditCarrierInfo: boolean;
  isEditCustomerDetails: boolean;
  setDrawerFull: (e: string) => void;
  onEditDetails: (e: boolean) => void;
  onEditPerson: (e: boolean) => void;
  onEditTab: (e: boolean) => void;
  onEditNotes: (e: boolean) => void;
  onEditPayment: (e: boolean) => void;
  onEditDate: (e: boolean) => void;
  onEditCarrierInfo: (e: boolean) => void;
  onEditCustomerDetails: (e: boolean) => void;
  onNextElement: (e: boolean) => void;
  onPrevElement: (e: boolean) => void;
  onChangeMainCollapse: (e: string[] | string) => void;
  onChangeInnerCollapse: (e: string | string[]) => void;
  onChangeToolbarTabActiveKey: (e: string | string[]) => void;
};

const DrawerFeatureContext = createContext<DrawerFeatureContextType | null>(
  null,
);

const DrawerFeatureProvider = ({ children }: { children: ReactNode }) => {
  const [openMainPanels, setOpenMainPanels] = useState<string[]>([
    '100', // Details
    '200', // Person
    '400', // Payment
    '500', // Date
    '600', // Carrier
  ]);
  const [openInnerPanels, setOpenInnerPanels] = useState<string[]>([]);
  const [toolbarTabActiveKey, setToolbarTabActiveKey] = useState<
    string[] | string
  >('1');
  const [isEditDetails, setEditDetails] = useState(false);
  const [isEditPerson, setEditPerson] = useState(false);
  const [isEditTab, setEditTab] = useState(false);
  const [isEditNotes, setEditNote] = useState(false);
  const [isEditPayment, setEditPayment] = useState(false);
  const [isEditDate, setEditDate] = useState(false);
  const [isEditCarrierInfo, setEditCarrierInfo] = useState(false);
  const [isEditCustomerDetails, setEditCustomerDetails] = useState(false);

  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isDrawerFull, setDrawerFull] = useState(
    localStorage.getItem('is_drawer_full') || 'not_full',
  );
  const [isFullScreen, setFullScreen] = useState(
    isDrawerFull === 'full' ? true : false,
  );

  const [isOpenCDPrice, setOpenCDPrice] = useState(false);
  // const queryClient = useQueryClient();

  const openDrawer = () => {
    setFullScreen(isDrawerFull === 'full' ? true : false);
    setOpenDrawer(true);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
    setOpenInnerPanels([]);
    // queryClient.invalidateQueries({
    //   queryKey: ['lead'],
    // });
  };
  const makeDrawerFull = (value: boolean) => {
    setFullScreen(value);
  };

  const onEditDetails = (value: boolean) => {
    setEditDetails(value);
  };
  const onEditPerson = (value: boolean) => {
    setEditPerson(value);
  };
  const onEditTab = (value: boolean) => {
    setEditTab(value);
  };
  const onEditNotes = (value: boolean) => {
    setEditNote(value);
  };
  const onEditPayment = (value: boolean) => {
    setEditPayment(value);
  };
  const onEditDate = (value: boolean) => {
    setEditDate(value);
  };
  const onEditCarrierInfo = (value: boolean) => {
    setEditCarrierInfo(value);
  };

  const onEditCustomerDetails = (value: boolean) => {
    setEditCustomerDetails(value);
  };

  const onChangeToolbarTabActiveKey = (value: string | string[]) => {
    setToolbarTabActiveKey(value);
  };

  const onNextElement = (value: boolean) => {
    onChangeInnerCollapse([]);
    setEditNote(value);
  };
  const onPrevElement = (value: boolean) => {
    onChangeInnerCollapse([]);
    setEditNote(value);
  };

  const onOpenCDPrice = () => {
    setOpenCDPrice(true);
  };
  const onCloseCDPrice = () => {
    setOpenCDPrice(false);
  };

  // const onChangePerson = (key: string) => {
  //   const keyString = Array.isArray(key) ? key[0] : key;
  //   setOpenInnerPanels(
  //     openInnerPanels.includes(keyString)
  //       ? openInnerPanels.filter((item) => item !== keyString)
  //       : [...openInnerPanels, keyString],
  //   );
  // };

  const onChangeInnerCollapse = (panelKey: string | string[]) => {
    if (Array.isArray(panelKey)) {
      setOpenInnerPanels(panelKey);
    } else {
      setOpenInnerPanels((currentPanels) => {
        const currentSet = new Set(currentPanels);
        if (currentSet.has(panelKey)) {
          currentSet.delete(panelKey);
        } else {
          currentSet.add(panelKey);
        }
        return Array.from(currentSet);
      });
    }
  };

  const onChangeMainCollapse = (panelKey: string[] | string) => {
    if (Array.isArray(panelKey)) {
      setOpenMainPanels(panelKey);
    } else {
      setOpenMainPanels((currentPanels) => {
        const currentSet = new Set(currentPanels);
        if (currentSet.has(panelKey)) {
          currentSet.delete(panelKey);
        } else {
          currentSet.add(panelKey);
        }
        return Array.from(currentSet);
      });
    }
  };

  return (
    <DrawerFeatureContext.Provider
      value={{
        openMainPanels,
        setOpenMainPanels,
        openInnerPanels,
        toolbarTabActiveKey,
        setOpenInnerPanels,
        isEditDetails,
        onEditPerson,
        onEditNotes,
        onEditPayment,
        onEditDate,
        onEditTab,
        onEditCarrierInfo,
        onEditCustomerDetails,
        isEditPerson,
        isEditTab,
        isEditNotes,
        isEditPayment,
        isEditDate,
        isEditCarrierInfo,
        isEditCustomerDetails,

        onEditDetails,
        onChangeMainCollapse,
        onChangeInnerCollapse,
        onChangeToolbarTabActiveKey,

        isFullScreen,
        isDrawerFull,
        isOpenDrawer,
        openDrawer,
        closeDrawer,
        makeDrawerFull,
        setDrawerFull,
        onNextElement,
        onPrevElement,

        isOpenCDPrice,
        onOpenCDPrice,
        onCloseCDPrice,
      }}
    >
      {children}
    </DrawerFeatureContext.Provider>
  );
};

export const useDrawerFeature = (): DrawerFeatureContextType => {
  const context = useContext(DrawerFeatureContext);
  if (context === null) {
    throw new Error(
      'useDrawerFeature must be used within a DrawerFeatureProvider',
    );
  }
  return context;
};

export default DrawerFeatureProvider;
