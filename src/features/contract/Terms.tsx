import parse from 'html-react-parser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import download from '../../../public/img/download.png';
import { useBlobContext } from '../../context/PdfContext';
import SignAcceptModal from '../../ui/modal/SignAcceptModal';
import { CompanyType, Origintype } from './contractDataTypes';
import { useContract } from './useContact';
import { useCreateContract } from './useCreateContact';
export default function Terms() {
  const navigate = useNavigate();
  const localData = localStorage.getItem('contractTerm');
  const [contractForm, setContractForm] = useState<{
    name: string;
    initial: string;
  } | null>(localData ? JSON.parse(localData) : null);
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams() as unknown as { text: string; id: string };
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [order, setOrder] = useState<Origintype>();
  const { contracts } = useContract(true, params);
  const { blob } = useBlobContext();
  const { create } = useCreateContract();
  useEffect(() => {
    if (contracts) {
      setCompany(contracts?.company);
      setOrder(contracts?.order);
    }
  }, [contracts]);
  useEffect(() => {
    if (contractForm) {
      localStorage.setItem('contractTerm', JSON.stringify(contractForm));
    }
  }, [contractForm]);

  const savePDF = () => {
    setTimeout(() => {
      const capture = document.querySelector('.pdp__content');
      html2canvas(capture as unknown as HTMLElement).then((canvas) => {
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        const form = new FormData();
        form.append('agreement', blob as Blob,"agreement.pdf");
        form.append('terms', doc.output('blob'),"terms.pdf");

        create(
          { form: form, guidId: params.text, id: params.id },
          {
            onSuccess: () => {
              setOpen(false);
            },
          },
        );
      });
    }, 300);
  };

  const downloadPDF = () => {
    const capture = document.querySelector('.pdp__content');
    // setLoader(true);
    html2canvas(capture as unknown as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      // setLoader(false);
      doc.save('contract.pdf');
    });
  };

  return (
    <>
      {contracts ? (
        <>
          <div className="pdf">
            <div className="pdf__container">
              <div className="pdf__header">
                <div>&nbsp;</div>
                <div className="pdf__header__title ">Agreement</div>
                <div className="pdf__actions d-flex">
                  <button className="pdf__download" onClick={downloadPDF}>
                    <img src={download} alt="" />
                    <span>Download</span>
                  </button>
                  {contractForm && (
                    <>
                      <button className="pdf__signded__btn">
                        <span>Signed</span>
                      </button>
                      <button className="pdf__pay__btn">
                        <span>Pay</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="pdp__content">
                <h1 className="pdf__title text-center">Terms and Conditions</h1>

                <div className="pdf__line" />

                <div className="pdf__content__body mt-20">
                  {parse(contracts && contracts?.pdf?.body)}
                </div>

                <h3 className="pdf__middle__title mt-40">
                  The parties agree to the terms and conditions set forth above
                  as demonstrated by their signature:
                </h3>

                <div className="pdf__table">
                  <div className="pdf__row mt-20">
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">
                        Ocean Blue Logistics
                      </h2>
                    </div>
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">
                        {order?.customer?.name} {order?.customer?.lastName}
                      </h2>
                    </div>
                  </div>
                  <div className="pdf__row ">
                    <div className="pdf__col">
                      <h2 className="pdf__text">info@oceanbluego.com</h2>
                    </div>
                    <div className="pdf__col">
                      <h2 className="pdf__text">{order?.customer?.email}</h2>
                    </div>
                  </div>

                  <div className="pdf__sign mt-10">
                    {!contractForm && (
                      <div className="pdf__row">
                        <div className="pdf__col">
                          <div className="pdf__sign__content">
                            <p className="pdf__sign__text">{company?.name}</p>
                          </div>
                          {/* <p className="pdf__text mt-10">
                    E-Signed: {contract?.executedOn}
                  </p>  */}
                        </div>
                        <div className="pdf__col">
                          <div className="pdf__sign__content">
                            <button
                              className="pdf__sign__btn"
                              onClick={() => setOpen(true)}
                            >
                              Sign
                            </button>
                          </div>
                          {/* <p className="pdf__text mt-10">&nbsp; </p> */}
                        </div>
                      </div>
                    )}
                    {contractForm && (
                      <div className="pdf__row">
                        <div className="pdf__col">
                          <div className="pdf__form">
                            <div className="pdf__form__item">
                              <span>Mate Logistics Inc</span>
                            </div>
                            <div className="pdf__form__item">
                              <p>Initials</p>
                              <span>ML</span>
                            </div>
                          </div>
                        </div>
                        <div className="pdf__col">
                          <div className="pdf__form">
                            <div className="pdf__form__item">
                              <span>{contractForm?.name}</span>
                            </div>
                            <div className="pdf__form__item">
                              <p>Initials</p>
                              <span>{contractForm?.initial}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pdf__footer">
                <button className="pdf__next" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
            </div>
          </div>
          <SignAcceptModal
            savePDF={savePDF}
            openModal={open}
            setModal={setOpen}
            setContractForm={setContractForm}
          />
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
}
