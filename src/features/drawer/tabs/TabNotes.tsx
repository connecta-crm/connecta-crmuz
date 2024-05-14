import JoditEditor from 'jodit-react';
import { useMemo, useRef } from 'react';
import { CancelNotesActionType } from './Tabs';

function Notes({
  type,
  content,
  tabIndex,
  onSetContent,
}: {
  type: CancelNotesActionType;
  content: string;
  tabIndex: number;
  onSetContent: (type: CancelNotesActionType, note: string) => void;
}) {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      useSearch: false,
      spellcheck: false,
      enter: 'P',
      defaultMode: '1',
      toolbarAdaptive: false,
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      minHeight: 150,
      minWidth: null,
      editorCssClass: 'alic',

      zIndex: 0,
      readonly: false,
      activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
      theme: 'default',
      enableDragAndDropFileToEditor: true,
      saveModeInCookie: false,
      triggerChangeEvent: false, //
      direction: 'ltr',
      language: 'pt_BR',
      debugLanguage: false,
      i18n: 'en',
      tabIndex: tabIndex,
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
      toolbarButtonSize: 'small',
      buttons:
        'bold,italic,underline,ul,ol,indent,outdent,font,fontsize,image,|,link,|,file,align,spellcheck,undo,redo',
    }),
    [],
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content || ''}
        config={config as unknown as undefined}
        onChange={(newContent) => onSetContent(type, newContent)}
      />
    </div>
  );
}
export default Notes;
