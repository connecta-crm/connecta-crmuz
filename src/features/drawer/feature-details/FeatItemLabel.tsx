import { classNames } from '../../../utils/helpers';

type FeatItemLabelProps = {
  label: string;
  icon: string;
};

function FeatItemLabel({ label, icon }: FeatItemLabelProps) {
  return (
    <div className="detail__left d-flex align-center">
      <div className="detail__icon d-flex">
        <img
          style={{ width: icon !== 'none' ? 20 : 0 }}
          src={`./img/drawer/${icon}.svg`}
          alt=""
        />
      </div>
      <div
        className={classNames(
          icon !== 'none' ? 'ml-10' : 'ml-0',
          'detail__label',
        )}
      >
        {label}
      </div>
    </div>
  );
}

export default FeatItemLabel;
