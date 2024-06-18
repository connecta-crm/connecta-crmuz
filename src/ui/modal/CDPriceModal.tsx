import { CopyOutlined } from '@ant-design/icons';
import { notification, Spin } from 'antd';
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

  const [api, contextHolder] = notification.useNotification();
  const key = 'updatable';
  const openNotification = (message: string) => {
    api.open({
      key,
      message: 'Copied...',
      description: null,
      duration: 0.8,
      closable: false,
      icon: <CopyOutlined style={{ color: '#108ee9' }} />,
      className: 'copy-message',
    });

    setTimeout(() => {
      api.open({
        key,
        message,
        duration: 1,
        closable: false,
        icon: <CopyOutlined style={{ color: '#108ee9' }} />,
        className: 'copy-message',
      });
    }, 400);
  };
  const handleCopyPrice = (label: string) => {
    if (!label) return;
    navigator.clipboard
      .writeText(label)
      .then(() => {
        openNotification(label);
      })
      .catch(() => {
        openNotification('Failed to copy text');
      });
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
      {contextHolder}
      {Object.keys(cdPrice ?? {})?.length ? (
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
