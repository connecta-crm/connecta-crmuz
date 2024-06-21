import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { StatusTableDataType } from '../../features/status-automation/StatusTableDataType';
import { useCreateStatus } from '../../features/status-automation/useCreateStatus';
import { useUpdateStatus } from '../../features/status-automation/useUpdateStatus';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
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
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateStatus();
  const { update } = useUpdateStatus();

  const createUser = (e: StatusTableDataType) => {
    if (status) {
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
    if (status) {
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
              <span className="detail__text_with-bg ml-20">{status?.name}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Email template">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.status}
                preserve={false}
              >
                <Select
                  value={status?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {status?.status}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="SMS template">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.status}
                preserve={false}
              >
                <Select
                  value={status?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {status?.status}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Steps">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={status?.status}
                preserve={false}
              >
                <Select
                  value={status?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {status?.status}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Delays">
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
              <span className="detail__text_with-bg ml-20">{status?.name}</span>
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
                  value={status?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {status?.status}
              </span>
            )}
          </FormControl>
        </UpCollapse>

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
