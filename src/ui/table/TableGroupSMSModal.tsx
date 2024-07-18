import { Select, Spin, TreeSelect } from 'antd';
import { useMemo, useState } from 'react';
import { transformData } from '../../features/drawer/tabs/TabPhone';
import { useFields } from '../../features/fields/useFields';
import { useTemplates } from '../../features/templates/useTemplates';
import Modal from '../Modal';
import Notes from '../Notes';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';

function TableGroupSMSModal({ isOpenModal, onCloseModal }) {
  const [note, setNote] = useState('');
  const [insertFieldValue, setInsertFieldValue] = useState([]);

  const [isOpenTemplate, setOpenTemplate] = useState(false);
  const [isOpenField, setOpenField] = useState(false);

  const handleSendGroupSMS = () => {};

  const fromPhoneValue = '(929) 592-3003'; // todo

  const { templates, isLoading: isLoadingTemplates } =
    useTemplates(isOpenTemplate);
  const { fields, isLoading: isLoadingFields } = useFields(isOpenField);
  const fieldsData = useMemo(() => transformData(fields || []), [fields]);

  const handleChangeTemplate = (body: string) => {
    setNote((prev) => prev.concat(body));
  };

  const handleChangeInsertField = (newValues: string[]) => {
    setInsertFieldValue(newValues);
    setNote((prev) => {
      // Convert the previous note to an array of values, splitting by comma and trimming whitespace
      const prevArray = prev ? prev.split(',').map((item) => item.trim()) : [];

      // Create a new set to hold unique values
      const updatedNoteSet = new Set(prevArray);

      // Add new values to the set (this will automatically handle duplicates)
      newValues.forEach((value) => updatedNoteSet.add(value));

      // Convert the set back to an array and join it to form the new note string
      return Array.from(updatedNoteSet).join(' ');
    });
  };

  return (
    <Modal
      title="Group SMS"
      width="large"
      padding="0"
      saveBtnText="Send"
      loading={false}
      open={isOpenModal}
      onCancel={onCloseModal}
      onSave={handleSendGroupSMS}
    >
      <div className="phone">
        <div className="phone__body">
          <div className="phone__item item-phone">
            <div className="item-phone__text">From:</div>
            <div className="item-phone__select">
              <Select
                variant="borderless"
                defaultValue={fromPhoneValue}
                placeholder=""
                style={{ flex: 1, width: 150, height: 30 }}
                suffixIcon={<img alt="" src={ArrowDownIcon} />}
                options={[{ value: fromPhoneValue, label: fromPhoneValue }]}
              />
            </div>
          </div>
          {/* <div className="phone__item item-phone">
          <div className="item-phone__text">To:</div>
          <div className="item-phone__select">
            <Select
              variant="borderless"
              value={customerPhone}
              defaultValue={customerPhone}
              style={{ flex: 1, width: 150, height: 30 }}
              suffixIcon={<img alt="" src={ArrowDownIcon} />}
              options={[{ value: customerPhone, label: customerPhone }]}
            />
          </div>
        </div> */}
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
                style={{
                  flex: 1,
                  width: 250,
                  maxHeight: 30,
                  margin: '0px 0',
                }}
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

export default TableGroupSMSModal;
