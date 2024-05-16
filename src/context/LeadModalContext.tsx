import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContextType = {
  leadShow: boolean;
  hideLeadModal: () => void;
  showLeadModal: () => void;
};

const LeadModalContext = createContext<ModalContextType | null>(null);

const LeadModalProvider = ({ children }: { children: ReactNode }) => {
  const [leadShow, setLeadShow] = useState<boolean>(false);

  const hideLeadModal = () => setLeadShow(false);
  const showLeadModal = () => setLeadShow(true);

  return (
    <LeadModalContext.Provider value={{ leadShow, hideLeadModal, showLeadModal }}>
      {children}
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = (): ModalContextType => {
  const context = useContext(LeadModalContext);
  if (context === null) {
    throw new Error('useModal must be used within a LeadModalProvider');
  }
  return context;
};

export default LeadModalProvider;
