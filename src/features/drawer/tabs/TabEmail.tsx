/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Input, Select, Spin, TreeSelect } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Notes from '../../../ui/Notes';
import { useCreateEmail } from '../../attachments/useCreateEmail';
import { EndPointType } from '../../attachments/useCreateNote';
import { useFields } from '../../fields/useFields';
import { useTemplates } from '../../templates/useTemplates';
import { transformData } from './TabPhone';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';

function TabEmail({ user, sourceId, userEmail, customerEmail, sourceType }) {
  const [note, setNote] = useState('');
  const [subject, setSubject] = useState('');
  const [insertFieldValue, setInsertFieldValue] = useState([]);
  const [isOpenTemplate, setOpenTemplate] = useState(false);
  const [isOpenField, setOpenField] = useState(false);

  const { createEmail, isLoading, createdEmailData } = useCreateEmail(
    sourceType as EndPointType,
  );

  const { templates, isLoading: isLoadingTemplates } =
    useTemplates(isOpenTemplate);
  const { fields, isLoading: isLoadingFields } = useFields(isOpenField);

  const fieldsData = useMemo(() => transformData(fields), [fields]);

  const fromEmailValue = 'alibrain@gmail.com'; // todo

  const handleSave = () => {
    createEmail({
      rel: sourceId,
      endpointType: sourceType,
      text: note,
      fromEmail: fromEmailValue,
      toEmail: [userEmail],
      subject,
    });
  };

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

  useEffect(() => {
    if (!isLoading && createdEmailData) {
      setNote('');
      setSubject('');
    }
  }, [isLoading, createdEmailData]);

  return (
    <div className="phone">
      <div className="phone__body">
        <div className="phone__item item-phone">
          <div className="item-phone__text">From:</div>
          <div className="item-phone__select">
            <Select
              variant="borderless"
              defaultValue={userEmail}
              placeholder=""
              style={{ flex: 1, width: 150, height: 30 }}
              suffixIcon={<img alt="" src={ArrowDownIcon} />}
              options={[{ value: userEmail, label: userEmail }]}
            />
          </div>
        </div>
        <div className="phone__item item-phone">
          <div className="item-phone__text">To:</div>
          <div className="item-phone__select">
            <Select
              variant="borderless"
              value={customerEmail}
              defaultValue={customerEmail}
              style={{ flex: 1, width: 150, height: 30 }}
              suffixIcon={<img alt="" src={ArrowDownIcon} />}
              options={[{ value: customerEmail, label: customerEmail }]}
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
                isLoadingTemplates ? <Spin size="small" /> : 'No such template'
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
              onSetContent={(val: string) => setNote(val)}
            />
            <Flex
              className="p-5"
              style={{ backgroundColor: 'rgba(234, 234, 234, 1)' }}
              gap="small"
              wrap="wrap"
            >
              <Button
                size="small"
                onClick={() => setNote('')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="small"
                loading={isLoading}
                onClick={handleSave}
              >
                Send
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabEmail;
