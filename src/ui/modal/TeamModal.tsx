import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import car from '../../../public/img/sports-car.svg';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
import { TeamsTableDataType } from '../../features/teams/teamsTableDataType';
import { useCreateTeam } from '../../features/teams/useCreateTeam';
export default function TeamModal({
  openModal,
  setModal,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
}) {

  const { create } = useCreateTeam();
  const createUser = (e: TeamsTableDataType) => {
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
      title="New team"
      width="small"
      padding="15"
      // loading={isLoading}
      open={openModal}
      onCancel={() => {
        setModal(false);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse title="Team information">
          <FormControl img={car} title="User name">
            <FormItem
              className="m-0 w-100 "
              name="name"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="User status">
            <FormItem
              className="m-0 w-100"
              name="status"
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
