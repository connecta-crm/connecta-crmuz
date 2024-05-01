export default function Input({
  type,
  placeholder,
  name,
  defaultValue
}: {
  type: string;
  placeholder: string;
  name: string | undefined;
  defaultValue: string | undefined;
}) {
  if (type == 'number') {
    return (
      <input
      style={{width:"100%"}}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        defaultValue={'998'}
      />
    );
  }

  return (
    <input
    style={{width:"100%"}}
       disabled={name=="person_phone"}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      defaultValue={defaultValue}
    />
  );
}
