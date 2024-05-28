import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import car from '../../../public/img/sports-car.svg';
import { RolsTableDataType } from '../../features/rols/rolsTableDataType';
import { useCreateRole } from '../../features/rols/useCreateRols';
import Modal from '../Modal';
import RoleDnd from '../../features/rols/RoleDnd';
import FormControl from '../form/FormControl';
import InputCol from '../form/InputCol';
import InputRow from '../form/InputRow';
import UpCollapse from '../form/UpCollapse';
import { useState } from 'react';
export default function RoleModal({
  openModal,
  setModal,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
}) {
  const [includedFeatures,setIncludedFeatures] = useState([])
  const { create } = useCreateRole();
  const createUser = (e: RolsTableDataType) => {
    e.includedFeatures = includedFeatures
    create(e, {
      onSuccess: () => {
        setModal(false);
        setIncludedFeatures([])
      },
    });
  };

  const [form] = Form.useForm();
  return (
    <Modal
      form={form}
      title="New role"
      width="small"
      padding="15"
      // loading={isLoading}
      open={openModal}
      onCancel={() => {
        setModal(false);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse title="Access role information">
          <FormControl img={car} title="Access name">
            <FormItem
              className="m-0 w-100 "
              name="accessName"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Access status">
            <FormItem
              className="m-0 w-100"
              name="accessStatus"
              rules={[{ required: true, message: '' }]}
            >
              <Select
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
              />
            </FormItem>
          </FormControl>

          <InputRow >
            {/* <InputCol>Available features</InputCol>
            <InputCol>Included features</InputCol> */}
             <InputCol> Features</InputCol> 
          </InputRow>

          <RoleDnd includedFeatures={setIncludedFeatures} />
        </UpCollapse>
      </Form>
    </Modal>
  );
}
