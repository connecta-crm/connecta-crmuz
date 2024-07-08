/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, UploadFile } from 'antd';
import { useState } from 'react';
import TabChargePaymentModal from './TabChargePaymentModal';
import TabCreatePaymentModal from './TabCreatePaymentModal';
import TabPaymentAttachModal from './TabPaymentAttachModal';
import TabPaymentModal from './TabPaymentModal';
import TabTransRefundModal from './TabTransRefundModal';

function TabPayment({ orderGuid }: { orderGuid: string }) {
  const [fileList, setFileList] = useState<UploadFile[]>(['123']);
  const [isOpenModal, setOpenModal] = useState({
    attachModal: false,
    createPaymentModal: false,
    chargePaymentModal: false,
    paymentModal: false,
    transRefundModal: false,
  });

  return (
    <>
      <div className="tabs-contract tabs-file">
        {fileList.length === 0 ? (
          <div className="tabs-file__content">
            <div className="tabs-file__btns d-flex align-center has-file">
              <Button type="primary" size="middle">
                Create a payment
              </Button>
            </div>
          </div>
        ) : (
          <div className="tabs-file__files mt-0">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Amount</th>
                  <th>Amount charged</th>
                  <th>Payment type</th>
                  <th>Direction</th>
                  <th style={{ width: 205 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>03/15/2024</td>
                  <td>$200.00</td>
                  <td className="highlight">$0.00</td>
                  <td>Zelle</td>
                  <td>Customer to Broker</td>
                  <td>
                    <Button
                      className="ml-10"
                      type="primary"
                      size="small"
                      onClick={() =>
                        setOpenModal((prev) => ({ ...prev, attachModal: true }))
                      }
                    >
                      Attach
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>03/15/2024</td>
                  <td>$200.00</td>
                  <td className="highlight">$200.00</td>
                  <td>Zelle</td>
                  <td>Customer to Broker</td>
                  <td>
                    <Button
                      className="ml-10"
                      ghost
                      type="primary"
                      size="small"
                      onClick={() =>
                        setOpenModal((prev) => ({
                          ...prev,
                          transRefundModal: true,
                        }))
                      }
                    >
                      Receipt
                    </Button>
                    <Button
                      className="ml-10"
                      type="primary"
                      size="small"
                      style={{ backgroundColor: 'rgb(66, 125, 157)' }}
                    >
                      Paid
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>03/15/2024</td>
                  <td>$200.00</td>
                  <td className="highlight">$0.00</td>
                  <td>Credit Card</td>
                  <td>Customer to Broker</td>
                  <td>
                    <Button
                      className="ml-10"
                      ghost
                      type="primary"
                      size="small"
                      onClick={() =>
                        setOpenModal((prev) => ({
                          ...prev,
                          paymentModal: true,
                        }))
                      }
                    >
                      Send CCA
                    </Button>
                    <Button
                      className="ml-10"
                      type="primary"
                      size="small"
                      onClick={() =>
                        setOpenModal((prev) => ({
                          ...prev,
                          chargePaymentModal: true,
                        }))
                      }
                    >
                      Charge
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>03/15/2024</td>
                  <td>$200.00</td>
                  <td className="highlight">$0.00</td>
                  <td>Credit Card</td>
                  <td>Customer to Broker</td>
                  <td>
                    <Button className="ml-10" ghost type="primary" size="small">
                      Receipt CCA
                    </Button>
                    <Button className="ml-10" type="primary" size="small">
                      Charge
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      {fileList.length !== 0 && (
        <Flex
          style={{
            justifyContent: 'space-between',
            padding: '0px 10px 8px',
          }}
          gap="small"
          wrap="wrap"
        >
          <span></span>
          <div>
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, createPaymentModal: true }));
              }}
            >
              Create a payment
            </Button>
          </div>
        </Flex>
      )}
      <TabPaymentAttachModal
        isOpenModal={isOpenModal.attachModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, attachModal: false }))
        }
      />
      <TabCreatePaymentModal
        orderGuid={orderGuid}
        isOpenModal={isOpenModal.createPaymentModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, createPaymentModal: false }))
        }
      />
      <TabChargePaymentModal
        isOpenModal={isOpenModal.chargePaymentModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, chargePaymentModal: false }))
        }
      />
      <TabPaymentModal
        isOpenModal={isOpenModal.paymentModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, paymentModal: false }))
        }
      />
      <TabTransRefundModal
        isOpenModal={isOpenModal.transRefundModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, transRefundModal: false }))
        }
      />
    </>
  );
}

export default TabPayment;
