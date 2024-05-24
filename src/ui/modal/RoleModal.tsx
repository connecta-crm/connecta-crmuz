import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import car from '../../../public/img/sports-car.svg';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
import { useCreateRole } from '../../features/rols/useCreateRols';
import { RolsTableDataType } from '../../features/rols/rolsTableDataType';
export default function RoleModal({
  openModal,
  setModal,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
}) {

  const { create } = useCreateRole();
  const createUser = (e: RolsTableDataType) => {
    console.log(e)
    create(e, {
      onSuccess: () => {
        setModal(false);
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
                  { value: "active", label: 'Active' },
                  { value: "inactive", label: 'Inactive' },
                ]}
              />
            </FormItem>
          </FormControl>
        </UpCollapse>
      </Form>
    </Modal>
  );
}
