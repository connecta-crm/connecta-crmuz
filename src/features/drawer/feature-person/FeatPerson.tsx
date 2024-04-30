import FeatPersonContentClose from './FeatPersonContentClose';

type FeatPersonProps = {
  keyValue: string;
  openPanels: string[];
  onChange: (val: string) => void;
};

function FeatPerson({ keyValue, openPanels, onChange }: FeatPersonProps) {
  console.log(keyValue, openPanels, onChange);
  return (
    <>
      <FeatPersonContentClose />
    </>
  );
}

export default FeatPerson;
