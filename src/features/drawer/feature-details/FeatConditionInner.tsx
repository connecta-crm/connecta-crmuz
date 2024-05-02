import { Form, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateSelect } from '../state/conditionSlice';

function FeatConditionInner() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.condition.formData);

  const handleFieldChange = (value: string) => {
    dispatch(updateSelect({ value }));
  };
  return (
    <Form
      name="basic2"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      colon={false}
      labelWrap
      size="small"
    >
      <Form.Item
        name="conditionType"
        label="Vehicle make"
        rules={[{ required: true, message: '' }]}
      >
        <Select
          value={formData.conditionType}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleFieldChange(e)}
        >
          <Select.Option value="runs">Runs</Select.Option>
          <Select.Option value="drives">Drives</Select.Option>
          <Select.Option value="others">Others</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default FeatConditionInner;
