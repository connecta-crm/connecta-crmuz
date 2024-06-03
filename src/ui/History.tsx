export default function History({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="history">
      {message && (
        <>
          <div className="history__card">
            <div className="history__card__header">{title}</div>
            <div className="history__card__body">{message}</div>
          </div>
        </>
      )}
      {!message && (
        <>
          <div className="history__message">{title}</div>
        </>
      )}
    </div>
  );
}
