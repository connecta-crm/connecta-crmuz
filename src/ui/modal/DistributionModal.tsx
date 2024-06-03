import { Form, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import {
  DistributionDataType,
  LogType,
} from '../../features/dstribution/DistributionDataType';
import { useUpdateDistribution } from '../../features/dstribution/useUpdateDistribution';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
import UseDatePicker from '../picker/DatePicker';
export default function DistributionModal({
  openModal,
  setModal,
  distribution,
  setDistributionId,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  distribution: DistributionDataType | null;
  setDistributionId: (a: number | null) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [startHour, setStartHour] = useState<string>('');
  const [finishHour, setFinishHour] = useState<string>('');
  const { update } = useUpdateDistribution();
  const [form] = Form.useForm();
  const createUser = (e: DistributionDataType) => {
    if (distribution) {
      e.id = distribution?.id;
      e.startHour = startHour;
      e.finishHour = finishHour;
      console.log(e);

      update(e, {
        onSuccess: () => {
          setModal(false);
          setDistributionId(null);
          form.resetFields();
        },
      });
      return;
    }
  };

  useEffect(() => {
    if (distribution) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [distribution]);

  const showEditAction = () => {
    setShowInput(!showInput);
  };

  return (
    <Modal
      hasEdit={showInput ? true : false}
      form={form}
      title={distribution ? 'Lead Distribution' : 'New Lead Distribution'}
      width="small"
      padding="15"
      open={openModal}
      onCancel={() => {
        setModal(false);
        setDistributionId(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          showEdit={showEditAction}
          hasEdit={distribution ? true : false}
          title="Lead distribution information"
        >
          <FormControl img={car} title="Received today">
            <span className="detail__text_with-bg ml-20">
              {distribution?.receivedToday}
            </span>
          </FormControl>
          <FormControl img={car} title="Received today">
            <span className="detail__text_with-bg ml-20">
              {distribution?.receivedToday}
            </span>
          </FormControl>
          <FormControl img={car} title="Queue now">
            <span className="detail__text_with-bg ml-20">
              {distribution?.queueNow}
            </span>
          </FormControl>

          <FormControl img={car} title="Mutiple">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="multiple"
                rules={[{ required: true, message: '' }]}
                initialValue={distribution?.multiple}
                preserve={false}
              >
                <Select
                  placeholder="Empty"
                  options={[
                    { value: '0.5', label: '0.5X' },
                    { value: '1.0', label: '1X' },
                    { value: '1.5', label: '1.5X' },
                    { value: '2.0', label: '2X' },
                    { value: '2.5', label: '2.5X' },
                    { value: '3.0', label: '3 X' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {distribution?.multiple}
              </span>
            )}
          </FormControl>

          <FormControl img={car} title="Start hour">
            {!showInput ? (
              <UseDatePicker
                getYear={setStartHour}
                type="time"
                name="startHour"
                defaultValue={distribution?.startHour}
              />
            ) : (
              <span className="detail__text_with-bg ml-20">
                {distribution?.startHour}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Finish hour">
            {!showInput ? (
              <UseDatePicker
                getYear={setFinishHour}
                type="time"
                name="startHour"
                defaultValue={distribution?.finishHour}
              />
            ) : (
              <span className="detail__text_with-bg ml-20">
                {distribution?.finishHour}
              </span>
            )}
          </FormControl>

          <FormControl img={car} title="Provider status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={distribution?.status}
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
                {distribution?.status}
              </span>
            )}
          </FormControl>
        </UpCollapse>
        <br />
        <UpCollapse title="History ">
          {distribution?.logs.length ? (
            <>
              {distribution?.logs.map((item: LogType, index: number) => (
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
      </Form>
    </Modal>
  );
}
