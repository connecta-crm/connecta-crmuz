import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { TemplatesTableDataType } from '../../features/templates/templatesTableDataType';
import { useCreateTemplate } from '../../features/templates/useCreateTemplate';
import { useUpdateTemplate } from '../../features/templates/useUpdateTemplate';
import Fields from '../Fields';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
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
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={'Templates'}
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
        <div style={{ margin: '0 auto', width: '450px' }}>
          <UpCollapse
            hasEdit={template ? true : false}
            showEdit={showEditAction}
            title="Templates information"
          >
            <FormControl img={car} title="Insert a field">
              {!showInput && <Fields content={content} setContent={setContent} />}
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
        </div>
        <br />
        <JoditEditor
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
