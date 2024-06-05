import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import car from '../../../public/img/sports-car.svg';
import { CompanyTableDataType } from '../../features/company/companyTableDataType';
import { useUpdateCompany } from '../../features/company/useUpdateCompany';
import { LogType } from '../../features/dstribution/DistributionDataType';
import History from '../History';
import Modal from '../Modal';
import FormControl from '../form/FormControl';
import UpCollapse from '../form/UpCollapse';

export default function CompanyModal({
  openModal,
  setModal,
  setEditId,
  company,
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  company: CompanyTableDataType;
  setEditId: (a: null | number) => void;
}) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const { update } = useUpdateCompany();

  const createUser = (e: CompanyTableDataType) => {
    if (company) {
      e.id = company.id;
      update(e, {
        onSuccess: () => {
          setModal(false);
          setEditId(null);
        },
      });
      return;
    }
  };

  useEffect(() => {
    if (company) {
      setShowInput(true);
      return;
    }
    setShowInput(false);
  }, [company]);

  const [form] = Form.useForm();
  const showEditAction = () => {
    setShowInput(!showInput);
  };
  return (
    <Modal
      form={form}
      title={'Company name'}
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
          hasEdit={company ? true : false}
          showEdit={showEditAction}
          title="Company information"
        >
          <FormControl img={car} title="Company">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="name"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.name}
                preserve={false}
              >
                <Input value={company?.name} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.name}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Department">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="department"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.department}
                preserve={false}
              >
                <Input
                  value={company?.department}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.department}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Mainline">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="mainline"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.mainline}
                preserve={false}
              >
                <Input
                  value={company?.mainline}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.mainline}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Fax">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="fax"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.fax}
                preserve={false}
              >
                <Input value={company?.fax} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">{company?.fax}</span>
            )}
          </FormControl>
          <FormControl img={car} title="Main email">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="email"
                rules={[{ required: true, message: '', type: 'email' }]}
                initialValue={company?.email}
                preserve={false}
              >
                <Input value={company?.email} type="text" placeholder="Empty" />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.email}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Support email">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="supportEmail"
                rules={[{ required: true, message: '', type: 'email' }]}
                initialValue={company?.supportEmail}
                preserve={false}
              >
                <Input
                  value={company?.supportEmail}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.supportEmail}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Accounting email">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="accountingEmail"
                rules={[{ required: true, message: '', type: 'email' }]}
                initialValue={company?.accountingEmail}
                preserve={false}
              >
                <Input
                  value={company?.accountingEmail}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.accountingEmail}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Address">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="address"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.address}
                preserve={false}
              >
                <Input
                  value={company?.address}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.address}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Mon-Fri">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="monFri"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.monFri}
                preserve={false}
              >
                <Input
                  value={company?.monFri}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.monFri}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Saturday">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="saturday"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.saturday}
                preserve={false}
              >
                <Input
                  value={company?.saturday}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.saturday}
              </span>
            )}
          </FormControl>
          <FormControl img={car} title="Sunday">
            {!showInput ? (
              <FormItem
                className="m-0 w-100 "
                name="sunday"
                rules={[{ required: true, message: '' }]}
                initialValue={company?.sunday}
                preserve={false}
              >
                <Input
                  value={company?.sunday}
                  type="text"
                  placeholder="Empty"
                />
              </FormItem>
            ) : (
              <span className="detail__text_with-bg ml-20">
                {company?.sunday}
              </span>
            )}
          </FormControl>
        </UpCollapse>
        <br />
        <UpCollapse title="History ">
          {company?.logs.length ? (
            <>
              {company?.logs.map((item: LogType, index: number) => (
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
