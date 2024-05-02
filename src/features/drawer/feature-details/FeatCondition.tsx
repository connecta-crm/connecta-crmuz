import ArrowIcon from './ArrowIcon';
import FeatItemClose from './FeatItemClose';
import FeatItemLabel from './FeatItemLabel';
import FeatItemOpen from './FeatItemOpen';

type FeatConditionProps = {
  keyValue: string;
  openPanels: string[];
  onChange: (val: string) => void;
};

function FeatCondition({ keyValue, openPanels, onChange }: FeatConditionProps) {
  return (
    <div className="detail detail-condition">
      <div className="detail__header d-flex align-center justify-between">
        <FeatItemLabel label="Condition" icon="dvigatel" />
        {openPanels?.includes(keyValue) ? (
          <FeatItemOpen
            keyValue={keyValue}
            hasAddAction={false}
            onChange={onChange}
          />
        ) : (
          <FeatItemClose
            keyValue={keyValue}
            textWithBg={true}
            data={{ label: 'Runs and drives' }}
            onChange={onChange}
          />
        )}
        <ArrowIcon keyValue={keyValue} openPanels={openPanels} />
      </div>
    </div>
  );
}

export default FeatCondition;
