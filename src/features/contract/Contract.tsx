import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import download from '../../../public/img/download.png';
import logo from '../../../public/img/logo-meta.svg';
import SignAcceptModal from '../../ui/modal/SignAcceptModal';
import { CompanyType, ContractType, Origintype } from './contractDataTypes';
import { useContract } from './useContact';
export default function Contract() {
  const localData = localStorage.getItem('contract');
  const [contractForm, setContractForm] = useState<{
    name: string;
    initial: string;
  } | null>(localData ? JSON.parse(localData) : null);
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams() as unknown as { text: string; id: string };
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [contract, setContract] = useState<ContractType | null>(null);
  const [order, setOrder] = useState<Origintype>();
  const { contracts } = useContract(true, params);
  const navigate = useNavigate();

  useEffect(() => {
    if (contracts) {
      console.log(contracts);
      setCompany(contracts?.company);
      setContract(contracts?.contract);
      setOrder(contracts?.order);
    }
  }, [contracts]);
  useEffect(() => {
    if (contractForm) {
      localStorage.setItem('contract', JSON.stringify(contractForm));
    }
  }, [contractForm]);

  const savePDF = () => {
    const capture = document.querySelector('.pdp__content');
    // setLoader(true);
    html2canvas(capture as unknown as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addPage();
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    });
  };

  const downloadPDF = () => {
    const capture = document.querySelector('.pdp__content');
    // setLoader(true);
    html2canvas(capture as unknown as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addPage();
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
                <div className="pdf__actions d-flex ">
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
                <div className="pdf__content__header">
                  <div className="pdf__content__header-left">
                    <img src={logo} alt="" width="82px" height="58px" />
                    <h1 className="pdf__title mt-5">{company?.name}</h1>
                  </div>
                  <div className="pdf__content__header-right">
                    <span className="pdf__text">MC: 01063587</span>
                    <span className="pdf__text">{company?.address}</span>
                    <span className="pdf__text">{company?.mainline}</span>
                    <span className="pdf__text">connectacrm.com</span>
                  </div>
                </div>

                <div className="pdf__line"></div>

                <div className="pdf__subtitle mt-10">
                  Order number: {contract?.id}
                </div>

                <div className="pdf__text">
                  This agreement is executed on {contract?.executedOn} between
                  following parties:
                </div>

                <div className="pdf__table">
                  <div className="pdf__row mt-40">
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">Transport Company</h2>
                    </div>
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">Shipper</h2>
                    </div>
                  </div>
                  <div className="row__line mt-10"></div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">
                        Ocean Blue Logistics
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">
                        {order?.customer?.name} {order?.customer?.lastName}
                      </h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col mt-10">
                      <div className="pdf__text">info@oceanbluego.com</div>
                      <div className="pdf__text">(302) 200-8007</div>
                    </div>
                    <div className="pdf__col mt-10">
                      <div className="pdf__text">{order?.customer?.email}</div>
                      <div className="pdf__text">{order?.customer?.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="pdf__table">
                  <div className="pdf__row mt-40">
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">Origin</h2>
                    </div>
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">Destination</h2>
                    </div>
                  </div>
                  <div className="row__line mt-10"></div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Address</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">{order?.originAddress}</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Address</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationAddress}
                      </h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">City,State Zip</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">{order?.originName}</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">City,State Zip</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationName}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="pdf__table">
                  <div className="pdf__row mt-40">
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">
                        Contact information
                      </h2>
                    </div>
                    <div className="pdf__col">
                      <h2 className="pdf__middle__title">
                        Shipping information
                      </h2>
                    </div>
                  </div>
                  <div className="row__line mt-10"></div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Field</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Origin</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Destination</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">
                        1st avail pick up{' '}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.dates?.dateEstPu}
                      </h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Business </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.originBusinessName}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationBusinessName}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Est. load </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">{order?.dateEstShip}</h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Phone </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.originBusinessPhone}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.originBusinessPhone}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Est. delivery </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.dates?.dateEstDel}
                      </h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Person </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.originContactPerson}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationContactPerson}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Trailer type </h3>
                    </div>
                    <div className="pdf__col">
                      <h3
                        className="pdf__text mt-5"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {order?.trailerType}
                      </h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Phone </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">{order?.originPhone}</h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationPhone}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">
                        Vehicle condition{' '}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.condition == 'run'
                          ? 'Run and drives'
                          : 'Inop, it rolls'}
                      </h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Phone #2 </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.originSecondPhone}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationSecondPhone}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">
                        {/* Vehicle #2 <br /> condition */}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5"></h3>
                    </div>
                  </div>
                  <div className="pdf__row">
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5">Buyer </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.originBuyerNumber}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5">
                        {order?.destinationBuyerNumber}
                      </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__small__title mt-5"> </h3>
                    </div>
                    <div className="pdf__col">
                      <h3 className="pdf__text mt-5"> </h3>
                    </div>
                  </div>
                </div>

                <div className="pdf__table">
                  <table
                    className="mt-40"
                    style={{ width: '100%', textAlign: 'left' }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <h2 className="pdf__middle__title">
                            Vehicle year, make, model
                          </h2>
                        </th>
                        <th>
                          <h2 className="pdf__middle__title pl-10">Type</h2>
                        </th>
                        <th>
                          <h2 className="pdf__middle__title">Condition</h2>
                        </th>
                        <th>
                          <h2 className="pdf__middle__title">Price</h2>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.orderVehicles?.map((item) => (
                        <tr key={item?.id}>
                          <td>
                            <h3 className="pdf__text mt-5">
                              {item?.vehicleYear} / {item?.vehicle?.mark?.name}{' '}
                              /{item?.vehicle?.name}
                            </h3>
                          </td>
                          <td>
                            {' '}
                            <h3 className="pdf__text mt-5 pl-10">
                              {item?.vehicle?.vehicleType}
                            </h3>
                          </td>
                          <td>
                            <h3 className="pdf__text mt-5">
                              {order?.condition == 'run'
                                ? 'Run and drives'
                                : 'Inop, it rolls'}
                            </h3>
                          </td>
                          <td>
                            <h3 className="pdf__text">$1,200.00</h3>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h3 className="pdf__text pl-30">Total price</h3>
                        </td>
                        <td>
                          <h3 className="pdf__text">$2,300.00</h3>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h3 className="pdf__text  pl-30">Reservation fee</h3>
                        </td>
                        <td>
                          <h3 className="pdf__text">$2,300.00</h3>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <h3 className="pdf__text  pl-30">
                            Balance on delivery
                          </h3>
                        </td>
                        <td>
                          <h3 className="pdf__text">$2,300.00</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                <button
                  className="pdf__next"
                  disabled={contractForm ? false : true}
                  style={{ opacity: contractForm ? '' : '0.6' }}
                  onClick={() =>
                    navigate('/contract/' + params.text + `/${params.id}/terms`)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <SignAcceptModal
            openModal={open}
            setModal={setOpen}
            setContractForm={setContractForm}
            savePDF={savePDF}
          />
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
}
