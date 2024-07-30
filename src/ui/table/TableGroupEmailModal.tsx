import { Input, message, Select, Spin, TreeSelect } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { transformData } from '../../features/drawer/tabs/TabPhone';
import { useFields } from '../../features/fields/useFields';
import { useGroupEmail } from '../../features/group-actions/useGroupEmail';
import { useTemplates } from '../../features/templates/useTemplates';
import Modal from '../Modal';
import Notes from '../Notes';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';

function TableGroupEmailModal({
  ids,
  sourceType: feature,
  isOpenModal,
  onCloseModal,
}) {
  const [note, setNote] = useState('');
  const [subject, setSubject] = useState('');
  const [insertFieldValue, setInsertFieldValue] = useState([]);
  const [isOpenTemplate, setOpenTemplate] = useState(false);
  const [isOpenField, setOpenField] = useState(false);

  const { templates, isLoading: isLoadingTemplates } =
    useTemplates(isOpenTemplate);
  const { fields, isLoading: isLoadingFields } = useFields(isOpenField);

  const fieldsData = useMemo(() => transformData(fields || []), [fields]);

  // const fromEmailValue = 'alibrain@gmail.com'; // todo

  const handleChangeTemplate = (body: string) => {
    setNote((prev) => prev.concat(body));
  };

  const handleChangeInsertField = (newValues: string[]) => {
    setInsertFieldValue(newValues);
    setNote((prev) => {
      const prevArray = prev ? prev.split(',').map((item) => item.trim()) : [];
      const updatedNoteSet = new Set(prevArray);
      newValues.forEach((value) => updatedNoteSet.add(value));

      return Array.from(updatedNoteSet).join(' ');
    });
  };

  const userEmail = 'currentuser';
  // const customerEmail = '';

  const { groupEmail, isLoading, isSuccess } = useGroupEmail();

  const handleSendGroupEmail = () => {
    if (!note) {
      message.warning('Provide a message to send!');
      return;
    }
    groupEmail({
      ids,
      message: note,
      endpointType: feature === 'lead' ? 'leads' : feature,
      subject,
      bccList: [],
      ccList: [],
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      onCloseModal();
    }
  }, [isSuccess, isLoading]);

  return (
    <Modal
      title="Group email"
      width="large"
      padding="0"
      saveBtnText="Send"
      loading={isLoading}
      open={isOpenModal}
      onCancel={onCloseModal}
      onSave={handleSendGroupEmail}
    >
      <div className="phone">
        <div className="phone__body">
          <div className="phone__item item-phone">
            <div className="item-phone__text">From:</div>
            <div className="item-phone__select">
              <Select
                variant="borderless"
                defaultValue={userEmail}
                value={userEmail}
                placeholder=""
                style={{ flex: 1, width: 150, height: 30 }}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[{ value: userEmail, label: userEmail }]}
              />
            </div>
          </div>
          <div className="phone__item item-phone">
            <div className="item-phone__text">To:</div>
            <div className="item-phone__select d-flex align-center">
              <Select
                variant="borderless"
                mode="multiple"
                value={ids}
                defaultValue={ids}
                style={{
                  flex: 1,
                  minWidth: 150,
                  height: 30,
                  overflow: 'hidden',
                }}
                disabled
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={(ids || []).map((id: number) => ({
                  value: id,
                  label: id,
                }))}
              />
            </div>
          </div>
          <div className="phone__item item-phone pl-0">
            <Input
              variant="borderless"
              placeholder="Subject"
              value={subject}
              defaultValue={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ flex: 1, width: '100%', height: 30 }}
            />
          </div>
          <div className="phone__item item-phone">
            <div className="item-phone__select">
              <Select
                variant="filled"
                placeholder="Choose from template"
                style={{ flex: 1, width: 190, height: 22, margin: '4px 0' }}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                loading={isLoadingTemplates}
                onFocus={() => setOpenTemplate(true)}
                allowClear
                notFoundContent={
                  isLoadingTemplates ? (
                    <Spin size="small" />
                  ) : (
                    'No such template'
                  )
                }
                onChange={handleChangeTemplate}
              >
                {(templates || []).map(
                  (item: { id: number; name: string; body: string }) => (
                    <Select.Option key={item.id} value={item.body}>
                      {item.name}
                    </Select.Option>
                  ),
                )}
              </Select>
            </div>
            <div className="item-phone__select">
              <TreeSelect
                value={insertFieldValue}
                treeData={fieldsData}
                style={{ flex: 1, width: 250, maxHeight: 30, margin: '0px 0' }}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                placeholder="Insert a field"
                variant="borderless"
                allowClear
                treeDefaultExpandAll
                multiple
                notFoundContent={
                  isLoadingFields ? <Spin size="small" /> : 'No such field'
                }
                treeIcon
                showSearch={true}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                onFocus={() => setOpenField(true)}
                onChange={handleChangeInsertField}
                className="custom-tree-select"
              />
            </div>
          </div>
          <div className="phone__item item-phone px-0">
            <div className="w-100">
              <Notes
                tabIndex={2}
                content={note}
                placeholder="Type your message here..."
                onSetContent={(val: string) => setNote(val)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TableGroupEmailModal;
