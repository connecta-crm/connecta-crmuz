import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { GroundTableDataType } from '../../features/ground/groundTableDataType';
import { useCreateGround } from '../../features/ground/useCreateGround';
import { useUpdateGround } from '../../features/ground/useUpdateGround';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function GroundModal({
  openModal,
  setModal,
  setEditId,
  groundItem,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  groundItem: GroundTableDataType;
  setEditId: (a: null | number) => void;
}) {
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
      // theme: 'default',
      enableDragAndDropFileToEditor: true,
      saveModeInCookie: false,
      triggerChangeEvent: false, //
      direction: 'ltr',
      language: 'pt_BR',
      debugLanguage: false,
      i18n: 'en',
      // tabIndex: tabIndex,
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
      placeholder: 'Type your message here...',
      toolbarButtonSize: 'small',
      buttons:
        'bold,italic,underline,ul,ol,indent,outdent,font,fontsize,image,|,link,|,file,align,',
    }),
    [],
  );
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateGround();
  const { update } = useUpdateGround();

  const createUser = (e: GroundTableDataType) => {
    e.body = content;
    if (groundItem) {
      e.id = groundItem.id;
      // e.isDefault = groundItem.isDefault;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
          setContent('');
        },
      });
      return;
    }
    // e.isDefault = false;
    create(e, {
      onSuccess: () => {
        setModal(false);
        setContent('');
      },
    });
  };

  useEffect(() => {
    if (groundItem) {
      setShowInput(true);
      setContent(groundItem.body);
      return;
    }
    setShowInput(false);
  }, [groundItem]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={'Ground 1.2'}
      width="large"
      padding="15"
      open={openModal}
      hasEdit={showInput ? true : false}
      onCancel={() => {
        setModal(false);
        setEditId(null);
        setContent('');
      }}
    >
      <Form form={form} onFinish={createUser}>
        <div style={{ margin: '0 auto', width: '390px' }}>
          <UpCollapse
            hasEdit={groundItem ? true : false}
            showEdit={showEditAction}
            title="Ground information"
          >
            <FormControl img={car} title="Ground name">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100 "
                  name="name"
                  rules={[{ required: true, message: '' }]}
                  initialValue={groundItem?.name}
                  preserve={false}
                >
                  <Input
                    value={groundItem?.name}
                    type="text"
                    placeholder="Empty"
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {groundItem?.name}
                </span>
              )}
            </FormControl>
            <FormControl img={car} title="Default">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="isDefault"
                  rules={[{ required: true, message: '' }]}
                  initialValue={groundItem?.isDefault}
                  preserve={false}
                >
                  <Select
                    value={groundItem?.isDefault}
                    options={[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ]}
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {groundItem?.isDefault == true ? 'Yes' : 'No'}
                </span>
              )}
            </FormControl>
            <FormControl img={car} title="Status">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="status"
                  rules={[{ required: true, message: '' }]}
                  initialValue={groundItem?.status}
                  preserve={false}
                >
                  <Select
                    value={groundItem?.status}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {groundItem?.status}
                </span>
              )}
            </FormControl>
            <br />
          </UpCollapse>
        </div>
        <JoditEditor
         config={config as unknown as undefined}
          ref={editor}
          value={content}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
      </Form>
    </Modal>
  );
}
