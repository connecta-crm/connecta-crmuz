import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { classNames } from '../../../utils/helpers';

type FeatItemCloseProps = {
  keyValue: string;
  label: string;
  textWithBg?: boolean;
  editable?: boolean;
};

function FeatItemClose({
  keyValue,
  textWithBg = false,
  label,
  editable,
}: FeatItemCloseProps) {
  const { onChangeInnerCollapse } = useDrawerFeature();
  return (
    <div
      className={classNames(
        !editable ? 'pr-0' : '',
        'detail__right d-flex align-center justify-between',
      )}
    >
      <div
        className={classNames(
          textWithBg ? 'detail__text_with-bg' : '',
          'detail__text',
        )}
      >
        {label}
      </div>
      <div className="detail__right_actions d-flex align-center ml-10">
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
