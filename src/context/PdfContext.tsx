import { ReactNode, createContext, useContext, useState } from 'react';

type BlobContextType = {
  blob: Blob | null; // The blob state
  setBlob: (blob: Blob | null) => void; // Function to update the blob state
};

const BlobContext = createContext<BlobContextType | null>(null);

const PdfProvider = ({ children }: { children: ReactNode }) => {
  const [blob, setBlob] = useState<Blob | null>(null);

  return (
    <BlobContext.Provider value={{ blob, setBlob }}>
      {children}
    </BlobContext.Provider>
  );
};

const useBlobContext = () => {
  const context = useContext(BlobContext);
  if (!context) {
    throw new Error('useBlobContext must be used within a BlobProvider');
  }
  return context;
};

export { PdfProvider, useBlobContext };
