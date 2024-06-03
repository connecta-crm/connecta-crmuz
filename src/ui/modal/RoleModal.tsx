import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { RolsTableDataType } from '../../features/rols/rolsTableDataType';
import { useCreateRole } from '../../features/rols/useCreateRols';
import { useUpdateRole } from '../../features/rols/useUpdateRole';
import History from '../History';
import Modal from '../Modal';
import Dnd, { DndType } from '../dnd/Dnd';
import FormControl from '../form/FormControl';
import InputRow from '../form/InputRow';
import UpCollapse from '../form/UpCollapse';
export default function RoleModal({
  openModal,
  setModal,
  role,
  setEditId,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  role: RolsTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [includedFeatures, setIncludedFeatures] = useState<string[]>([]);
  const [available, setAvailable] = useState<DndType[]>([]);
  const [included, setIncluded] = useState<DndType[]>([]);
  const [accessUsers, setAccessUsers] = useState<DndType[]>([]);
  const { create } = useCreateRole();
  const { update } = useUpdateRole();

  const createUser = (e: RolsTableDataType) => {
    e.includedFeatures = includedFeatures;
    if (!role) {
      create(e, {
        onSuccess: () => {
          setModal(false);
          setIncludedFeatures([]);
        },
      });
      return;
    }
    e.id = role?.id;
    console.log(e);

    update(e, {
      onSuccess: () => {
        setModal(false);
        setEditId(null);
        setIncludedFeatures([]);
      },
    });
  };

  useEffect(() => {
    if (role) {
      setShowInput(true);
      setAvailable([
        ...(role?.availableFeatures as unknown as DndType[]),
        ...(role?.includedFeatures as unknown as DndType[]),
      ]);
      setIncluded([...(role?.includedFeatures as unknown as DndType[])]);
      setAccessUsers([...(role?.accessUsers as unknown as DndType[])]);
      return;
    }
    setShowInput(false);
  }, [role]);
  const showEditAction = () => {
    setShowInput(!showInput);
  };

  const [form] = Form.useForm();
  return (
    <Modal
      hasEdit={showInput ? true : false}
      form={form}
      title={!role ? 'New Access Role' : 'Access Role'}
      width="small"
      padding="15"
      open={openModal}
      onCancel={() => {
        setModal(false);
        setEditId(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          hasEdit={role ? true : false}
          showEdit={showEditAction}
          title="Access role information"
        >
          <FormControl img={car} title="Access name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="accessName"
                rules={[{ required: true, message: '' }]}
                initialValue={role?.accessName}
                preserve={false}
              >
                <Input type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {role?.accessName}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Access status">
            {!showInput ? (
              <FormItem
                initialValue={role?.accessStatus}
                className="m-0 w-100"
                name="accessStatus"
                rules={[{ required: true, message: '' }]}
                preserve={false}
              >
                <Select
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {role?.accessStatus}
              </span>
            )}
          </FormControl>
          <InputRow>
            <div className="form__controller">
              <div className="down__collapse__header-item ">Features</div>
            </div>
          </InputRow>
          <Dnd
            updateable={true}
            disabled={showInput}
            available={role && available}
            included={role && included}
            setIncludedFeatures={setIncludedFeatures}
          />

          {role && (
            <>
              <InputRow>
                <div className="form__controller">
                  <div className="down__collapse__header-item">User</div>
                </div>
              </InputRow>
              <Dnd
                updateable={false}
                disabled={true}
                available={role && accessUsers}
                included={role && accessUsers}
                setIncludedFeatures={setIncludedFeatures}
              />
            </>
          )}
        </UpCollapse>
        {role && (
          <>
            <br />
            <UpCollapse title="History">
              {role.logs?.length ? (
                <>
                  {role?.logs?.map((item: LogType, index: number) => (
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
