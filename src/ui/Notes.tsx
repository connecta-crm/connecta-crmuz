import JoditEditor from 'jodit-react';
import { useMemo, useRef } from 'react';

type TabNotesProps = {
  content: string;
  tabIndex?: number;
  placeholder?: string;
  onSetContent: (note: string) => void;
};

function Notes({
  content,
  tabIndex,
  placeholder,
  onSetContent,
}: TabNotesProps) {
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
      placeholder: placeholder ? placeholder : 'Text..',
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
        onChange={(newContent) => onSetContent(newContent)}
      />
    </div>
  );
}
export default Notes;
