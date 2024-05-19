/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from 'antd';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { classNames } from '../../../utils/helpers';

type FeatItemCloseProps = {
  keyValue: string;
  feature: string;
  label: string | undefined;
  textWithBg?: boolean;
  editable?: boolean;
  series?: boolean;
};

function FeatItemClose({
  keyValue,
  textWithBg = false,
  label,
  editable = true,
  series = true,
  feature,
}: FeatItemCloseProps) {
  const { onChangeInnerCollapse } = useDrawerFeature();

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
        <Tooltip
          placement="left"
          color="#ddf2fd"
          overlayInnerStyle={{ color: '#000' }}
          title={label}
        >
          {label}
        </Tooltip>
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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src="./img/drawer/copy.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default FeatItemClose;
