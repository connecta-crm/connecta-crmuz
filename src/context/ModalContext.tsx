import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContextType = {
  show: boolean;
  hideModal: () => void;
  showModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);

  const hideModal = () => setShow(false);
  const showModal = () => setShow(true);

  return (
    <ModalContext.Provider value={{ show, hideModal, showModal }}>
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
