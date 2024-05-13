import JoditEditor from 'jodit-react';
import { useCallback, useMemo, useState } from 'react';

function Notes({
  type,
  content,
  onSetContent,
}: {
  type: string;
  content: string;
  onSetContent: (type: string, note: string) => void;
}) {
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    // @ts-expect-error: Unreachable code error
    (message) => {
      const newLogs = [...logs, message];
      // @ts-expect-error: Unreachable code error
      setLogs(newLogs);
      console.log('logs = ', logs);
    },
    [logs, setLogs],
  );

  const config = useMemo(
    () => ({
      zIndex: 0,
      readonly: false,
      activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
      theme: 'default',
      enableDragAndDropFileToEditor: true,
      saveModeInCookie: false,
      spellcheck: false, //
      editorCssClass: false,
      triggerChangeEvent: false, //
      height: 150,
      direction: 'ltr',
      language: 'pt_BR',
      debugLanguage: false,
      i18n: 'en',
      tabIndex: -1,
      // toolbar: true,
      enter: 'P',
      useSplitMode: false,
      colorPickerDefaultTab: 'background',
      imageDefaultWidth: 100,
      removeButtons: ['about', 'print', 'file'],
      disablePlugins: ['paste', 'stat'],
      events: {},
      textIcons: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      placeholder: 'Text..',
      showXPathInStatusbar: false,
      toolbarButtonSize: 'small',
      defaultMode: '1',
      buttons: [
        'bold',
        'italic',
        'underline',
        'ul',
        'ol',
        'indent',
        'outdent',
        'font',
        'fontsize',
        'image',
        'link',
        'file',
        'spellcheck',
        'undo',
        'redo',
      ],
    }),
    [],
  );

  // const onChange = useCallback(
  //   // @ts-expect-error: Unreachable code error
  //   (newContent) => {
  //     appendLog(`onChange triggered with ${newContent}`);
  //   },
  //   [appendLog],
  // );

  // useEffect(() => {
  //   console.log('onChange = ', onChange);
  // }, [onChange]);

  const onBlur = useCallback(
    // @ts-expect-error: Unreachable code error
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      // setContent(newContent);
    },
    [appendLog],
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
        onChange={(newContent) => onSetContent(type, newContent)}
      />
    </div>
  );
}
export default Notes;
