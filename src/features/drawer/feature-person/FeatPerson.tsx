import FeatPersonContentClose from './FeatPersonContentClose';

type FeatPersonProps = {
  keyValue: string;
  openPanels: string[];
  onChange: (val: string) => void;
};

function FeatPerson({ keyValue, openPanels, onChange }: FeatPersonProps) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const obj = [keyValue, openPanels, onChange];
console.log(obj);

  return (
    <>
      <FeatPersonContentClose />
    </>
  );
}

export default FeatPerson;
