import { Button } from 'antd';
import { format, parse } from 'date-fns';
import { useContractSendSMS } from '../../orders/useContractSendSMS';

function TabContractItem({ contract }) {
  const { contractSendSMS, isLoadingContractSendSMS } = useContractSendSMS();

  return (
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
              parse(contract.createdAt, 'MM/dd/yyyy hh:mm a', new Date()),
              'hh:mm a',
            )}
          </span>
          <span className="ml-5">
            {' '}
            {format(
              parse(contract.createdAt, 'MM/dd/yyyy hh:mm a', new Date()),
              'MM/dd/yyyy',
            )}
          </span>
        </div>
      </div>
      <div onClick={() => {}} className="">
        <Button disabled className="ml-10" type="primary" ghost size="small">
          Track
        </Button>
        <Button
          className="ml-10"
          type="primary"
          ghost
          size="small"
          disabled={isLoadingContractSendSMS}
          loading={isLoadingContractSendSMS}
          onClick={() => {
            contractSendSMS(Number(contract.id));
          }}
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
  );
}

export default TabContractItem;
