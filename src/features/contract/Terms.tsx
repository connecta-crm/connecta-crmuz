import parse from 'html-react-parser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import download from '../../../public/img/download.png';
import { useBlobContext } from '../../context/PdfContext';
import Spinner from '../../ui/Spinner';
import SignAcceptModal from '../../ui/modal/SignAcceptModal';
import { CompanyType, ContractType, Origintype } from './contractDataTypes';
import { useContract } from './useContact';
import { useCreateContract } from './useCreateContact';
import { Button } from 'antd';
export default function Terms() {
  const navigate = useNavigate();
  const localData = localStorage.getItem('contractTerm');
  const [contractForm, setContractForm] = useState<{
    name: string;
    initial: string;
  } | null>(localData ? JSON.parse(localData) : null);
  const [contract, setContract] = useState<ContractType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams() as unknown as { text: string; id: string };
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [order, setOrder] = useState<Origintype>();
  const { contracts, isLoading, error } = useContract(true, params);
  const { blob } = useBlobContext();
  const { create, isLoadingContract } = useCreateContract();
  if (!contracts?.contract?.signed) {
    localStorage.removeItem('contractTerm');
  }
  useEffect(() => {
    if (contracts) {
      setCompany(contracts?.company);
      setOrder(contracts?.order);
      setContract(contracts?.contract);
    }
  }, [contracts]);
  useEffect(() => {
    if (contractForm) {
      localStorage.setItem('contractTerm', JSON.stringify(contractForm));
    }
  }, [contractForm]);

  const savePDF = (data: { name: string; initial: string }) => {
    setContractForm(data);
    setTimeout(() => {
      const capture = document.querySelector('.pdp__content');
      html2canvas(capture as unknown as HTMLElement).then((canvas) => {
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        const form = new FormData();
        form.append('agreement', blob as Blob, 'agreement.pdf');
        form.append('terms', doc.output('blob'), 'terms.pdf');
        form.append('signerName', data.name);
        form.append('signerInitials', data.initial);

        create(
          { form: form, guidId: params.text, id: params.id },
          {
            onSuccess: () => {
              localStorage.removeItem('contract');
              localStorage.removeItem('contractTerm');
              setOpen(false);
              navigate(-1);
            },
          },
        );
      });
    }, 300);
  };

  const downloadPDF = () => {
    const capture = document.querySelector('.pdp__content');
    html2canvas(capture as unknown as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);

      doc.save('contract.pdf');
    });
  };

  useEffect(() => {
    if (contract?.signed) {
      setContractForm(
        contract.signerName && contract.signerInitials
          ? { name: contract.signerName, initial: contract.signerInitials }
          : null,
      );
    }
  }, [contract]);

  if (error) {
    console.log(error, 'error');
    return (
      <div className="pdf pdf__spinner">
        <h1 className="pdf__eror__text">404 Not Found 🥺</h1>
      </div>
    );
  }

  return (
    <>
      {!isLoading ? (
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
                      <span className="pdf__signded__btn d-flex align-center">
                        <span>Signed</span>
                      </span>
                      <button
                        className="pdf__pay__btn"
                        onClick={() => navigate('/contract/pay/' + params.text)}
                      >
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
                          {contract?.signed && (
                            <p className="pdf__text mt-10">
                              E-Signed: {contract?.executedOn}
                            </p>
                          )}
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
                          {contract?.signed && (
                            <>
                              <p className="pdf__text mt-10">
                                E-Signed: {contract?.signedTime}
                              </p>
                              <p className="pdf__text mt-10">
                                IP: {contract?.signIpAddress}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pdf__footer">
                <Button
                  disabled={contract?.signed ? false : true}
                  type="primary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
          <SignAcceptModal
            isLoadingContract={isLoadingContract}
            savePDF={savePDF}
            openModal={open}
            setModal={setOpen}
          />
        </>
      ) : (
        <div className="pdf__spinner">
          <Spinner />
        </div>
      )}
    </>
  );
}
