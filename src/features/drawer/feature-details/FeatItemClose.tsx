import { CopyOutlined } from '@ant-design/icons';
import { Tooltip, message } from 'antd';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { classNames } from '../../../utils/helpers';

type FeatItemCloseProps = {
  keyValue: string;
  feature: string;
  label: string | undefined;
  textWithBg?: boolean;
  editable?: boolean;
  series?: boolean;
  tooltip?: boolean;
};

function FeatItemClose({
  keyValue,
  textWithBg = false,
  label,
  editable = true,
  series = true,
  tooltip = false,
}: FeatItemCloseProps) {
  const { onChangeInnerCollapse } = useDrawerFeature();

  const handleCopyLabel = () => {
    if (!label) return;
    message.info({
      content: `Copied: ${label}`,
      icon: <CopyOutlined style={{ color: '#108ee9' }} />,
    });
  };

  return (
    <div
      className={classNames(
        !editable || !series ? 'pr-0' : '',
        'detail__right d-flex align-center justify-between',
      )}
    >
      <div
        className={classNames(
          textWithBg ? 'detail__text_with-bg' : '',
          'detail__text',
        )}
      >
        {tooltip ? (
          <Tooltip
            placement="left"
            color="#ddf2fd"
            overlayInnerStyle={{
              color: '#000',
            }}
            title={label}
          >
            {label}
          </Tooltip>
        ) : (
          <span>{label}</span>
        )}
      </div>
      <div
        className="detail__right_actions d-flex align-center"
        style={{ right: series && editable ? '20px' : 0 }}
      >
        {editable && (
          <div
            className="box-header__edit cursor-pointer __inner"
            onClick={() => {
              onChangeInnerCollapse(keyValue);
            }}
          >
            <img src="./img/drawer/pen.svg" alt="" />
          </div>
        )}
        <div
          className="box-header__copy cursor-pointer ml-5 __inner"
          onClick={handleCopyLabel}
        >
          <img src="./img/drawer/copy.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default FeatItemClose;
