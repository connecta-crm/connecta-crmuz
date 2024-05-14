type FeatItemLabelProps = {
  label: string;
  icon: string;
};

function FeatItemLabel({ label, icon }: FeatItemLabelProps) {
  return (
    <div className="detail__left d-flex align-center">
      <div className="detail__icon d-flex">
        <img src={`./img/drawer/${icon}.svg`} alt="" />
      </div>
      <div className="detail__label ml-10">{label}</div>
    </div>
  );
}

export default FeatItemLabel;
