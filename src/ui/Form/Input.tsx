function Input({
  type,
  placeholder,
  name,
  defaultValue,
}: {
  type: string;
  placeholder: string;
  name: string | undefined;
  defaultValue: string | undefined;
}) {
  return (
    <input
      disabled={name == 'disabled_value'}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      defaultValue={defaultValue}
    />
  );
}
export default Input;
