import JoditEditor from 'jodit-react';
import { useCallback, useMemo, useState } from 'react';

function Notes() {
  const [content, setContent] = useState('');
  const [logs, setLogs] = useState([]);
  const appendLog = useCallback(
    // @ts-expect-error: Unreachable code error
    (message) => {
      console.log('logs = ', logs);
      const newLogs = [...logs, message];
      // @ts-expect-error: Unreachable code error
      setLogs(newLogs);
    },
    [logs, setLogs],
  );

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    [],
  );

  const onChange = useCallback(
    // @ts-expect-error: Unreachable code error
    (newContent) => {
      appendLog(`onChange triggered with ${newContent}`);
    },
    [appendLog],
  );

  // useEffect(() => {
  //   console.log('onChange = ', onChange);
  // }, [onChange]);

  const onBlur = useCallback(
    // @ts-expect-error: Unreachable code error
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      setContent(newContent);
    },
    [appendLog, setContent],
  );

  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        // @ts-expect-error: Unreachable code error
        tabIndex={1}
        statusBar={false}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}
export default Notes;
