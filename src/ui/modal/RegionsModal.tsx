import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { GroundTableDataType } from '../../features/ground/groundTableDataType';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
import { useCreateRegion } from '../../features/regions/useCreateRegion';
import { useUpdateRegion } from '../../features/regions/useUpdateRegion';

export default function RegionsModal({
  openModal,
  setModal,
  setEditId,
  region,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  region: GroundTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateRegion();
  const { update } = useUpdateRegion();

  const createUser = (e: GroundTableDataType) => {
    e.body = content;
    if (region) {
      e.id = region.id;
      e.isDefault = region.isDefault;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
          setContent('');
        },
      });
      return;
    }
    e.isDefault = false;
    create(e, {
      onSuccess: () => {
        setModal(false);
        setContent('');
      },
    });
  };

  useEffect(() => {
    if (region) {
      setShowInput(true);
      setContent(region.body);
      return;
    }
    setShowInput(false);
  }, [region]);

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
        <UpCollapse
          hasEdit={region ? true : false}
          showEdit={showEditAction}
          title="Hawaii and Alaska information"
        >
          <FormControl img={car} title="Name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={region?.name}
                preserve={false}
              >
                <Input
                  value={region?.name}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {region?.name}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={region?.status}
                preserve={false}
              >
                <Select
                  value={region?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {region?.status}
              </span>
            )}
          </FormControl>
          <br />
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </UpCollapse>
      </Form>
    </Modal>
  );
}
