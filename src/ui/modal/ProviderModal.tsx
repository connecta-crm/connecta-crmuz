import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { SettingProvidersTableDataType } from '../../features/setting-providers/setttingProviderTableDataType';
import { useCreateSettingProvider } from '../../features/setting-providers/useCreateSettingProvider';
import { useUpdateSettingProvider } from '../../features/setting-providers/useUpdateSettingProvider';
import { useUsers } from '../../features/users/useUsers';
import History from '../History';
import Modal from '../Modal';
import Dnd, { DndType } from '../dnd/Dnd';
import FormControl from '../form/FormControl';
import InputRow from '../form/InputRow';
import UpCollapse from '../form/UpCollapse';
export default function ProviderModal({
  openModal,
  setModal,
  provider,
  setProviderId,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  provider: SettingProvidersTableDataType | null;
  setProviderId: (a: number | null) => void;
}) {
  const [includedUsers, setIncludedUsers] = useState<string[]>([]);
  const [available, setAvailable] = useState<DndType[]>([]);
  const [included, setIncluded] = useState<DndType[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [effective, setEffective] = useState<'no' | 'yes'>('yes');
  const [providerType, setProviderType] = useState<'standard' | 'exclusive'>(
    'standard',
  );
  const { update } = useUpdateSettingProvider();
  const [form] = Form.useForm();
  const { create } = useCreateSettingProvider();
  const { users } = useUsers(openModal);
  const createUser = (e: SettingProvidersTableDataType) => {
    if (provider) {
      e.id = provider?.id;
      e.exclusiveUsers = includedUsers;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setProviderId(null);
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
    if (provider) {
      setShowInput(true);
      setEffective(provider.effective);
      setProviderType(provider.type);
      setAvailable([
        ...(provider?.availableExclusiveUsers as unknown as DndType[]),
        ...(provider?.exclusiveUsers as unknown as DndType[]),
      ]);
      setIncluded([...(provider?.exclusiveUsers as unknown as DndType[])]);
      return;
    }
    setShowInput(false);
    setIncluded([]);
  }, [provider]);

  const showEditAction = () => {
    setShowInput(!showInput);
  };

  return (
    <Modal
      hasEdit={showInput ? true : false}
      form={form}
      title={provider ? 'Lead Provider' : 'New Lead Provider'}
      width="small"
      padding="15"
      open={openModal}
      onCancel={() => {
        setModal(false);
        setProviderId(null);
        setProviderType('standard');
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          showEdit={showEditAction}
          hasEdit={provider ? true : false}
          title="Lead provider information"
        >
          <FormControl img={car} title="Provider name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={provider?.name}
                preserve={false}
              >
                <Input type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {provider?.name}
              </span>
            )}
          </FormControl>

          <FormControl img={car} title="Provider status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={provider?.status}
                preserve={false}
              >
                <Select
                  placeholder="Empty"
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {provider?.status}
              </span>
            )}
          </FormControl>

          <FormControl img={car} title="Provider type">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="type"
                rules={[{ required: true, message: '' }]}
                initialValue={provider?.type}
                preserve={false}
              >
                <Select
                  placeholder="Empty"
                  onChange={(e) => setProviderType(e)}
                  options={[
                    { value: 'standard', label: 'Standard' },
                    { value: 'exclusive', label: 'Exclusive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {provider?.type}
              </span>
            )}
          </FormControl>
          {providerType == 'exclusive' && (
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
                available={provider ? available : users}
                included={included}
              />
              <br />
            </>
          )}

          <FormControl img={car} title="Effective">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="effective"
                rules={[{ required: true, message: '' }]}
                initialValue={provider?.effective}
                preserve={false}
              >
                <Select
                  onChange={(value) => setEffective(value)}
                  placeholder="Empty"
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {provider?.effective}
              </span>
            )}
          </FormControl>
          {effective == 'no' ? (
            <>
              <FormControl img={car} title="Value">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100"
                    name="value"
                    // rules={[{ required: true, message: '' }]}
                    initialValue={provider?.value}
                    preserve={false}
                  >
                    <Input type="number" placeholder="Empty" />
                  </FormItem>
                ) : (
                  <span className="detail__text_with-bg ml-20">
                    {provider?.value}
                  </span>
                )}
              </FormControl>
              <FormControl img={car} title="Default deposit">
                {!showInput ? (
                  <FormItem
                    className="m-0 w-100"
                    name="defaultDeposit"
                    rules={[{ required: true, message: '' }]}
                    initialValue={provider?.defaultDeposit}
                    preserve={false}
                  >
                    <Input type="number" placeholder="Empty" />
                  </FormItem>
                ) : (
                  <span className="detail__text_with-bg ml-20">
                    {provider?.defaultDeposit}
                  </span>
                )}
              </FormControl>
            </>
          ) : (
            <FormControl img={car} title="Leads in queue">
              {!showInput ? (
                <FormItem
                  className="m-0 w-100"
                  name="leadsInQueue"
                  rules={[{ required: true, message: '' }]}
                  initialValue={provider?.leadsInQueue}
                  preserve={false}
                >
                  <Input type="number" placeholder="Empty" />
                </FormItem>
              ) : (
                <span className="detail__text_with-bg ml-20">
                  {provider?.leadsInQueue}
                </span>
              )}
            </FormControl>
          )}

          <FormControl img={car} title="Email">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="email"
                rules={[{ required: true, type: 'email', message: '' }]}
                initialValue={provider?.email}
                preserve={false}
              >
                <Input type="email" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {provider?.email}
              </span>
            )}
          </FormControl>

          <FormControl img={car} title="Subject">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="subject"
                // rules={[{ required: true, message: '' }]}
                initialValue={provider?.subject}
                preserve={false}
              >
                <Input type="email" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {provider?.subject}
              </span>
            )}
          </FormControl>
        </UpCollapse>
        {provider && (
          <>
            <br />
            <UpCollapse title="History">
              {provider.logs?.length ? (
                <>
                  {provider?.logs?.map((item: LogType, index: number) => (
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
