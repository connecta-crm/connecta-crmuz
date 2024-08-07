import { CopyOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import EmptyIcon from '../EmptyIcon';
import Modal from '../Modal';

function CDPriceModal({
  cdPrice,
  isFetchingCDPrice,
  isOpenModal,
  onOpenModal,
}) {
  const { isOpenCDPrice, onCloseCDPrice } = useDrawerFeature();

  const handleCopyPrice = (label: string) => {
    if (!label) return;
    navigator.clipboard.writeText(label)
    message.info({
      content: `Copied: ${label}`,
      icon: <CopyOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const isEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    if (typeof value === 'string') {
      return value.trim() === '';
    }
    return !value;
  };

  const areAllValuesEmpty = (obj) => {
    return Object.values(obj).every(isEmpty);
  };

  useEffect(() => {
    if (isOpenCDPrice) {
      onOpenModal(true);
    }
  }, [isOpenCDPrice]);

  return (
    <Modal
      title="Sample Prices"
      width="middle"
      padding="15"
      hasEdit
      open={isOpenModal}
      onCancel={() => {
        onOpenModal(false);
        onCloseCDPrice();
      }}
    >
      {!areAllValuesEmpty(cdPrice ?? {}) ? (
        <div className="cd-price">
          <div className="cd-price__title">{cdPrice.title}</div>
          <table>
            <thead>
              <tr>
                <th className="first-child">Type</th>
                <th>Route</th>
                <th>Price</th>
                <th>Accepted by Carriers?</th>
                <th className="last-child">
                  Comparable price for your 126 miles
                </th>
              </tr>
            </thead>
            <tbody>
              {cdPrice.cargo.map((cargo, index) => (
                <tr key={index}>
                  <td>{cargo}</td>
                  <td>
                    <span>{cdPrice.route[index]}</span>
                  </td>
                  <td>
                    <div className="d-flex align-center">
                      <img
                        onClick={() => handleCopyPrice(cdPrice.price[index])}
                        className="mr-5 cursor-pointer"
                        src="/img/copy-b.svg"
                        alt="img"
                      />
                      <span>{cdPrice.price[index]}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-center">
                      <span>{cdPrice?.accepted[index]}</span>
                      <img
                        className="ml-5"
                        src={`/img/${cdPrice?.accepted[index] === 'YES' ? 'check' : 'xset'}.svg`}
                        alt="img"
                      />
                    </div>
                  </td>
                  <td>{cdPrice.comparable[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : isFetchingCDPrice ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : (
        <div className="text-center">
          <EmptyIcon />
          <p className="text-center" style={{ color: '#b1b0b0' }}>
            No data
          </p>
        </div>
      )}
    </Modal>
  );
}

export default CDPriceModal;
