import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { LogType } from '../../features/dstribution/DistributionDataType';
import { useCreateVoip } from '../../features/voip/useCreateVoip';
import { useUpdateVoip } from '../../features/voip/useUpdateVoip';
import { VoipTableDataType } from '../../features/voip/voipTableDataType';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function VoipModal({
  openModal,
  setModal,
  setEditId,
  voip,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  voip: VoipTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const { create } = useCreateVoip();
  const { update } = useUpdateVoip();

  const createUser = (e: VoipTableDataType) => {
    if (voip) {
      e.id = voip.id;
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
    if (voip) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [voip]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={!voip ? 'New VoIP' : 'Voip'}
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
          hasEdit={voip ? true : false}
          showEdit={showEditAction}
          title="Voip information"
        >
          <FormControl img={car} title="Name">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={voip?.name}
                preserve={false}
              >
                <Input value={voip?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">{voip?.name}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Status">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                initialValue={voip?.status}
                preserve={false}
              >
                <Select
                  value={voip?.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">{voip?.status}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Type">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="voipType"
                rules={[{ required: true, message: '' }]}
                initialValue={voip?.voipType}
                preserve={false}
              >
                <Select
                  value={voip?.voipType}
                  options={[
                    { value: 'zoom', label: 'Zoom' },
                    { value: 'dialpad', label: 'Dialpad' },
                    { value: 'ringcentral', label: 'Ringcentral' },
                  ]}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {voip?.voipType}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="API">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="api"
                rules={[{ required: true, message: '' }]}
                initialValue={voip?.api}
                preserve={false}
              >
                <Input value={voip?.api} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">{voip?.api}</span>
            )}
          </FormControl>
        </UpCollapse>
        <br />
        {voip && (
          <>
            <UpCollapse title="History ">
              {voip?.logs?.length ? (
                <>
                  {voip?.logs?.map((item: LogType, index: number) => (
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
