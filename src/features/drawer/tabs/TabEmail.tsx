import { Button, Flex, Select, Spin, TreeSelect } from 'antd';
import { useMemo, useState } from 'react';
import Notes from '../../../ui/Notes';
import { useCreateEmail } from '../../attachments/useCreateEmail';
import { EndPointType } from '../../attachments/useCreateNote';
import { useFields } from '../../fields/useFields';
import { useTemplates } from '../../templates/useTemplates';
import { transformData } from './TabPhone';
import ArrowDownIcon from '/img/drawer/tab/task/arrow.svg';

function TabEmail({ user, sourceId, userEmail, sourceType }) {
  const [note, setNote] = useState('');
  const [isOpenTemplate, setOpenTemplate] = useState(false);
  const [isOpenField, setOpenField] = useState(false);

  const { createEmail, isLoading } = useCreateEmail(sourceType as EndPointType);

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
      subject: user,
    });
  };

  const handleChangeTemplate = (body: string) => {
    setNote(body);
  };

  const handleChangeField = (body: string) => {
    setNote(body);
  };

  return (
    <div className="phone">
      <div className="phone__body">
        <div className="phone__item item-phone">
          <div className="item-phone__text">From:</div>
          <div className="item-phone__select">
            <Select
              variant="borderless"
              defaultValue={fromEmailValue}
              placeholder=""
              style={{ flex: 1, width: 150, height: 30 }}
              suffixIcon={<img alt="" src={ArrowDownIcon} />}
              options={[{ value: fromEmailValue, label: fromEmailValue }]}
            />
          </div>
        </div>
        <div className="phone__item item-phone">
          <div className="item-phone__text">To:</div>
          <div className="item-phone__select">
            <Select
              variant="borderless"
              defaultValue={userEmail}
              style={{ flex: 1, width: 150, height: 30 }}
              suffixIcon={<img alt="" src={ArrowDownIcon} />}
              options={[{ value: userEmail, label: userEmail }]}
            />
          </div>
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
              treeData={fieldsData}
              style={{ flex: 1, width: 250, height: 22, margin: '4px 0' }}
              suffixIcon={<img alt="" src={ArrowDownIcon} />}
              placeholder="Insert a field"
              variant="borderless"
              allowClear
              treeDefaultExpandAll
              notFoundContent={
                isLoadingFields ? <Spin size="small" /> : 'No such field'
              }
              onFocus={() => setOpenField(true)}
              onChange={handleChangeField}
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
                Save
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabEmail;
