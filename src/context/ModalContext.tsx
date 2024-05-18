import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContextType = {
  show: boolean;
  status:string|null
  hideModal: () => void;
  showModal: (a:string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<string|null>(null);

  const hideModal = () => {
    setShow(false)
    setStatus(null)
  };
  const showModal = (status:string) => {
    setShow(true);
    setStatus(status)
  }

  return (
    <ModalContext.Provider value={{ show,status, hideModal, showModal }}>
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
