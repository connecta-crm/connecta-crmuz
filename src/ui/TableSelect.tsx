import { useSearchParams } from 'react-router-dom';

type Option = {
  label: string;
  value: string;
};

type TableSelectProps = {
  selectField: string;
  options: Option[];
};

function TableSelect({ selectField, options, ...props }: TableSelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(selectField) || options[0].value;

  function handleChange(e: { target: { value: string } }) {
    searchParams.set(selectField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      {...props}
      className="dt-header__allsources_select"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default TableSelect;
