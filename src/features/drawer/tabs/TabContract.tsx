/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UploadProps } from 'antd';
import { Button, Flex, Spin } from 'antd';
import { format, parse } from 'date-fns';
import { useContractList } from '../../orders/useContractList';
import { useContractSendSMS } from '../../orders/useContractSendSMS';
import { useCreateContract } from '../../orders/useCreateContract';

function TabContract({ order }) {
  const { createContract, isLoadingContract } = useCreateContract();
  const { contractList, isLoadingContractList } = useContractList(order, true);
  const { contractSendSMS, isLoadingContractSendSMS } = useContractSendSMS();

  console.log('contractList', contractList);

  const handleContractSend = () => {
    createContract({
      order,
      contractType: 'ground',
      signed: true,
    });
  };

  const handleContractSendSMS = () => {
    contractSendSMS();
  };

  if (isLoadingContractList) {
    return (
      <div className="text-center py-10">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div className="tabs-contract tabs-file">
        {(contractList || []).length === 0 ? (
          <div className="tabs-file__content">
            <div className="tabs-file__btns d-flex align-center has-file">
              <Button
                type="primary"
                size="middle"
                className="d-flex align-center"
                loading={isLoadingContract}
                disabled={isLoadingContract}
                onClick={handleContractSend}
              >
                <span>Send a contract</span>{' '}
              </Button>
            </div>
          </div>
        ) : (
          <div className="tabs-file__files mt-0">
            {(contractList || []).map((contract) => (
              <div key={contract.id} className="file-item">
                <div className="file-item__content">
                  <p>
                    <img src="./img/drawer/tab/contract-black.svg" alt="" />
                  </p>
                  <div className="file-item__text">
                    <span>Contract is sent for #{contract.id}</span>{' '}
                    <span className="ml-5">
                      at{' '}
                      {format(
                        parse(
                          contract.createdAt,
                          'MM/dd/yyyy hh:mm a',
                          new Date(),
                        ),
                        'hh:mm a',
                      )}
                    </span>
                    <span className="ml-5">
                      {' '}
                      {format(
                        parse(
                          contract.createdAt,
                          'MM/dd/yyyy hh:mm a',
                          new Date(),
                        ),
                        'MM/dd/yyyy',
                      )}
                    </span>
                  </div>
                </div>
                <div onClick={() => {}} className="">
                  <Button
                    disabled
                    className="ml-10"
                    type="primary"
                    ghost
                    size="small"
                  >
                    Track
                  </Button>
                  <Button
                    className="ml-10"
                    type="primary"
                    ghost
                    size="small"
                    disabled={isLoadingContractSendSMS}
                    loading={isLoadingContractSendSMS}
                    onClick={handleContractSendSMS}
                  >
                    SMS
                  </Button>
                  {contract.signed ? (
                    <Button
                      className="ml-10"
                      type="text"
                      size="small"
                      style={{
                        backgroundColor: 'rgb(66, 125, 157)',
                        cursor: 'initial',
                        color: '#ffffff',
                      }}
                    >
                      Signed
                    </Button>
                  ) : (
                    <Button
                      className="ml-10"
                      type="text"
                      size="small"
                      style={{
                        backgroundColor: '#1677ff',
                        cursor: 'initial',
                        color: '#ffffff',
                      }}
                    >
                      Not-Signed
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {(contractList || []).length !== 0 && (
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
              className="d-flex align-center"
              loading={isLoadingContract}
              disabled={isLoadingContract}
              onClick={handleContractSend}
            >
              <span>Send a new contract</span>{' '}
              {/* <img
                className="ml-10"
                src="/img/drawer/tab/down-w.svg"
                alt="down"
              /> */}
            </Button>
          </div>
        </Flex>
      )}
    </>
  );
}

export default TabContract;
