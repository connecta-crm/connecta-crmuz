import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { TeamsTableDataType } from '../../features/teams/teamsTableDataType';
import { useCreateTeam } from '../../features/teams/useCreateTeam';
import { useUpdateTeam } from '../../features/teams/useUpdateTeam';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function TeamModal({
  openModal,
  setModal,
  setEditId,
  team,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  team: TeamsTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateTeam();
  const { update } = useUpdateTeam();
  const createUser = (e: TeamsTableDataType) => {
    if (team) {
      console.log(e);

      e.id = team.id;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
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
    if (team) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [team]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={team ? 'Team' : 'New team'}
      width="small"
      padding="15"
      open={openModal}
      hasEdit={showInput ? true : false}
      onCancel={() => {
        setModal(false);
        setEditId(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          hasEdit={team ? true : false}
          showEdit={showEditAction}
          title="Team information"
        >
          <FormControl img={car} title="User name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={team?.name}
                preserve={false}
              >
                <Input value={team?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{team?.name}</span>
            )}
          </FormControl>
          <FormControl img={car} title="User status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={team?.status}
                preserve={false}
              >
                <Select
                  value={team?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{team?.status}</span>
            )}
          </FormControl>
        </UpCollapse>
        {team && (
          <>
            <br />
            <UpCollapse title="History">
              {team.logs?.length ? (
                <>
                  {team?.logs?.map((item: LogType, index: number) => (
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
