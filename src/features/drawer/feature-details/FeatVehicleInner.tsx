import { Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { VehicleState, updateField } from '../state/vehicleSlice';

type FieldType = {
  vehicleYear?: string;
  password?: string;
  remember?: string;
};

function FeatVehicleInner() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.vehicle.formData);

  const handleFieldChange = (
    field: keyof VehicleState['formData'],
    value: string,
  ) => {
    dispatch(updateField({ field, value }));
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      colon={false}
      labelWrap
      size="small"
    >
      <Form.Item<FieldType>
        label="Vehicle year"
        name="vehicleYear"
        rules={[{ required: true, message: '' }]}
      >
        <Input
          value={formData.vehicleYear}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleFieldChange('vehicleYear', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="vehicleMake"
        label="Vehicle make"
        rules={[{ required: true, message: '' }]}
      >
        <Select
          value={formData.vehicleMake}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleFieldChange('vehicleMake', e)}
        >
          <Select.Option value="make">Make</Select.Option>
          <Select.Option value="make1">Make1</Select.Option>
          <Select.Option value="make2">Make2</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="vehicleModel"
        label="Vehicle model"
        rules={[{ required: true, message: '' }]}
      >
        <Select
          value={formData.vehicleModel}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleFieldChange('vehicleModel', e)}
        >
          <Select.Option value="model">model</Select.Option>
          <Select.Option value="model1">model1</Select.Option>
          <Select.Option value="model2">model2</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default FeatVehicleInner;
