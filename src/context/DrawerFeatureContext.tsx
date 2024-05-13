import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type DrawerFeatureContextType = {
  openMainPanels: string[] | string;
  setOpenMainPanels: (e: SetStateAction<string[]>) => void;
  openInnerPanels: string[] | string;
  setOpenInnerPanels: (e: SetStateAction<string[]>) => void;

  isOpenDrawer: boolean;
  isFullScreen: boolean;
  makeDrawerFull: (e: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;

  // setEditDetails: (e: SetStateAction<boolean>) => void;
  // onChangePerson: (e: string) => void;
  // onChangeDetails: (e: string | string[]) => void;
  // onChange: (e: string, b?: boolean | undefined) => void;
  isEditDetails: boolean;
  isEditPerson: boolean;
  isEditNotes: boolean;
  onEditDetails: (e: boolean) => void;
  onEditPerson: (e: boolean) => void;
  onEditNotes: (e: boolean) => void;
  onChangeMainCollapse: (e: string[] | string) => void;
  onChangeInnerCollapse: (e: string | string[]) => void;
};

const DrawerFeatureContext = createContext<DrawerFeatureContextType | null>(
  null,
);

const DrawerFeatureProvider = ({ children }: { children: ReactNode }) => {
  const [openMainPanels, setOpenMainPanels] = useState<string[]>([
    '100',
    '200',
  ]);
  const [openInnerPanels, setOpenInnerPanels] = useState<string[]>([]);
  const [isEditDetails, setEditDetails] = useState(false);
  const [isEditPerson, setEditPerson] = useState(false);
  const [isEditNotes, setEditNote] = useState(false);

  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  // const queryClient = useQueryClient();

  const openDrawer = () => {
    setOpenDrawer(true);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
    // queryClient.invalidateQueries({
    //   queryKey: ['lead'],
    // });
    setFullScreen(false);
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
  const onEditNotes = (value: boolean) => {
    setEditNote(value);
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
        setOpenInnerPanels,
        isEditDetails,
        onEditPerson,
        onEditNotes,
        isEditPerson,
        isEditNotes,
        onEditDetails,
        onChangeMainCollapse,
        onChangeInnerCollapse,

        isFullScreen,
        isOpenDrawer,
        openDrawer,
        closeDrawer,
        makeDrawerFull,
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
