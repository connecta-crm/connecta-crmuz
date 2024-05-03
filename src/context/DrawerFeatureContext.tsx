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

  // setEditDetails: (e: SetStateAction<boolean>) => void;
  // onChangePerson: (e: string) => void;
  // onChangeDetails: (e: string | string[]) => void;
  // onChange: (e: string, b?: boolean | undefined) => void;
  isEditDetails: boolean;
  isEditPerson: boolean;
  onEditDetails: (e: boolean) => void;
  onEditPerson: (e: boolean) => void;
  onChangeMainCollapse: (e: string[] | string) => void;
  onChangeInnerCollapse: (e: string | string[]) => void;
};

const DrawerFeatureContext = createContext<DrawerFeatureContextType | null>(
  null,
);

const DrawerFeatureProvider = ({ children }: { children: ReactNode }) => {
  const [openMainPanels, setOpenMainPanels] = useState<string[]>([]);
  const [openInnerPanels, setOpenInnerPanels] = useState<string[]>([]);
  const [isEditDetails, setEditDetails] = useState(false);
  const [isEditPerson, setEditPerson] = useState(false);

  const onEditDetails = (value: boolean) => {
    setEditDetails(value);
  };
  const onEditPerson = (value: boolean) => {
    setEditPerson(value);
  };

  // const onChangeDetails = (key: string | string[]) => {
  //   const keyString = Array.isArray(key) ? key[0] : key;
  //   setOpenInnerPanels(
  //     openInnerPanels.includes(keyString)
  //       ? openInnerPanels.filter((item) => item !== keyString)
  //       : [...openInnerPanels, keyString],
  //   );
  // };

  // const onChangePerson = (key: string) => {
  //   const keyString = Array.isArray(key) ? key[0] : key;
  //   setOpenInnerPanels(
  //     openInnerPanels.includes(keyString)
  //       ? openInnerPanels.filter((item) => item !== keyString)
  //       : [...openInnerPanels, keyString],
  //   );
  // };

  const onChangeInnerCollapse = (key: string | string[]) => {
    const keyString = Array.isArray(key) ? key[0] : key;
    setOpenInnerPanels(
      openInnerPanels.includes(keyString)
        ? openInnerPanels.filter((item) => item !== keyString)
        : [...openInnerPanels, keyString],
    );
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
        isEditPerson,
        onEditDetails,
        // onChangeDetails,
        // onChangePerson,
        onChangeMainCollapse,
        onChangeInnerCollapse,
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
