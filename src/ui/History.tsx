type HistoryProps = {
  title: string;
  message?: string;
};

export default function History({ title, message }: HistoryProps) {
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
