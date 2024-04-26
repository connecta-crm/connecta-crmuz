import React, { createContext, useContext, useState } from 'react';

type ModalContextType = {
  show: boolean;
  hideModal: (a: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, hideModal] = useState(false);
  return (
    <ModalContext.Provider value={{ show, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
