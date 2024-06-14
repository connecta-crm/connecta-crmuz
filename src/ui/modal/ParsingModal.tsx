import { Form, Input, Select, Spin } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { ParsingType } from '../../features/parsing/Parsing';
import { ParsingTableDataType } from '../../features/parsing/parsingTableDataType';
import { useCreateParsing } from '../../features/parsing/useCreateParsing';
import { useDeleteParsing } from '../../features/parsing/useDeleteParsing';
import { useGroupItemsParsing } from '../../features/parsing/useGroupItemsParsing';
import { useGroupParsing } from '../../features/parsing/useGroupParsing';
import { useUpdateParsing } from '../../features/parsing/useUpdateParsing';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';
export default function ParsingModal({
  openModal,
  setModal,
  setEditId,
  parsing,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  parsing: ParsingType | null;
  setEditId: (a: ParsingType | null) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const { groups, isFetchingGroup } = useGroupParsing(enabled);
  const { groupItems, isFetchingGroupItem } = useGroupItemsParsing(
    groupId ? true : false,
    groupId ? groupId : '',
  );
  const { create } = useCreateParsing();
  const { update } = useUpdateParsing();
  const { deleted } = useDeleteParsing();

  const createUser = (e: ParsingTableDataType) => {
    console.log(e);

    if (parsing) {
      // parsing as ParsingType
      e.id = parsing.id;
      update(e as unknown as ParsingType, {
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
        setGroupId(null);
      },
    });
  };

  useEffect(() => {
    if (parsing) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [parsing]);

  const [form] = Form.useForm();
  const removeParsingValue = () => {
    deleted(parsing?.id, {
      onSuccess: () => {
        setModal(false);
        setEditId(null);
      },
    });
  };
  return (
    <Modal
      form={form}
      title={'New Parsing'}
      width="small"
      padding="15"
      open={openModal}
      onCancel={() => {
        setModal(false);
        setEditId(null);
        setGroupId(null);
      }}
    >
      <Form form={form} onFinish={createUser}>
        <UpCollapse
          title="Parsing information"
          isDelete={parsing ? true : false}
          removeItem={removeParsingValue}
        >
          <FormControl img={car} title="Group">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="status"
                rules={[{ required: true, message: '' }]}
                preserve={false}
              >
                <Select
                  // loading={isFetchingGroup}
                  notFoundContent={
                    isFetchingGroup ? <Spin size="small" /> : 'No data'
                  }
                  onFocus={() => setEnabled(true)}
                  onChange={(value) => setGroupId(value)}
                  options={(groups || []).map(
                    (d: { id: number; name: string }) => ({
                      value: d.id,
                      label: d.name,
                    }),
                  )}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ">{parsing?.group}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Parsing">
            {!showInput ? (
              <FormItem
                className="m-0 w-100"
                name="item"
                rules={[{ required: true, message: '' }]}
                preserve={false}
              >
                <Select
                  notFoundContent={
                    isFetchingGroupItem ? <Spin size="small" /> : 'No data'
                  }
                  disabled={groupItems ? false : true}
                  options={(groupItems || []).map(
                    (d: { id: number; name: string }) => ({
                      value: d.id,
                      label: d.name,
                    }),
                  )}
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ">{parsing?.parsing}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Value">
            <FormItem
              className="m-0 w-100 "
              name="value"
              rules={[{ required: true, message: '' }]}
              initialValue={parsing?.value}
              preserve={false}
            >
              <Input value={parsing?.value} type="text" placeholder="Empty" />
            </FormItem>
          </FormControl>
        </UpCollapse>
      </Form>
    </Modal>
  );
}
