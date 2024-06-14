import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import car from '../../../public/img/sports-car.svg';
import Modal from '../Modal';
import FormControl from '../form/FormControl';

export default function SignAcceptModal({
  openModal,
  setModal,
  setContractForm,
  savePDF
}: {
  openModal: boolean;
  setModal: (a: boolean) => void;
  setContractForm: (a: { name: string; initial: string }) => void;
  savePDF:()=>void
}) {
  const createContract = (e: { fullName: string; initial: string }) => {
    setContractForm({ name: e.fullName, initial: e.initial });
    savePDF()
    // setModal(false);
  };

  const [form] = Form.useForm();

  return (
    <Modal
      form={form}
      title="Sign and Accept"
      width="small"
      padding="15"
      open={openModal}
      onCancel={() => {
        setModal(false);
      }}
    >
      <Form form={form} onFinish={createContract}>
        <FormControl img={car} title="Full name">
          <FormItem
            className="m-0 w-100 "
            name="fullName"
            rules={[{ required: true, message: '' }]}
            preserve={false}
          >
            <Input type="text" placeholder="Empty" />
          </FormItem>
        </FormControl>
        <FormControl img={car} title="Initials">
          <FormItem
            className="m-0 w-100 "
            name="initial"
            rules={[{ required: true, message: '' }]}
            preserve={false}
          >
            <Input type="text" placeholder="EM" />
          </FormItem>
        </FormControl>
        <div className="sign__accept__signature">
          <div className="sign__accept__col">
            <h1 className="sign__accept__label">Preview your signature</h1>
            <FormItem className="m-0 w-100 " name="fullName" preserve={false}>
              <Input readOnly type="text" placeholder="Empty" />
            </FormItem>
          </div>
          <div className="sign__accept__col">
            <h1 className="sign__accept__label">Initials</h1>
            <FormItem className="m-0 w-100 " name="initial" preserve={false}>
              <Input readOnly type="text" placeholder="EM" />
            </FormItem>
          </div>
        </div>
        {/* </UpCollapse> */}
      </Form>
    </Modal>
  );
}
