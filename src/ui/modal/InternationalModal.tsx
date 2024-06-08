import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { InternationalTableDataType } from '../../features/international/internationalTableDataType';
import { useCreateInternational } from '../../features/international/useCreateInternational';
import { useUpdateInternational } from '../../features/international/useUpdateInternational';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function InternationalModal({
  openModal,
  setModal,
  setEditId,
  international,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  international: InternationalTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateInternational();
  const { update } = useUpdateInternational();

  const createUser = (e: InternationalTableDataType) => {
    e.body = content;
    if (international) {
      e.id = international.id;
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
    if (international) {
      setShowInput(true);
      setContent(international.body);
      return;
    }
    setShowInput(false);
  }, [international]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={'International'}
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
            hasEdit={international ? true : false}
            showEdit={showEditAction}
            title="International information"
          >
            <FormControl img={car} title="Name">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100 "
                  name="name"
                  rules={[{ required: true, message: '' }]}
                  initialValue={international?.name}
                  preserve={false}
                >
                  <Input
                    value={international?.name}
                    type="text"
                    placeholder="Empty"
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {international?.name}
                </span>
              )}
            </FormControl>
            <FormControl img={car} title="Default">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="isDefault"
                  rules={[{ required: true, message: '' }]}
                  initialValue={international?.isDefault}
                  preserve={false}
                >
                  <Select
                    value={international?.isDefault}
                    options={[
                      { value: true, label: 'Yes' },
                      { value: false, label: 'No' },
                    ]}
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {international?.isDefault == true ? 'Yes' : 'No'}
                </span>
              )}
            </FormControl>
            <FormControl img={car} title="Status">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="status"
                  rules={[{ required: true, message: '' }]}
                  initialValue={international?.status}
                  preserve={false}
                >
                  <Select
                    value={international?.status}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {international?.status}
                </span>
              )}
            </FormControl>
            <br />
          </UpCollapse>
        </div>
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
