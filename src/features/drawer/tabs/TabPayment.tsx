/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, UploadFile } from 'antd';
import { useState } from 'react';
import TabPaymentAttachModal from './TabPaymentAttachModal';

function TabPayment() {
  const [fileList, setFileList] = useState<UploadFile[]>(['123']);
  const [isOpenModal, setOpenModal] = useState({
    attachModal: false,
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
                  <th>Status</th>
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
                    <Button className="ml-10" ghost type="primary" size="small">
                      View
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
                    <Button className="ml-10" ghost type="primary" size="small">
                      Send CCA
                    </Button>
                    <Button className="ml-10" type="primary" size="small">
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
                      View CCA
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
            <Button type="primary" size="middle">
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
    </>
  );
}

export default TabPayment;
