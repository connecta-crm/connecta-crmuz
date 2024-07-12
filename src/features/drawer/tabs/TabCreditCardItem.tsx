import { Checkbox } from 'antd';

function TabCreditCardItem({
  creditCard,
  index,
  selectedCardId,
  onSelectCard,
}) {
  const handleSelectCard = (value) => {
    // Toggle the selected card
    onSelectCard(value === selectedCardId ? null : value);
  };

  return (
    <>
      <div className="box-header d-flex align-center justify-between">
        <Checkbox
          value={creditCard.id}
          checked={selectedCardId === creditCard.id}
          onChange={() => handleSelectCard(creditCard.id)}
          className="modal__input-label"
        >
          Credit Card information {index === 0 ? '' : `#${index + 1}`}
        </Checkbox>
      </div>
    </>
  );
}

export default TabCreditCardItem;
