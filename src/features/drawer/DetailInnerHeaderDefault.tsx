import { classNames } from '../../utils/helpers';

type DetailInnerHeaderDefaultProps = {
  keyValue: string;
  textWithBg?: boolean;
  data: {
    label: string;
  };
  onChange: (val: string) => void;
};

function DetailInnerHeaderDefault({
  keyValue,
  textWithBg = false,
  data,
  onChange,
}: DetailInnerHeaderDefaultProps) {
  return (
    <div className="detail__right d-flex align-center justify-between">
      <div
        className={classNames(
          textWithBg ? 'detail__text_with-bg' : '',
          'detail__text',
        )}
      >
        {data?.label}
      </div>
      <div className="detail__right_actions d-flex align-center ml-10">
        <div
          className="box-header__edit cursor-pointer __inner"
          onClick={() => {
            onChange(keyValue);
          }}
        >
          <img src="./img/drawer/pen.svg" alt="" />
        </div>
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

export default DetailInnerHeaderDefault;
