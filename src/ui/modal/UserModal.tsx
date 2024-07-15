import { Form, Input, Select, Spin } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { useRols } from '../../features/rols/useRols';
import { useTeams } from '../../features/teams/useTeam';
import { useCreateUser } from '../../features/users/useCreateUser';
import { useUpdateUser } from '../../features/users/useUpdateUser';
import { UsersTableDataType } from '../../features/users/usersTableDataType';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
export default function UserModal({
  openModal,
  setModal,
  user,
  setUserId,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  user: UsersTableDataType | null;
  setUserId: (a: number | null) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({ rols: false, teams: false });
  const { update } = useUpdateUser();
  const { teams, isFetchingTeam } = useTeams(userDetails.teams || showInput);
  const { rols, isFetchingRole } = useRols(userDetails.rols || showInput);
  const [form] = Form.useForm();
  const { create } = useCreateUser();
  const createUser = (e: UsersTableDataType) => {
    if (user) {
      e.id = user?.id;
      e.newpassword = e.password ? e.password : '';

      update(e, {
        onSuccess: () => {
          setModal(false);
          setUserId(null);
          form.resetFields();
        },
      });
      return;
    }
    create(e, {
      onSuccess: () => {
        setModal(false);
      },
    });
  };

  useEffect(() => {
    if (user) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [user]);

  const showEditAction = () => {
    setShowInput(!showInput);
  };

  return (
    <Modal
      form={form}
      title={user ? 'User details' : 'New User'}
      width="small"
      padding="15"
      open={openModal}
      onCancel={() => {
        setModal(false);
        setUserId(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          showEdit={showEditAction}
          hasEdit={user ? true : false}
          title="User information"
        >
          <FormControl img={car} title="User status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="isActive"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.isActive}
                preserve={false}
              >
                <Select
                  placeholder="Empty"
                  options={[
                    { value: true, label: 'Active' },
                    { value: false, label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">
                {user?.isActive ? 'active' : 'inactive'}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="First name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="firstName"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.firstName}
                preserve={false}
              >
                <Input type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{user?.firstName}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Last name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="lastName"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.lastName}
                preserve={false}
              >
                <Input type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{user?.lastName}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Phone">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="phone"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.phone}
                preserve={false}
              >
                <Input type="number" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{user?.phone}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Ext">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="ext"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.ext}
                preserve={false}
              >
                <Input type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{user?.ext}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Email">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="email"
                rules={[{ required: true, type: 'email', message: '' }]}
                initialValue={user?.email}
                preserve={false}
              >
                <Input type="email" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{user?.email}</span>
            )}
          </FormControl>
        </UpCollapse>
        <br />
        <UpCollapse title="Access information">
          <FormControl img={car} title="Access">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="access"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.access}
                preserve={false}
              >
                <Select
                  placeholder="Empty"
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
            ) : (
              <span className=" ml-20">{user?.accessName}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Team">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="team"
                rules={[{ required: true, message: '' }]}
                initialValue={user?.team}
                preserve={false}
              >
                <Select
                  placeholder="Empty"
                  onFocus={() =>
                    setUserDetails({ ...userDetails, teams: true })
                  }
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
            ) : (
              <span className=" ml-20">{user?.teamName}</span>
            )}
          </FormControl>

          <FormControl img={car} title="Password">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="password"
                rules={[{ required: user ? false : true, message: '' }]}
              >
                <Input
                  type="password"
                  placeholder={showInput ? 'New password' : 'Password'}
                />
              </FormItem>
            ) : (
              <span className=" ml-20"></span>
            )}
          </FormControl>
        </UpCollapse>
        {user && (
          <>
            <br />
            <UpCollapse title="History">
              {user.logs?.length ? (
                <>
                  {user?.logs?.map((item: LogType, index: number) => (
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
          </>
        )}
      </Form>
    </Modal>
  );
}
