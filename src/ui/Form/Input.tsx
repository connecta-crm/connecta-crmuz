export default function Input({
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
      disabled={name == 'person_phone'}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      defaultValue={defaultValue}
    />
  );
}
