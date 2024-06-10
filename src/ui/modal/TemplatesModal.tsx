import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useRef, useState } from 'react';
// import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { TemplatesTableDataType } from '../../features/templates/templatesTableDataType';
import { useCreateTemplate } from '../../features/templates/useCreateTemplate';
import { useUpdateTemplate } from '../../features/templates/useUpdateTemplate';
import Fields from '../Fields';
import History from '../History';
import Modal from '../Modal';
// import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function TemplatesModal({
  openModal,
  setModal,
  setEditId,
  template,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  template: TemplatesTableDataType;
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
      theme: 'default',
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
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateTemplate();
  const { update } = useUpdateTemplate();
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const createUser = (e: TemplatesTableDataType) => {
    e.body = content;
    if (template) {
      e.id = template.id;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
          setContent('');
        },
      });
      return;
    }
    create(e, {
      onSuccess: () => {
        setModal(false);
        setContent('');
      },
    });
  };

  useEffect(() => {
    if (template) {
      setShowInput(true);
      setContent(template.body);
      return;
    }
    setShowInput(false);
  }, [template]);

  const [form] = Form.useForm();
  // const showEditAction = () => {
  //   setShowInput(!showInput);
  // };
  return (
    <Modal
      form={form}
      title={!showInput ? 'New template' : 'Template'}
      width="large"
      padding="0"
      open={openModal}
      hasEdit={false}
      onCancel={() => {
        setModal(false);
        setEditId(null);
        setContent('');
      }}
    >
      <Form form={form} onFinish={createUser}>
        <div
          className="template__modal_header d-flex align-center "
          style={{
            gap: '27px',
            padding: '10px 15px',
            borderBottom: '1px solid #ccc',
          }}
        >
          <FormItem
            className="m-0 "
            name="name"
            rules={[{ required: true, message: '' }]}
            initialValue={template?.name}
            preserve={false}
          >
            <Input value={template?.name} type="text" placeholder=" Name" />
          </FormItem>
          <FormItem
            className="m-0"
            name="status"
            rules={[{ required: true, message: '' }]}
            initialValue={template?.status}
            preserve={false}
          >
            <Select
              value={template?.status}
              placeholder="Status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </FormItem>
          <FormItem
            className="m-0 "
            name="templateType"
            rules={[{ required: true, message: '' }]}
            initialValue={template?.templateType}
            preserve={false}
          >
            <Select
              placeholder="Type"
              value={template?.templateType}
              options={[
                { value: 'sms', label: 'SMS' },
                { value: 'email', label: 'Email' },
              ]}
            />
          </FormItem>
          {!showInput && <Fields content={content} setContent={setContent} />}
        </div>

        {/* <div style={{ margin: '0 auto', width: '' }}>
          <UpCollapse
            hasEdit={template ? true : false}
            showEdit={showEditAction}
            title="Templates information"
          >
            <FormControl img={car} title="Insert a field">
              {!showInput && (
                <Fields content={content} setContent={setContent} />
              )}
            </FormControl>
            <FormControl img={car} title="Name">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100 "
                  name="name"
                  rules={[{ required: true, message: '' }]}
                  initialValue={template?.name}
                  preserve={false}
                >
                  <Input
                    value={template?.name}
                    type="text"
                    placeholder="Empty"
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {template?.name}
                </span>
              )}
            </FormControl>
            <FormControl img={car} title="Status">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="status"
                  rules={[{ required: true, message: '' }]}
                  initialValue={template?.status}
                  preserve={false}
                >
                  <Select
                    value={template?.status}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {template?.status}
                </span>
              )}
            </FormControl>
            <FormControl img={car} title="Type">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="templateType"
                  rules={[{ required: true, message: '' }]}
                  initialValue={template?.templateType}
                  preserve={false}
                >
                  <Select
                    value={template?.templateType}
                    options={[
                      { value: 'sms', label: 'SMS' },
                      { value: 'email', label: 'Email' },
                    ]}
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {template?.templateType}
                </span>
              )}
            </FormControl>
          </UpCollapse>
        </div> */}
        <div className="template__jod">
          <JoditEditor
           config={config as unknown as undefined}
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>

        
        {template && (
          <>
          <br />
          <div style={{padding:"0 15px"}}>
          <UpCollapse title="History ">
              {template?.logs?.length ? (
                <>
                  {template?.logs?.map((item: LogType, index: number) => (
                    <History
                      key={index}
                      title={item?.title}
                      message={item.message}
                    />
                  ))}
                </>
              ) : (
                <div className="d-flex justify-center history__message">
                  Not found history
                </div>
              )}
            </UpCollapse>
          </div>
          </>
        )}
      </Form>
    </Modal>
  );
}
