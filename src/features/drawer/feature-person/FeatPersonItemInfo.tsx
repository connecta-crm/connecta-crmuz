type FeatPersonItemInfoProps = {
  label: string;
  icon: string;
  value: string;
};
function FeatPersonItemInfo({ label, icon, value }: FeatPersonItemInfoProps) {
  return (
    <div className="detail__header d-flex align-center mb-10">
      <div className="detail__left d-flex align-center min-w-30">
        <div className="detail__icon d-flex">
          <img className="w-20" src={`./img/drawer/${icon}.svg`} alt="" />
        </div>
        <div className="detail__label ml-10">{label}</div>
      </div>
      <p>{value}</p>
      {icon === 'phone' && (
        <div className="box-header__edit ml-10 w-30">
          <img src="./img/drawer/call-more.svg" alt="" />
        </div>
      )}
    </div>
  );
}

export default FeatPersonItemInfo;
