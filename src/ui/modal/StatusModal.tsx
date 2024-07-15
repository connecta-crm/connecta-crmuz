import { Form, Input, Select, Spin } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { StatusTableDataType } from '../../features/status-automation/StatusTableDataType';
import { useCreateStatus } from '../../features/status-automation/useCreateStatus';
import { useEmailTemplate } from '../../features/status-automation/useEmailTemplate';
import { useSmsTemplate } from '../../features/status-automation/useSmsTemplate';
import { useUpdateStatus } from '../../features/status-automation/useUpdateStatus';
import { useUsers } from '../../features/users/useUsers';
import History from '../History';
import Modal from '../Modal';
import Dnd, { DndType } from '../dnd/Dnd';
import FormControl from '../form/FormControl';
import InputRow from '../form/InputRow';
import UpCollapse from '../form/UpCollapse';
export type PaymentType = {
  data: FormData;
  id: number | null;
};
export default function StatusModal({
  openModal,
  setModal,
  setEditId,
  status,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  status: StatusTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [includedUsers, setIncludedUsers] = useState<string[]>([]);
  const [available, setAvailable] = useState<DndType[]>([]);
  const [included, setIncluded] = useState<DndType[]>([]);
  const { users } = useUsers(openModal);
  console.log(includedUsers);

  const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
  const [smsEnabled, setSmsEnabled] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create, isLoading } = useCreateStatus();
  const { update, isLoadingUpdate } = useUpdateStatus();
  const { emailTemplates, isLoadingEmailTemplate } =
    useEmailTemplate(emailEnabled);
  const { smsTemplates, isLoadingSmsTemplate } = useSmsTemplate(smsEnabled);

  const createUser = (e: StatusTableDataType) => {
    console.log(e);

    if (status) {
      e.id = status?.id;
      e.includedUsers = includedUsers;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
        },
      });
      return;
    }
    e.includedUsers = includedUsers;
    create(e, {
      onSuccess: () => {
        setModal(false);
      },
    });
  };

  useEffect(() => {
    if (status) {
      setShowInput(true);
      setAvailable([
        ...(status?.includedUsers as unknown as DndType[]),
        ...(status?.availableUsers as unknown as DndType[]),
      ]);
      setIncluded([...(status?.includedUsers as unknown as DndType[])]);
      return;
    }
    setShowInput(false);
    setIncluded([]);
  }, [status]);

  useEffect(() => {
    if (status) {
      setEmailEnabled(true);
      setSmsEnabled(true);
      setShowInput(true);

      return;
    }
    setShowInput(false);
  }, [status]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      loading={isLoading || isLoadingUpdate}
      form={form}
      title={'Status automation'}
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
          hasEdit={status ? true : false}
          showEdit={showEditAction}
          title="User information"
        >
          <FormControl img={car} title="Name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.name}
                preserve={false}
              >
                <Input value={status?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{status?.name}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Email template">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="emailTemplate"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.emailTemplate}
                // initialValue={status&&{value:status?.emailTemplate,label:status.emailTemplateName}}
                preserve={false}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={'Select email template'}
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  onClick={() => setEmailEnabled(true)}
                  loading={isLoadingEmailTemplate}
                  notFoundContent={
                    isLoadingEmailTemplate ? <Spin size="small" /> : 'No data'
                  }
                  options={(emailTemplates || []).map(
                    (d: { id: string; name: string }) => ({
                      value: d.id,
                      label: d.name,
                    }),
                  )}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{status?.emailTemplateName}</span>
            )}
          </FormControl>
          <FormControl img={car} title="SMS template">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="smsTemplate"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.smsTemplate}
                preserve={false}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={'Select sms template'}
                  loading={isLoadingSmsTemplate}
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  notFoundContent={
                    isLoadingSmsTemplate ? <Spin size="small" /> : 'No data'
                  }
                  onClick={() => setSmsEnabled(true)}
                  options={(smsTemplates || []).map(
                    (d: { id: string; name: string }) => ({
                      value: d.id,
                      label: d.name,
                    }),
                  )}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{status?.smsTemplateName}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Steps">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="steps"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.steps}
                preserve={false}
              >
                <Select
                  value={status?.status}
                  placeholder="Select  step"
                  options={[
                    { value: 'after_received', label: 'After received' },
                    { value: 'after_quoted', label: 'After quoted' },
                    { value: 'after_dispatch', label: 'After dispatch' },
                    { value: 'after_pickup', label: 'After pick up' },
                    { value: 'after_delivery', label: 'After delivery' },
                    { value: 'before_pickup', label: 'Before pick up' },
                    { value: 'before_delivery', label: 'Before delivery' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{status?.steps}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Delays">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="delaysMinutes"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.delaysMinutes}
                preserve={false}
              >
                <Input value={status?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className=" ml-20">{status?.delaysMinutes}</span>
            )}
          </FormControl>

          <FormControl img={car} title="Status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.status}
                preserve={false}
              >
                <Select
                  popupClassName="Select status"
                  value={status?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className=" ml-20">{status?.status}</span>
            )}
          </FormControl>
        </UpCollapse>
        <>
          <InputRow>
            <div className="form__controller">
              <div className="down__collapse__header-item ">Users</div>
            </div>
          </InputRow>
          <Dnd
            updateable={true}
            disabled={showInput}
            setIncludedFeatures={setIncludedUsers}
            available={status ? available : users}
            included={included}
          />
          <br />
        </>

        <br />
        {status && (
          <>
            <UpCollapse title="History ">
              {status?.logs?.length ? (
                <>
                  {status?.logs?.map((item: LogType, index: number) => (
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
