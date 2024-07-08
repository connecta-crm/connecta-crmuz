/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Spin } from 'antd';
import { useContractList } from '../../orders/useContractList';
import { useCreateContract } from '../../orders/useCreateContract';
import TabContractItem from './TabContractItem';

function TabContract({ order }) {
  const { createContract, isLoadingContract } = useCreateContract();
  const { contractList, isLoadingContractList } = useContractList(order, true);

  const handleContractSend = () => {
    createContract({
      order,
      contractType: 'ground',
      signed: true,
    });
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
              <TabContractItem key={contract.id} contract={contract} />
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
