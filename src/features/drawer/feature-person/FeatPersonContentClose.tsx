import FeatPersonItemInfo from './FeatPersonItemInfo';

function FeatPersonContentClose() {
  return (
    <div className="detail detail-vehicle">
      <FeatPersonItemInfo label="User" icon="user" value="John Smith" />
      <FeatPersonItemInfo label="Email" icon="mail" value="johm@gmail.com" />
      <FeatPersonItemInfo label="Phone" icon="phone" value="+998943445532" />
    </div>
  );
}

export default FeatPersonContentClose;
