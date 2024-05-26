import { Form, Input, Select, Spin } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { useRols } from '../../features/rols/useRols';
import { useTeams } from '../../features/teams/useTeam';
import { useCreateUser } from '../../features/users/useCreateUser';
import { UsersTableDataType } from '../../features/users/usersTableDataType';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
export default function UserModal({
  openModal,
  setModal,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
}) {
  const [userDetails, setUserDetails] = useState({ rols: false, teams: false });
  const { teams, isFetchingTeam } = useTeams(userDetails.teams);
  const { rols, isFetchingRole } = useRols(userDetails.rols);
  const { create } = useCreateUser();
  const createUser = (e: UsersTableDataType) => {
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
      title="New user"
      width="small"
      padding="15"
      // loading={isLoading}
      open={openModal}
      onCancel={() => {
        setModal(false);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse title="User information">
          <FormControl img={car} title="User name">
            <FormItem
              className="m-0 w-100 "
              name="username"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="User status">
            <FormItem
              className="m-0 w-100"
              name="isActive"
              rules={[{ required: true, message: '' }]}
            >
              <Select
                options={[
                  { value: true, label: 'Active' },
                  { value: false, label: 'Inactive' },
                ]}
              />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="First name">
            <FormItem
              className="m-0 w-100"
              name="firstName"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Last name">
            <FormItem
              className="m-0 w-100"
              name="lastName"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Phone">
            <FormItem
              className="m-0 w-100"
              name="phone"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="number" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Ext">
            <FormItem
              className="m-0 w-100"
              name="ext"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Email">
            <FormItem
              className="m-0 w-100"
              name="email"
              rules={[{ required: true, type: 'email', message: '' }]}
            >
              <Input type="email" placeholder="Empty" />
            </FormItem>
          </FormControl>
        </UpCollapse>
        <br />
        <UpCollapse title="Access information">
          <FormControl img={car} title="Access">
            <FormItem
              className="m-0 w-100"
              name="access"
              rules={[{ required: true, message: '' }]}
            >
              <Select
                onFocus={() => setUserDetails({ ...userDetails, rols: true })}
                notFoundContent={
                  isFetchingRole ? <Spin size="small" /> : 'No data'
                }
                options={(rols || []).map(
                  (d: { id: string; accessName: string }) => ({
                    value: d.id,
                    label: d.accessName,
                  }),
                )}
              />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Position">
            <FormItem
              className="m-0 w-100"
              name="position"
              // rules={[{ required: true, message: '' }]}
            >
              <Select value={null} options={[]} />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Team">
            <FormItem
              className="m-0 w-100"
              name="team"
              rules={[{ required: true, message: '' }]}
            >
              <Select
                onFocus={() => setUserDetails({ ...userDetails, teams: true })}
                notFoundContent={
                  isFetchingTeam ? <Spin size="small" /> : 'No data'
                }
                options={(teams || []).map(
                  (d: { id: string; name: string }) => ({
                    value: d.id,
                    label: d.name,
                  }),
                )}
              />
            </FormItem>
          </FormControl>
          <FormControl img={car} title="Password">
            <FormItem
              className="m-0 w-100"
              name="password"
              rules={[{ required: true, message: '' }]}
            >
              <Input type="password" placeholder="Empty" />
            </FormItem>
          </FormControl>
        </UpCollapse>
      </Form>
    </Modal>
  );
}
