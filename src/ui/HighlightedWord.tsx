function HighlightedWord({
  value,
  searchCity,
}: {
  value: string;
  searchCity: string | null;
}) {
  if (!searchCity) {
    return <span>{value}</span>;
  }

  const parts = value.split(new RegExp(`(${searchCity})`, 'gi'));

  return (
    <>
      {parts.map((part: string, index: number) =>
        part.toLowerCase() === searchCity.toLowerCase() ? (
          <span
            key={index}
            style={{
              backgroundColor: '#ddf2fd',
              padding: '0 1px',
              borderRadius: 2,
            }}
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export default HighlightedWord;
