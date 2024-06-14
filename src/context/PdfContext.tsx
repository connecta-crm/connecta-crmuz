import { ReactNode, createContext, useState } from 'react';
type PdfContextType = {
  pdf: { agreement: Blob; terms: Blob } | null;
  setAgreement: (a: Blob) => void;
  setTerms: (a: Blob) => void;
};
export const PdfContext = createContext<PdfContextType | null>(null);

const PdfProvider = ({ children }: { children: ReactNode }) => {
  const [pdf, setPdf] = useState<{ agreement: Blob; terms: Blob } | null>(null);

  const setAgreement = (a: Blob) => {
    setPdf(pdf ? { ...pdf, agreement: a } : null);
  };

  const setTerms = (a: Blob) => {
    setPdf(pdf ? { ...pdf, terms: a } : null);
  };

  return (
    <PdfContext.Provider value={{ pdf, setAgreement, setTerms }}>
      {children}
    </PdfContext.Provider>
  );
};
export default PdfProvider;
