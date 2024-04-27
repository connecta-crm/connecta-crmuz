import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContextType = {
  show: boolean;
  hideModal: (show: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, hideModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ show, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default ModalProvider;
