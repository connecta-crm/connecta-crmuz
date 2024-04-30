function Input({
  type,
  placeholder,
  name,
}: {
  type: string;
  placeholder: string;
  name: string | undefined;
}) {
  if (type == 'number') {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        defaultValue={'998'}
      />
    );
  }

  return <input name={name} type={type} placeholder={placeholder} required />;
}
export default Input;
